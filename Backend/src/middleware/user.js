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
      (req.headers?.authentication?.toLowerCase().startsWith("bearer ")
        ? req.headers.authentication.split(" ")[1]
        : null) ||
      (req.headers?.authorization?.toLowerCase().startsWith("bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null) ||
      req.body?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    const blacklistedToken = await Redis.get(`blacklist:${token}`);
    if (blacklistedToken) {
      return res.status(401).json({ message: "Unauthorized - Token blacklisted" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    let user = await Redis.get(`user:${decoded.id}`);
    if (user) {
      user = JSON.parse(user);
    }
    if (!user) {
      user = await UserModel.findById(decoded.id);
      if (user) {
        delete user._doc.password;
        await Redis.set(`user:${decoded.id}`, JSON.stringify(user));
      } else {
        return res
          .status(401)
          .json({ message: "Unauthorized - User not found" });
      }
    }

    req.user = user;
    req.tokenData = { token, ...decoded };
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
