import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import flash from "express-flash";
import https from "https";
import fs from "fs";
import path from "path";
import MongoStore from "connect-mongo";
import rootRouter from "./src/routers/rootRouter";
import userRouter from "./src/routers/userRouter";
import itemRouter from "./src/routers/itemrouter";
import recordRouter from "./src/routers/recordRouter";
import { testPrint } from "./src/middlewares";
const cookieParser = require("cookie-parser");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const PORT = 4000;
const HTTPS_PORT = PORT;
const app = express();
const logger = morgan("dev");

app.use(
  session({
    // secret: process.env.COOKIE_SECRET, // 쿠키에 sign 할 때 사용하는 string
    secret: "secret", // 쿠키에 sign 할 때 사용하는 string
    resave: false,
    saveUninitialized: true, // 세션이 새로 만들어지고 수정된 적이 없을 때 => uninitialized
    cookie: {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    },
    // store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(flash());

// 나중에 필요할지도 모르는 코드 두 줄
//app.use("/uploads", express.static("uploads")); // uploads 폴더를 노출시킴
// app.use("/static", express.static("assets"));

// app.use(localMiddleware);
app.use(
  "/images",
  express.static(path.join(__dirname, "../uploads")),
  rootRouter
);

app.use("/user", userRouter);
app.use("/items", itemRouter);
app.use("/records", recordRouter);
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
