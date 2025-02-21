import express from "express";
import { body } from "express-validator";
import * as User from "../controller/user.js";
import * as UserMiddleware from "../middleware/user.js";

const UserRouter = express.Router();

UserRouter.post(
  "/register",
  UserMiddleware.registerUserValidator,
  User.createUser
);
UserRouter.post("/login", User.loginUser);

export default UserRouter;
