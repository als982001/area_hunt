import express from "express";
import {
  getAllAreas,
  getItem,
  getItemsByKeyword,
  getItemsByAddress,
  postItem,
} from "../../controllers/itemControllers";
import { uploadFiles } from "../middlewares";

const itemRouter = express.Router();

itemRouter.get("/address/:address", getItemsByAddress);
itemRouter.get("/search", getItemsByKeyword);
itemRouter.get("/:id", getItem);
itemRouter.get("/", getAllAreas);
itemRouter.post("/", uploadFiles.single("image"), postItem);

export default itemRouter;
