import express from "express";
import multer from "multer";
import {
  getVisitRecords,
  postVisitRecords,
} from "../../controllers/itemControllers";
import { uploadFiles } from "../middlewares";

const recordRouter = express.Router();

recordRouter.get("/:id", getVisitRecords);
recordRouter.post("/:id", uploadFiles.single("image"), postVisitRecords);

export default recordRouter;
