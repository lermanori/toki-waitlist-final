import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qznrxhgzpjhbwjgaizhz.supabase.co'; // TODO: Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnJ4aGd6cGpoYndqZ2Fpemh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzODEzMDEsImV4cCI6MjA2NDk1NzMwMX0.-nyN4Ob6F2X3IDb1PmB2k5O8LJgKJHVNLVV4Bh2BL0E'; // TODO: Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 