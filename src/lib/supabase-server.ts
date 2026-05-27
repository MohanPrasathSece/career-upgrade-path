import { createClient } from "@supabase/supabase-js";

// Server-side only — uses service role key (bypasses RLS)
export function createServerSupabase() {
  const url = process.env.VITE_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}
