import express from "express";
import multer from "multer";
import {
  getAllAreas,
  getItem,
  getItemsByKeyword,
  getItemsByLocation,
  postItem,
} from "../../controllers/itemControllers";

const upload = multer({
  dest: "uploads/",
});

const itemRouter = express.Router();

itemRouter.get("/location/:location", getItemsByLocation);
itemRouter.get("/search", getItemsByKeyword);
itemRouter.get("/:id", getItem);
itemRouter.get("/", getAllAreas);
itemRouter.post("/", upload.single("image"), postItem);

export default itemRouter;
