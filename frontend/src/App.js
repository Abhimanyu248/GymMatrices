// src/App.jsx
import { React, useState, useEffect } from "react";
import Home from "./Component/Home";
import AddMemberForm from "./Component/Member/AddMemberForm";
import Members from "./Component/Member/Members";
import Login from "./Component/Login";
import { Routes, Route, useNavigate } from 'react-router';
import Dashboard from "./Component/Dashboard";
import Sidebar from "./Component/Sidebar";
import Navbar from "./Component/Navbar";
import SignupForm from "./Component/SignupForm";
import AddMembership from "./Component/AddMembership";
import 'react-toastify/dist/ReactToastify.css';
import Setting from "./Component/Setting";
import MemberProfile from "./Component/Member/MemberProfile";
import General from "./Component/page/General";


const App = () => {
  const nevigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [islogin, setIslogin] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  const local = localStorage.getItem('islogin');
  useEffect(() => {
    let islogin = localStorage.getItem('islogin');
    if(islogin){
      setIslogin(true);
      // nevigate('/Dashboard');
    }
    else{
      setIslogin(false);
      nevigate('/');
    }
  },[local]);
  
  return (  
    <div className="flex min-h-screen bg-gray-900">
    {/* Sidebar */}
    {islogin && <Sidebar isMobileOpen={isMobileOpen} toggleMobileMenu={toggleMobileMenu} />}

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Navbar */}
      {islogin && <Navbar toggleMobileMenu={toggleMobileMenu} islogin={islogin}  isMobileOpen={isMobileOpen}/>}
      


      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<SignupForm />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="AddMember" element={<AddMemberForm />} />
        <Route path="AddMembership" element={<AddMembership />} />
        <Route path="Members" element={<Members />} />
        <Route path="member/:id" element={<MemberProfile />} />
        <Route path="specific/:page" element={<General />} />
        <Route path="Setting" element={<Setting />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
