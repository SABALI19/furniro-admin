import React, { useState } from "react"; // Fixed import
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000/";

  // Shared change handler to keep code clean
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Fixed typo: handSubmit -> handleSubmit
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/api/user/register`,
        formData
      );
      
      // Axios puts the data in .data. 
      // If it reaches this line, the request was successful (2xx status).
      console.log("Registration successful:", response.data);
      alert("Registration successful! Please login.");
      navigate("/login");
      
    } catch (error) {
      // Axios errors contain the server message in error.response.data
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center m-4">
        Welcome User, Create an account with us
      </h1>
      <form
        className="mt-4 w-[90%] md:w-[40%] mx-auto flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Full name"
          className="border p-2 mb-2 w-full"
          name="name"
          value={formData.name} // Added value for controlled component
          onChange={handleChange}
        />
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
        <button type="submit" className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;