import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabase } from "./_lib/supabase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("--- Keep Alive Triggered ---");
  try {
    const supabase = getSupabase();
    
    // Select one id from submissions to keep database active
    const { data, error } = await supabase
      .from("submissions")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase query error:", error.message);
      return res.status(500).json({ error: "Keep alive failed", details: error.message });
    }

    console.log("Keep-alive query successful.");
    return res.status(200).json({ success: true, message: "Supabase kept active" });
  } catch (e: any) {
    console.error("Keep-alive exception:", e.message);
    return res.status(500).json({ error: "Server error", details: e.message });
  }
}
