import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
    trim: true,
    lowercase: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username must be at most 20 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    trim: true,
    lowercase: true,
    minlength: [3, "Email must be at least 3 characters long"],
    maxlength: [50, "Email must be at most 50 characters long"],
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

userSchema.statics.hashPassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
    return false;
  }
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
    return false;
  }
  if (!this.password) {
    throw new Error("Password is required");
    return false;
  }
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRE,
    }
  );
};

userSchema.methods.verifyToken = function (token) {
  if (!token) {
    throw new Error("Token is required");
    return false;
  }
  return jwt.verify(token, config.JWT_SECRET);
};

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
