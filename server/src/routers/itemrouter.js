import express from "express";
import multer from "multer";
import {
  getAllAreas,
  getItem,
  postItem,
} from "../../controllers/itemControllers";

const upload = multer({
  dest: "uploads/",
});

const itemRouter = express.Router();

itemRouter.get("/:id", getItem);
itemRouter.get("/", getAllAreas);
itemRouter.post("/", upload.single("image"), postItem);

export default itemRouter;
