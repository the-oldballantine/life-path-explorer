import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signToken(userId: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" } as any) as string;
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    return decoded;
  } catch {
    return null;
  }
}
