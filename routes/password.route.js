import { Router } from "express";
import {
  verifyOtp,
  resetPassword,
  forgetPassword,
  renderOtp,
  renderReset,
  renderForget,
} from "../controllers/password.controller.js";

const passRouter = Router();

passRouter.get("/verify-otp", renderOtp);
passRouter.get("/forgot-password", renderForget);
passRouter.get("/reset-password", renderReset);

passRouter.post("/verify-otp", verifyOtp);
passRouter.post("/forgot-password", forgetPassword);
passRouter.post("/reset-password", resetPassword);

export default passRouter;
