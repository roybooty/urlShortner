import { Router } from "express";
import {
  shortRender,
  createShort,
  goShort,
} from "../controllers/short.controller.js";

const shortRouter = Router();

shortRouter.get("/short", shortRender);
shortRouter.post("/short", createShort);
shortRouter.get("/:code", goShort);

export default shortRouter;
