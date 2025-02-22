import express from "express";
import UserRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import AIRouter from "./routes/ai.js";
import postroute from "./routes/post.js"
const app = express();
import morgan from "morgan";

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", UserRouter);
app.use("/api/ai", AIRouter);
app.use("/api/post", postroute)

export default app;
