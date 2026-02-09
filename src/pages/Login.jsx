import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { authUtils } from "../utils/auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, formData);

      // Extract token and role from response
      const { token, data } = response.data;
      const userRole = data?.role;

      // Validate response data
      if (!token || !userRole) {
        throw new Error("Invalid response from server");
      }

      // Store auth data using utility
      authUtils.setAuthData(token, userRole);

      toast.success(response.data.message || "Login successful!");

      // Navigate based on role (optional - customize as needed)
      setTimeout(() => {
        if (userRole === "admin") {
          navigate("/dashboard");
        } else if (userRole === "user") {
          navigate("/");
        } else {
          navigate("/dashboard");
        }
      }, 1000);

    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      const statusCode = error?.response?.status;

      if (backendMessage) {
        toast.error(backendMessage);
      } else if (statusCode === 401) {
        toast.error("Invalid email or password");
      } else if (statusCode === 403) {
        toast.error("Access denied");
      } else if (statusCode) {
        toast.error(`Login failed (${statusCode})`);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Network error. Please check your connection.");
      }

      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;