import mongoose from "mongoose";
import config from "./config.js";
export const connect = () => {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB");
      console.log(error);
    });
};

