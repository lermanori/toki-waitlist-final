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

  // Fetch user's city/location
  const { data: userRows, error: userError } = await supabase
    .from("signups")
    .select("location")
    .eq("email", email)
    .limit(1);

  if (userError || !userRows || userRows.length === 0) {
    return new Response("User not found for email", { status: 404 });
  }
  const userCity = userRows[0].location || "your city";

  // Count total users
  const { count } = await supabase
    .from("signups")
    .select("*", { count: "exact", head: true });

  if (!count) return new Response("Count failed", { status: 500 });

  // Compose new email format
  const subject = "You're in. 🖤";
  const text = `Hey,\n\nYou're officially on the waitlist for Toki.\nYou're number **#${count}** on the **${userCity}** list.\nWe'll let you know the moment you can drop in.\n\nIn the meantime, don't be a stranger.\nTell your people. The more of us here, the better it gets.\n\n—\nToki`;

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
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return new Response("Email failed: " + errorText, { status: 500 });
  }

  return new Response("Signup success", { status: 200 });
});
