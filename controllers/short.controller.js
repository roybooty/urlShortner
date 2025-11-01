import User from "../models/User.js";
import Url from "../models/Url.js";
import client from "../config/redis.js";

export const shortRender = (req, res) => {
  res.status(200).render("index.ejs", { urls: [], requestHost: "" });
};

export const createShort = async (req, res) => {
  try {
    const { originalUrl } = req.body;
  } catch (e) {
    res
      .status(e.statusCode || 500)
      .render("index.ejs", { urls: [], requestHost: e });
  }
};
export const goShort = (req, res) => {};
