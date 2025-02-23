import mongoose from "mongoose";

const postLikeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostModel",
      required: [true, "Post is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
  }
);

const postLikeModel = mongoose.model("PostLikeModel", postLikeSchema);

export default postLikeModel;