import User from "../models/User.js";
import { otp_message } from "../constants/index.js";
import message from "../utils/mails.js";
import client from "../config/redis.js";
import bcrypt from "bcrypt";

export const renderOtp = (req, res) => {
  res.status(200).render("verify-otp.ejs", { message: "", email: "" });
};

export const renderForget = (req, res) => {
  res.status(200).render("forgot-password.ejs", { message: "" });
};

export const renderReset = (req, res) => {
  res.status(200).render("reset-password.ejs", { message: "", token: "" });
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const value = await client.get("otp");

    console.log(value);

    if (otp == value) {
      res.redirect("https://safwan-ulob.onrender.com/api/v1/reset-password");
    }

    const err = new Error("OTP not correct");
    err.statusCode = 404;
    throw err;
  } catch (e) {
    res
      .status(e.statusCode || 500)
      .render("verify-otp", { message: e, email: "" });
  }
};
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const existingEmail = await User.findOne({ email });

    if (!existingEmail) {
      const err = new Error("email does not exist");
      err.statusCode = 404;
      throw err;
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await client.set("otp", `${otp}`, { EX: 1000 });
    await client.set("em", `${email}`);
    if (existingEmail) {
      try {
        await message(otp, email, otp_message);
      } catch (e) {
        console.log(e);
      }
    }

    res.redirect("https://safwan-ulob.onrender.com/api/v1/verify-otp");
  } catch (e) {
    res
      .status(e.statusCode || 500)
      .render("forgot-password.ejs", { message: `${e}` });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { password, confirm } = req.body;

    if (password != confirm) {
      const err = new Error("Password does not match");
      err.statusCode = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const email = await client.get("em");
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
    );

    if (user) {
      res.redirect("/api/v1/short");
    }
  } catch (e) {
    res
      .status(e.statusCode || 500)
      .render("reset-password.ejs", { message: e });
  }
};
