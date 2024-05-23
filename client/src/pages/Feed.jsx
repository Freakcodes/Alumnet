import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Input } from "@/components/ui/input";
import UserCard from "@/components/UserCards";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CreatePost from "@/components/CreatePost";
import { Link } from "react-router-dom";
const Feed = () => {
  const navigate=useNavigate();
  
  const src=localStorage.getItem('avatar');
  const username=localStorage.getItem('username');
  const token=Cookies.get('accessToken')
  
  const handleProfileClick=()=>{
    navigate('/profile')
  }
  const handleLogout=()=>{
    localStorage.removeItem('isUserAuthenticated');
    Cookies.remove('accessToken');
    localStorage.removeItem('username')
    localStorage.removeItem('avatar')
    navigate("/auth/login");
  }
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
     
    {/* Sidebar */}
    <div className="w-full md:w-1/5 bg-gradient-to-r from-cyan-950 to-black border-r border-gray-200 lg:fixed lg:h-screen">
      <div className="p-4 flex items-center justify-between">
        {/* Profile Icon */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleProfileClick}>
          <img
            src={src}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-sm font-semibold text-white">{username}</span>
        </div>
        {/* Logout Button */}
        <button className="bg-black h-8 w-20 mr-4 text-sm text-gray-300 hover:text-gray-600 focus:outline-none" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="navbar mt-10 flex flex-col gap-5">
        <div className="flex rounded-lg">
          <Link
            to="search"
            className="m-2 text-center hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-64 ml-6 p-2 mx-2 text-white bg-cyan-700"
          >
            Search
          </Link>
        </div>
        <div className="flex rounded-lg">
          <Link
            to="/feed"
            className="text-center hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-64 ml-6 p-2 mx-2 text-white bg-cyan-700 "
          >
            Feed
          </Link>
        </div>
        <div className="flex rounded-lg">
          <Link
            to="/profile/student"
            className="text-center hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-64 ml-6 p-2 mx-2 text-white bg-cyan-700 "
            
          >
           Edit Profile
          </Link>
        </div>
        
        
      </div>
    </div>
    {/* Main Content */}
    <div className=" flex-grow bg-black overflow-y-auto lg:ml-[20%] ">
      {/* Top Navigation Bar */}
      <Outlet/>
     
  </div>
,</div>
  );  
  
}
export default Feed;