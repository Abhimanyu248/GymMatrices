// src/components/Navbar.jsx
import {React} from "react";
import {Menu } from 'lucide-react';

const Navbar = ({ toggleMobileMenu , islogin , isMobileOpen }) => {

  // const userdata = localStorage.getItem("user"); // Get the user from local storage
  // const [data,setdata] =useState(JSON.parse(userdata));
  // const GymName = data.data.gymName; // Get the gym name from user data
  return (
    <div className=" sticky top-0 bg-gray-800 text-white shadow-xl flex justify-between items-center p-4 z-10">
      {/* Hamburger Menu */}
      <button
        className="text-2xl md:hidden"
        onClick={toggleMobileMenu}
      >
        <Menu />
      </button>

      {/* Logo */}
      <h1 className="text-lg font-bold">{islogin ? "Admin" : "Admin"}</h1>

      {/* Search and Icons */}
      <div className="flex items-center gap-4">
        
        <span className="text-2xl">🔔</span>
        <span className="text-2xl">👤</span>
      </div>
    </div>
  );
};

export default Navbar;
