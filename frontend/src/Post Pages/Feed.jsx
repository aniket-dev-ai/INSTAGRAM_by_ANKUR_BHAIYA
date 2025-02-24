import { useEffect, useState } from "react";
import { FaUserCircle, FaRegHeart, FaComment, FaShare } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
        } else {
          toast.error(data.error || "Failed to fetch posts");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      <h2 className="text-primary text-2xl font-bold text-center mb-4">
        🕉️ Sanatani Feed 🕉️
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white shadow-lg rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FaUserCircle className="text-primary text-3xl" />
                <span className="font-semibold">{post.author.username || "Unknown User"}</span>
              </div>
              <img
                src={post.media.url}
                alt="Post"
                className="w-full rounded-md object-cover"
              />
              <p className="mt-2">{post.caption}</p>
              <div className="flex justify-between mt-2 text-gray-500">
                <FaRegHeart className="cursor-pointer hover:text-red-500" />
                <FaComment className="cursor-pointer hover:text-blue-500" />
                <FaShare className="cursor-pointer hover:text-green-500" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Feed;
