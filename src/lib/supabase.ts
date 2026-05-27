import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
  course: string | null;
  funding_type: string | null;
  when_to_start: string | null;
  additional_info: string | null;
  message: string;
  is_read: boolean;
  notes: string | null;
  status: string;
  created_at: string;
};
