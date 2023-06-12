import express from "express";
import multer from "multer";
import {
  getAllAreas,
  getItem,
  getSomeItems,
  postItem,
} from "../../controllers/itemControllers";

const upload = multer({
  dest: "uploads/",
});

const itemRouter = express.Router();

itemRouter.get("/slice", getSomeItems);
itemRouter.get("/:id", getItem);
itemRouter.get("/", getAllAreas);
itemRouter.post("/", upload.single("image"), postItem);

export default itemRouter;
