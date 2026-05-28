import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import { pbkdf2Sync, randomBytes } from "crypto";
import { getSupabase } from "../_lib/supabase.js";

console.log("Login API module loaded");

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
  console.log("--- Login Attempt ---");
  if (req.method !== "POST") {
    console.warn("Method not allowed:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body || {};
  console.log("Login attempt for user:", username);

  if (!username || !password) {
    console.warn("Missing credentials");
    return res.status(400).json({ error: "Username and password required." });
  }

  try {
    console.log("Initializing Supabase...");
    const supabase = getSupabase();
    
    console.log("Querying admin_users table...");
    const { data, error } = await supabase
      .from("admin_users")
      .select("id, username, password")
      .eq("username", username)
      .single();

    if (error) {
      console.error("Supabase query error:", error.message, error.code);
      return res.status(401).json({ error: "Invalid username or password." });
    }

    if (!data) {
      console.warn("User not found:", username);
      return res.status(401).json({ error: "Invalid username or password." });
    }

    console.log("User found, verifying password...");
    let passwordValid = false;
    if (data.password.includes(":")) {
      passwordValid = verifyPassword(password, data.password);
    } else {
      console.log("Plaintext password detected, verifying...");
      passwordValid = data.password === password;
    }

    if (!passwordValid) {
      console.warn("Invalid password for user:", username);
      return res.status(401).json({ error: "Invalid username or password." });
    }

    console.log("Password valid, signing JWT...");
    if (!JWT_SECRET || JWT_SECRET === "dev-secret-change-me") {
      console.warn("Warning: Using default JWT_SECRET in production!");
    }
    
    let token;
    try {
      token = jwt.sign({ username, sub: data.id }, JWT_SECRET, { expiresIn: "7d" });
    } catch (jwtErr: any) {
      console.error("JWT signing failed:", jwtErr.message);
      throw new Error("Failed to generate authentication token");
    }
    
    console.log("Login successful for:", username);
    return res.status(200).json({ token });
  } catch (e: any) {
    console.error("Login crash details:", e);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      details: e.message,
      stack: process.env.NODE_ENV === "development" ? e.stack : undefined
    });
  }
}
