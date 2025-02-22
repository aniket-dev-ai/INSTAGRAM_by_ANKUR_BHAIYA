import mongoose from "mongoose";
import { authUser } from "../middleware/user";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      trim: true,
      maxlength: [1000, "Caption must be at most 1000 characters long"],
    },
    media: {
      type: Object  ,
      required: [true, "Media is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "Author is required"],
    },
  },
  {
    timestamps: true,
  }
);

postSchema.statics.getAuthorPost = async function (AuthorId) {
  const posts = await this.find({
    author: AuthorId,
  });

  return posts;
};

postSchema.methods.updatecaption = async function (caption) {
  this.caption = caption;
  await this.save();
  return this;
};

postSchema.statics.getrecentPost = async function (limit = 5) {
  const posts = await this.find().sort({ createdAt: -1 }).limit(limit);
  return posts;
};

postSchema.statics.deletePost = async function () {
  await this.remove();
  return this;
};

const postmodel = mongoose.model("PostModel", postSchema);

export default postmodel;