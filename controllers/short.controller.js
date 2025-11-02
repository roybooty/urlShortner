import User from "../models/User.js";
import Url from "../models/Url.js";
import client from "../config/redis.js";
import generateShortCode from "../utils/short.js";

export const shortRender = async (req, res) => {
  try {
    const data = await Url.find({ userId: req.user.id });
    console.log(data);
    res
      .status(200)
      .render("index.ejs", { urls: data, requestHost: req.get("host") });
  } catch (e) {
    console.error(e);
    res.status(500).render("index.ejs", { urls: [], requestHost: e });
  }
};

export const createShort = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const code = generateShortCode();

    const data = await Url.create({
      userId: req.user.id,
      originalUrl,
      shortUrl: code,
    });

    await client.set("shortUrl", `${data.originalUrl}`);

    res.status(200).render("index.ejs", { urls: [data], requestHost: e });
  } catch (e) {
    res
      .status(e.statusCode || 500)
      .render("index.ejs", { urls: [], requestHost: e });
  }
};
