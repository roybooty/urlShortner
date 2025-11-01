import express from "express";
import CookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import connectToDb from "./database/connection.js";
import authRouter from "./routes/auth.route.js";
import shortRouter from "./routes/short.route.js";
import passRouter from "./routes/password.route.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extend: false }));
app.use(express.json());
app.use(CookieParser());
// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", shortRouter);
app.use("/api/v1", passRouter);
// view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.redirect("/api/v1/sign-up");
});

app.listen(PORT, async () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  await connectToDb();
});

export default app;
