import UserModel from "../modal/user.js";
import { validationResult } from "express-validator";
import * as UserService from "../Services/createuser.js";

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { username, email, password } = req.body;
    const user = await UserService.createUser({ username, email, password });
    const token = await user.generateToken();
    res.status(201).json({ message: "User created", data: user, token });
  } catch (e) {
    res.status(500).json({ message: e.message });
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
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ message: "User logged in" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
