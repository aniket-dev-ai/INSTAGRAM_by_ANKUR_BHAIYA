import { Router } from "express";
import * as Post from "../controller/post.js";
import * as PostMiddleware from "../middleware/post.js";

const router = Router();

router.post("/create", PostMiddleware.handleFileUpload, Post.createPost);  // ✅ Corrected spelling

export default router;
