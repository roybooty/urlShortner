import { config } from "dotenv";

config({ path: `.env.local` });

export const { PORT, DB_URI, JWT_SECRET, GMAIL_PASS, GMAIL_GMAIL, RD_URI } =
  process.env;
