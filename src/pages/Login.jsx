import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    Password: "",
  });

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE - URL;
  //SHARED CHANGE HANDLER TO KEEP CODE CLEAN
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/user/login`, formData);

      //success path
      toast.success(response.data.message || "login successful");

      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      const backendMessage = error?.response?.data?.message;

      const statusCode = error?.response?.status;

      if (backendMessage) {
        toast.error(backendMessage);
      } else if (statusCode) {
        toast.error(`login failed (${statusCode}).`);
      } else {
        toast.error("Network error. Please check your internet connection.");
      }

      console.error("Login error:", error);
    }
  };
  return (
    <>
      <div>
        <h1>Welcome Back User</h1>

        <form
          className="mt-4 w-[90%] md:w-[40%] mx-auto flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mb-2 w-full"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 mb-2 w-full"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
