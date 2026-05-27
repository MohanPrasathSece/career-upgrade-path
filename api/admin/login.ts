import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import { pbkdf2Sync, randomBytes } from "crypto";
import { getSupabase } from "../_lib/supabase";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const computed = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return hash === computed;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("admin_users")
      .select("id, username, password")
      .eq("username", username)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    let passwordValid = false;
    if (data.password.includes(":")) {
      passwordValid = verifyPassword(password, data.password);
    } else {
      passwordValid = data.password === password;
    }

    if (!passwordValid) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign({ username, sub: data.id }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token });
  } catch (e: any) {
    console.error("Login error:", e.message);
    return res.status(500).json({ error: "Login failed." });
  }
}
