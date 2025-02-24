import { Router } from "express";
import * as Post from "../controller/post.js";
import * as PostMiddleware from "../middleware/post.js";
import { authUser } from "../middleware/user.js";

const router = Router();

router.post(
  "/create",
  authUser,
  PostMiddleware.handleFileUpload,
  Post.createPost
);
router.patch("/like/:PostId", authUser, Post.likePost);
router.get("/feed", authUser, Post.getFeed);
router.get("/getpost/:postId", authUser, Post.getPost);

export default router;
