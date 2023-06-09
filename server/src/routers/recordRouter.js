import express from "express";
import multer from "multer";
import {
  getVisitRecords,
  postVisitRecords,
} from "../../controllers/itemControllers";

const upload = multer({
  dest: "uploads/",
});

const recordRouter = express.Router();

recordRouter.get("/:id", getVisitRecords);
recordRouter.post("/:id", upload.single("image"), postVisitRecords);

export default recordRouter;
