import { useState } from "react";
import { FaUpload, FaRegImage, FaPen } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image! 🖼️");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: formData,
        credentials: "include", // Include cookies/session if needed
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Post created successfully! 🎉");
        setCaption("");
        setImage(null);
        setPreview("");
      } else {
        toast.error(data.error || "Failed to create post!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-primary text-2xl font-bold text-center mb-4">
          🕉️ Create a Post 🕉️
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center border border-primary rounded p-4">
            <label className="cursor-pointer flex flex-col items-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md"
                />
              ) : (
                <FaRegImage className="text-primary text-4xl" />
              )}
              <span className="mt-2 text-sm text-gray-500">Upload an Image</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <div className="flex items-center border border-primary rounded p-2">
            <FaPen className="text-primary mr-2" />
            <input
              type="text"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-orange-600 transition flex items-center justify-center"
          >
            <FaUpload className="mr-2" /> Post
          </button>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default CreatePost;
