import jwt from "jsonwebtoken";
import type { VercelRequest } from "@vercel/node";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export function verifyAdmin(req: VercelRequest): boolean {
  const token = (req.headers["x-admin-token"] || req.query.token) as string;
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}
