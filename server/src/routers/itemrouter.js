import express from "express";
import multer from "multer";
import {
  getAllAreas,
  getItem,
  getItemsByKeyword,
  getItemsByAddress,
  postItem,
} from "../../controllers/itemControllers";

const upload = multer({
  dest: "uploads/",
});

const itemRouter = express.Router();

itemRouter.get("/address/:address", getItemsByAddress);
itemRouter.get("/search", getItemsByKeyword);
itemRouter.get("/:id", getItem);
itemRouter.get("/", getAllAreas);
itemRouter.post("/", upload.single("image"), postItem);

export default itemRouter;
