import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabase } from "./_lib/supabase.js";
import crypto from "crypto";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { path, referrer } = req.body;

  if (!path) {
    return res.status(400).json({ error: "Missing path" });
  }

  // Skip tracking admin routes
  if (path.startsWith("/admin")) {
    return res.status(200).json({ success: true, skipped: true });
  }

  // Get client IP address
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
    (req.headers["x-real-ip"] as string) ||
    req.socket.remoteAddress ||
    "anonymous";

  // Hash IP to protect user privacy while tracking unique visitor counts
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");
  const userAgent = req.headers["user-agent"] || null;

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("page_views").insert({
      path,
      referrer: referrer || null,
      ip_hash: ipHash,
      user_agent: userAgent,
    });

    if (error) {
      console.error("Supabase page_view insert error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Tracking API error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
}
