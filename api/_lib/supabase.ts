import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
  
  if (!url) {
    console.error("SUPABASE_URL is missing");
    throw new Error("SUPABASE_URL is not set");
  }
  if (!key) {
    console.error("SUPABASE_SERVICE_ROLE_KEY/ANON_KEY is missing");
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createClient(url, key);
}
