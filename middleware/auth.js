import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/env.js";
import User from "../models/User.js";

const authorize = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(401).render("unauthorized", {
        title: "Unauthorized",
        message: "You are not authorized to access this page.",
      });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user)
      return res.status(401).render("unauthorized", {
        title: "Unauthorized",
        message: "You are not authorized to access this page.",
      });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authorize;
