import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "who are you"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "or if you want us to lost you"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "pls hackme"],
      minLength: 8,
    },
  },
  { timestamps: true },
);

const User = model("User", userSchema);
export default User;
