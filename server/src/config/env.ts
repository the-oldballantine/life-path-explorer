import { config } from "dotenv";

config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3001", 10),
  DATABASE_URL: process.env.DATABASE_URL || "file:./dev.db",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-in-production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:8080",
  COOKIE_SECURE: process.env.COOKIE_SECURE === "true",
};
