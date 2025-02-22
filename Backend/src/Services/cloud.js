import { v2 as cloudinary } from "cloudinary";
import config from "../config/config.js";
import { Readable } from "stream";
import { promise } from "bcrypt/promises.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export const uploadfile = async (filebuffer) => {
  return new Promise((resolve, reject) => {
    const uploadstream = cloudinary.uploader.upload_stream(
      { folder: "instagram" },
      (err, fileData) => {
        if (err) return reject(err); // ✅ Proper error handling
        resolve({
          url: fileData.secure_url,
          public_id: fileData.public_id,
          asset_id: fileData.asset_id,
          signature: fileData.signature,
          format: fileData.format,
        }); // ✅ Sahi tarika se resolve karna hai
      }
    );
    Readable.from(filebuffer).pipe(uploadstream);
  });
};
