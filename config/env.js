import { config } from "dotenv";

config({ path: `.env.${process.env.NODENV || "development"}.local` });

export const { PORT, DB_URI, JWT_SECRET, GMAIL_PASS, GMAIL_GMAIL } =
  process.env;
