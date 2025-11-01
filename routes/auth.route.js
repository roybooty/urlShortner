import { Router } from "express";
import {
  SignIn,
  SignUp,
  renderSignIn,
  renderSignUp,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/sign-in", renderSignIn);
authRouter.get("/sign-up", renderSignUp);
authRouter.post("/sign-in", SignIn);
authRouter.post("/sign-up", SignUp);

export default authRouter;
