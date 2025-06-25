import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {
  const body = await req.json();
  const email = body.email;

  if (!email) return new Response("Missing email", { status: 400 });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Insert the new user
  const { error: insertError } = await supabase
    .from("signups")
    .insert({ email });

  if (insertError)
    return new Response("Signup failed: " + insertError.message, { status: 500 });

  // Count total users
  const { count } = await supabase
    .from("signups")
    .select("*", { count: "exact", head: true });

  if (!count) return new Response("Count failed", { status: 500 });

  // Send email with Resend
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: email,
      subject: "You're on the waitlist!",
      text: `Thanks for signing up! You’re number ${count} on the waitlist.`,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return new Response("Email failed: " + errorText, { status: 500 });
  }

  return new Response("Signup success", { status: 200 });
});
