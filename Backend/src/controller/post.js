import { generateImgCaption } from "../Services/ai.js";
import { uploadfile } from "../Services/cloud.js";
import Postmodel from "../modal/post.js";
export const createPost = async (req, res, next) => {
  const imagebuffer = req.file.buffer;
  const [caption, filedata] = await Promise.all([
    generateImgCaption(imagebuffer),
    uploadfile(imagebuffer),
  ]);
  res.status(201).json({ filedata, caption });
};
