import express from "express";
import { uploadFiles } from "../middlewares";
import { postImage } from "../../controllers/imageControllers";

const imageRouter = express.Router();

imageRouter.post("/", uploadFiles.single("image"), postImage);

export default imageRouter;
