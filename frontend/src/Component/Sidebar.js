// // src/components/Sidebar.jsx
// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router";
// import {
//     LayoutDashboard,
//     Users,
//     UserRoundPlus,
//     Settings,
//     LogOut,
//     Menu,
//     X
//   } from 'lucide-react';
// import axios from 'axios';

// const Sidebar = ({ isMobileOpen, toggleMobileMenu }) => {
//   const nevigate = useNavigate();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const handlelogout = async() => {
//     nevigate('/');
//     localStorage.clear();

//   }
//   return (
//     <div
//       className={`bg-gray-900 text-white  ${
//         isCollapsed ? "w-16 " : "w-64"
//       } transition-all duration-700  h-screen fixed md:relative  z-50 ${
//         isMobileOpen ? "block" : "hidden"
//       } md:block`}
//     >
//       {/* Logo Section */}
//       <div className={`flex items-center ${isCollapsed ? "justify-between" : "justify-end"} px-4 py-4`}>
//         {/* <h1 className={`text-lg font-bold ${isCollapsed && "hidden"}`}>
//           Gym App
//         </h1> */}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="text-xl focus:outline-none"
//         >
//           {isCollapsed ? <Menu/> : <X/>}
//         </button>
//       </div>

//       {/* Menu Items */}
//       <nav className="flex flex-col gap-2 mt-4">
        
//         <NavLink to="/dashboard"
//                     className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
//                   >
//                     <LayoutDashboard className=" text-2xl" />
//                     {!isCollapsed && <span>Dashboard</span>}
//                   </NavLink>
        
//                   <NavLink to="/Members"
//                     className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
//                   >
//                     <Users className="text-2xl" />
//                     {!isCollapsed && <span>Members</span>}
//                   </NavLink>
        
//                   <NavLink to="/AddMember"
//                     className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
//                   >
//                     <UserRoundPlus className="text-2xl" />
//                     {!isCollapsed && <span>New Member</span>}
//                   </NavLink>

//                   <NavLink to="/AddMembership"
//                     className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
//                   >
//                     <UserRoundPlus className="text-2xl" />
//                     {!isCollapsed && <span>Memberships</span>}
//                   </NavLink>
        
//                   <NavLink to="/Setting"
//                     className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
//                   >
//                     <Settings className="text-2xl" />
//                     {!isCollapsed && <span>Settings</span>}
//                   </NavLink>
        
//                   <div 
//                   onClick={handlelogout}
//                     className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
//                   >
//                     <LogOut className="text-2xl" />
//                     {!isCollapsed && <span>LogOut</span>}
//                   </div>
//       </nav>

//       {/* Close Button for Mobile */}
//       <button
//         onClick={toggleMobileMenu}
//         className="md:hidden absolute top-4 right-4 text-xl"
//       >
//         <X/>
//       </button>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  UserRoundPlus,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

const Sidebar = ({ isMobileOpen, toggleMobileMenu }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  const handleLogout = async () => {
    navigate("/");
    localStorage.clear();
  };

  // Collapse sidebar when clicking outside in mobile mode
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isMobileOpen) {
          toggleMobileMenu();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileOpen, toggleMobileMenu]);

  return (
    <div
      ref={sidebarRef}
      className={`bg-gray-800 shadow-xl text-white ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-700 h-screen ${
        isMobileOpen ? "fixed top-0 left-0 z-50" : "md:sticky md:top-0"
      } ${isMobileOpen ? "block" : "hidden"} md:block`}
    >
      {/* Logo Section */}
      <div
        className={`flex flex-row items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        } px-2 py-4`}
      >
        <h1 className={`text-lg font-bold ${isCollapsed && "hidden"}`}>
        Gym App
        </h1>
        {!isMobileOpen && <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xl focus:outline-none bg-white p-1 rounded-full text-gray-900"
        >
          {isCollapsed ? <Menu /> : <X />}
        </button>}
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 mt-4">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
        >
          <LayoutDashboard className="text-2xl" />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/Members"
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
        >
          <Users className="text-2xl" />
          {!isCollapsed && <span>Members</span>}
        </NavLink>

        <NavLink
          to="/AddMember"
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
        >
          <UserRoundPlus className="text-2xl" />
          {!isCollapsed && <span>New Member</span>}
        </NavLink>

        <NavLink
          to="/AddMembership"
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
        >
          <UserRoundPlus className="text-2xl" />
          {!isCollapsed && <span>Memberships</span>}
        </NavLink>

        <NavLink
          to="/Setting"
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
        >
          <Settings className="text-2xl" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-0 w-full px-4">
        <div
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-300"
        >
          <LogOut className="text-2xl" />
          {!isCollapsed && <span>LogOut</span>}
        </div>
      </div>

      {/* Close Button for Mobile */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden absolute top-4 right-4 text-xl bg-white p-1 rounded-full text-gray-900"
      >
        <X />
      </button>
    </div>
  );
};

export default Sidebar;
