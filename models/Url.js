import { Schema, model } from "mongoose";

const urlSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalUrl: {
      type: String,
      trim: true,
      required: true,
    },
    shortUrl: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

export default model("Url", urlSchema);
