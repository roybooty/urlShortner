import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const connectToDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("connected to db successfully");
  } catch (e) {
    console.log(e);
  }
};

export default connectToDb;
