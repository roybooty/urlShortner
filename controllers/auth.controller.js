import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import bcrypt from "bcrypt";
import message from "../utils/mails.js";
import { NewBoy, OldBoy, otp_message } from "../constants/index.js";

export const renderSignUp = (req, res) => {
  res.status(200).render("signup.ejs", { message: "" });
};

export const renderSignIn = (req, res) => {
  res.status(200).render("signin.ejs", { message: "" });
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const err = new Error("user or password is incorrect");
      err.statusCode = 404;
      throw err;
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);

    if (!isPassword) {
      const err = new Error("user or password is incorrect");
      err.statusCode = 404;
      throw err;
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    if (existingUser && isPassword) {
      try {
        let isReturning = true;
        await message(existingUser.name, email, OldBoy, isReturning);
      } catch (e) {
        console.log(e);
      }
    }

    res.status(200).redirect(`/api/v1/short/`);
  } catch (e) {
    res.status(e.statusCode || 500).render("signin.ejs", { message: e });
  }
};

export const SignUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const err = new Error("User already exist");
      err.statusCode = 400;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create([{ name, email, password: hashedPassword }]);

    const token = jwt.sign({ userId: user[0]._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    if (user) {
      try {
        await message(name, email, NewBoy);
      } catch (e) {
        console.log(e);
      }
    }

    res.status(200).redirect(`/api/v1/short`);
  } catch (e) {
    res.status(e.statusCode || 500).render("signup.ejs", { message: e });
  }
};
