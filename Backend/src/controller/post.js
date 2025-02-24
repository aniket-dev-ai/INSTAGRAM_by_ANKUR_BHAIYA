import { generateImgCaption } from "../Services/ai.js";
import { uploadfile } from "../Services/cloud.js";
// import postmodel from "../modal/post.js";
import Postmodel from "../modal/post.js";
import postLikeModel from "../modal/postLike.js";
export const createPost = async (req, res, next) => {
  try {
    const imagebuffer = req.file?.buffer;
    if (!imagebuffer) {
      return res.status(400).json({ error: "Image file missing" });
    }

    // AI-generated caption & file upload ek saath karega
    const [caption, filedata] = await Promise.all([
      generateImgCaption(imagebuffer),
      uploadfile(imagebuffer),
    ]);

    // Ensure kar ki user authenticated hai aur ID available hai
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const post = await Postmodel.create({
      author: req.user.id, // 🔥 Fix 1: Author field add kiya
      caption,
      media: filedata, // 🔥 Fix 2: `media` field correct ki
    });

    res.status(201).json({ newpost: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while creating post" });
  }
};

export const likePost = async (req, res, next) => {
  try {
    const postId = req.params.PostId;
    if (!Postmodel.isValibPostId(postId)) {
      return res.status(400).json({ error: "Invalid Post ID" });
    }
    const post = await Postmodel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const isALreadyLiked = await postLikeModel.findOne({
      post: postId,
      user: req.user.id,
    });

    if (isALreadyLiked) {
      await isALreadyLiked.deleteOne();
      await post.decrementLike(); // ✅ Call on the post document
      return res.json({ message: "Post unliked" });
    }
    await postLikeModel.create({
      post: postId,
      user: req.user.id,
    });
    await post.incrementLike();
    res.json({ message: "Post liked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while liking post" });
  }
};

export const getFeed = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const recentPost = await Postmodel.getrecentPost(limit);
    res.status(200).json({ recentPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching feed" });
  }
};

export const getPost = async (req, res, next) => {
  const postId = req.params.PostId;
  if (!Postmodel.isValidPostId(postId)) {
    return res.status(400).json({ error: "Invalid Post ID" });
  }
  try {
    const post = await Postmodel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching post" });
  }
};
