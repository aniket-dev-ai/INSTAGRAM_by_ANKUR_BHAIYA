import { FaUser, FaEnvelope, FaKey, FaFingerprint } from "react-icons/fa";

const Profile = () => {
  // Mock user data
  const user = {
    _id: "67b8c5aa0de8e436f6120fc3",
    username: "Aniket",
    email: "aniket@gmail.com",
    password: "$2b$10$c2fgzdnahl2ngC.FpWpG1.k37B4LtlvNkZEneZ29e9rZ18z400ZgS",
    __v: 0,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-primary text-2xl font-bold text-center mb-4">
          🕉️ User Profile 🕉️
        </h2>
        <div className="space-y-4">
          <div className="flex items-center border border-primary rounded p-2">
            <FaFingerprint className="text-primary mr-2" />
            <span className="font-semibold">ID:</span>
            <span className="ml-2">{user._id}</span>
          </div>
          <div className="flex items-center border border-primary rounded p-2">
            <FaUser className="text-primary mr-2" />
            <span className="font-semibold">Username:</span>
            <span className="ml-2">{user.username}</span>
          </div>
          <div className="flex items-center border border-primary rounded p-2">
            <FaEnvelope className="text-primary mr-2" />
            <span className="font-semibold">Email:</span>
            <span className="ml-2">{user.email}</span>
          </div>
          <div className="flex items-center border border-primary rounded p-2 overflow-hidden">
            <FaKey className="text-primary mr-2" />
            <span className="font-semibold">Password:</span>
            <span className="ml-2 truncate w-40">**********</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
