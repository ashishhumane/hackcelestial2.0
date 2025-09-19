import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import bg from "@/assets/backgroundd.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | null }>({
    text: "",
    type: null,
  });

  // Auto-hide toast
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: null }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const clearFields = () => {
    setFormData({ fullName: "", email: "", password: "", rememberMe: false });
    setNewPassword("");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsForgot(false);
    setResetMode(false);
    clearFields();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isLogin && !isForgot) {
        // 🔹 Signup
        const res = await axios.post(`${BackendUrl}/api/user/signup`, {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        // ✅ Save token
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        setMessage({ text: res.data.message || "Signup successful", type: "success" });
        setIsLogin(true);

        // Clear fields
        setFormData({ fullName: "", email: "", password: "", rememberMe: false });
        setNewPassword("");

        setTimeout(() => {
          navigate("/"); // or "/dashboard"
        }, 100);
      } else if (isLogin && !isForgot) {
        // 🔹 Login
        const res = await axios.post(
          `${BackendUrl}/api/user/login`,
          { email: formData.email, password: formData.password },
          { withCredentials: true }
        );

        // ✅ Save token
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        setMessage({ text: res.data.message || "Login successful", type: "success" });

        // Clear fields
        setFormData({ fullName: "", email: "", password: "", rememberMe: false });
        setNewPassword("");

        setTimeout(() => {
          navigate("/"); // or "/dashboard"
        }, 100);
      } else if (isForgot && !resetMode) {
        // 🔹 Forgot Password
        const res = await axios.post(`${BackendUrl}/api/user/forgot-password`, { email: formData.email });
        setMessage({ text: res.data.message || "Reset link sent", type: "success" });
        setResetMode(true);

        setFormData({ fullName: "", email: "", password: "", rememberMe: false });
        setNewPassword("");
      } else if (isForgot && resetMode) {
        // 🔹 Reset Password
        const res = await axios.post(`${BackendUrl}/api/user/reset-password`, {
          email: formData.email,
          newPassword,
        });
        setMessage({ text: res.data.message || "Password reset successful", type: "success" });
        setIsForgot(false);
        setIsLogin(true);
        setResetMode(false);

        setFormData({ fullName: "", email: "", password: "", rememberMe: false });
        setNewPassword("");
      }
    } catch (err: any) {
      setMessage({ text: err.response?.data?.message || "Request failed", type: "error" });
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white p-9 rounded-2xl shadow-2xl w-[400px] text-center">
        <h2 className="mb-6 text-[26px] text-pink-600 font-semibold">
          {isForgot ? (resetMode ? "Reset Password" : "Forgot Password") : isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Manual toast inside div */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm font-medium ${message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && !isForgot && (
            <div className="flex items-center mb-5 bg-white p-3 rounded-lg border border-gray-300">
              <FaUser className="mr-3 text-pink-600" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full outline-none text-pink-600 placeholder-pink-600"
              />
            </div>
          )}

          {!resetMode && (
            <div className="flex items-center mb-5 bg-white p-3 rounded-lg border border-gray-300">
              <FaEnvelope className="mr-3 text-pink-600" />
              <input
                type="email"
                name="email"
                placeholder="Gmail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full outline-none text-pink-600 placeholder-pink-600"
              />
            </div>
          )}

          {!isForgot && (
            <div className="flex items-center mb-5 bg-white p-3 rounded-lg border border-gray-300">
              <FaLock className="mr-3 text-pink-600" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required={!isForgot}
                className="w-full outline-none text-pink-600 placeholder-pink-600"
              />
            </div>
          )}

          {isForgot && resetMode && (
            <div className="flex items-center mb-5 bg-white p-3 rounded-lg border border-gray-300">
              <FaLock className="mr-3 text-pink-600" />
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full outline-none text-pink-600 placeholder-pink-600"
              />
            </div>
          )}

          {isLogin && !isForgot && (
            <div className="flex justify-between items-center text-xs mb-5">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="text-pink-600">Remember me</span>
              </label>
              <span className="text-pink-600 cursor-pointer" onClick={() => setIsForgot(true)}>
                Forgot password?
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-pink-600 text-white rounded-lg text-lg font-medium cursor-pointer hover:bg-pink-500 transition"
          >
            {isForgot ? (resetMode ? "Reset Password" : "Send Reset Link") : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {!isForgot && (
          <p onClick={toggleForm} className="mt-4 text-sm text-pink-600 cursor-pointer">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
