// src/components/SignupForm.jsx
import React, { useState } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gymName: "",
  });
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post("https://www.abhifitness.me/auth/register", formData).then((res) => {
      console.log(res);
      toast.success("Signup Successful");
    }).catch((err) => {
      toast(err.response.data.error);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Gym Owner Signup</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="mobile">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            name="phone"
            placeholder="Enter your mobile number"
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gym Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="gymName">
            Gym Name
          </label>
          <input
            type="text"
            id="gymName"
            name="gymName"
            placeholder="Enter your gym name"
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.gymName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        {/* <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
