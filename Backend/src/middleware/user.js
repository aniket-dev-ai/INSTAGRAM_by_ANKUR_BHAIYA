import { body } from "express-validator";
import UserModel from "../modal/user.js";
import Redis from "../Services/Redis.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerUserValidator = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .custom((value) => value === value.toLowerCase())
    .withMessage("Username must be in lowercase"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 3, max: 50 })
    .withMessage("Email must be between 3 and 50 characters")
    .trim(),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers?.authorization?.toLowerCase().startsWith("bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null) ||
      req.body?.token;

    console.log("Received Token:", token);  // 🔥 Debugging ke liye yeh daal

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log("Decoded Token:", decoded);  // 🔥 Yeh check karega ki token valid hai ya nahi

    let user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    req.tokenData = { token, ...decoded };
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

