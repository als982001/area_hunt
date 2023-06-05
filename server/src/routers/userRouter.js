import express from "express";
import {
  checkUserInfo,
  login,
  join,
  logout,
} from "../../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/join", join);
userRouter.get("/userInfo", checkUserInfo);

export default userRouter;
