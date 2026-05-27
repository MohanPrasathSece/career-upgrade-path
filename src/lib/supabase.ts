import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  course: string | null;
  message: string;
  is_read: boolean;
  notes: string | null;
  created_at: string;
};
