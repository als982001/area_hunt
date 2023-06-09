import express from "express";
import { getImage, home } from "../../controllers/itemControllers";

const rootRouter = express.Router();

rootRouter.get("/uploads/:filename", getImage);
rootRouter.get("/", getImage);

export default rootRouter;
