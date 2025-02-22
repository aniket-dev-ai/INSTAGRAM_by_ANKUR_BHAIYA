import UserModel from "../modal/user.js";
import { validationResult } from "express-validator";
import * as UserService from "../Services/createuser.js";
import Redis from "../Services/Redis.js";

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { username, email, password } = req.body;
    const user = await UserService.createUser({ username, email, password });
    const token = await user.generateToken();
    return res.status(201).json({ message: "User created", data: user, token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    return res.status(200).json({
      message: "User logged in",
      data: user,
      token: user.generateToken(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  console.log(req.tokenData);
  const timeRemaining = req.tokenData.exp * 1000 - Date.now();
  await Redis.set(
    `blacklist:${req.tokenData.token}`,
    true,
    "EX",
    Math.floor(timeRemaining / 1000)
  );
  res.send("Logged out");
};
