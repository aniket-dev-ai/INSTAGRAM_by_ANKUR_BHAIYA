import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle, FaRegHeart, FaComment, FaShare } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const SinglePost = () => {
  const { postId } = useParams(); // Get postId from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getpost/${postId}`, {
          credentials: "include", // Include auth token if needed
        });
        const data = await response.json();
        if (response.ok) {
          setPost(data.post);
        } else {
          toast.error(data.error || "Failed to fetch post");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p className="text-center text-gray-500">Loading post...</p>;
  if (!post) return <p className="text-center text-gray-500">Post not found.</p>;

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-2 mb-2">
          <FaUserCircle className="text-primary text-3xl" />
          <span className="font-semibold">{post.author?.username || "Unknown User"}</span>
        </div>
        <img src={post.media.url} alt="Post" className="w-full rounded-md object-cover" />
        <p className="mt-2">{post.caption}</p>
        <div className="flex justify-between mt-2 text-gray-500">
          <FaRegHeart className="cursor-pointer hover:text-red-500" />
          <FaComment className="cursor-pointer hover:text-blue-500" />
          <FaShare className="cursor-pointer hover:text-green-500" />
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default SinglePost;
