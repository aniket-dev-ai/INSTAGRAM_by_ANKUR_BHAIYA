import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      toast.error("All fields are required!");
      return;
    }
    toast.success("Registered successfully! 🚀");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-primary text-2xl font-bold text-center mb-4">
          🕉️ Sanatani Registration 🕉️
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-primary rounded p-2">
            <FaUser className="text-primary mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center border border-primary rounded p-2">
            <FaEnvelope className="text-primary mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center border border-primary rounded p-2">
            <FaLock className="text-primary mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Register
          </button>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Register;
