import { Router } from "express";
import {
  shortRender,
  createShort,
  deleteShort,
} from "../controllers/short.controller.js";
import authorize from "../middleware/auth.js";

const shortRouter = Router();

shortRouter.get("/short", authorize, shortRender);
shortRouter.post("/short", authorize, createShort);
shortRouter.delete("/short", authorize, deleteShort);

export default shortRouter;
