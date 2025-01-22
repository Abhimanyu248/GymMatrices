// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Loader";



const Login = (login) => {

  const [loginData, setloginData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace this with real authentication logic
    await axios.post("https://www.abhifitness.me/auth/login", loginData, { withCredentials: true }).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem('islogin', true);
      toast.success(res.data.message);
      setLoading(false);
      navigate("/Dashboard");
    }).catch((err) => {
      console.log(err);
      toast.error(err.response.data.error);
      setLoading(false);
    });
  };

  if (loading) return (
    <Loader />
  );

  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-textPrimary mb-4">
          Gym Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-textSecondary text-sm mb-2"
            >
              Email
            </label>
            <input
              name="email"
              type="text"
              className="w-full p-2 rounded border border-borderLight bg-gray-900 text-inputText placeholder-inputPlaceholder focus:outline-none focus:ring-2 focus:ring-inputFocus"
              placeholder="Enter your username"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-textSecondary text-sm mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full p-2 rounded border border-borderLight bg-gray-900 text-inputText placeholder-inputPlaceholder focus:outline-none focus:ring-2 focus:ring-inputFocus"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-buttonPrimary hover:bg-buttonPrimaryHover text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-inputFocus"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            type="submit"
            className=" mt-4 w-full bg-buttonPrimary hover:bg-buttonPrimaryHover text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-inputFocus"
          >
            Signup
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
