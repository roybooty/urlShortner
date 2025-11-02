import Url from "../models/Url.js";
import client from "../config/redis.js";
import generateShortCode from "../utils/short.js";

export const shortRender = async (req, res) => {
  try {
    const data = await Url.find({ userId: req.user.id });

    res.status(200).render("index.ejs", {
      urls: data,
      requestHost: `${req.get("host")}/short`,
    });
  } catch (e) {
    console.error(e);
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

    res.redirect("/api/v1/short/");
  } catch (e) {
    console.log(e);
  }
};

export const deleteShort = async (req, res) => {
  try {
    const did = await Url.deleteMany({ userId: req.user._id });
    console.log(did);
    if (did) return res.redirect("/api/v1/short/");
  } catch (e) {
    console.log(e);
  }
};
