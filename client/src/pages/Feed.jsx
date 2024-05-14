import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Input } from "@/components/ui/input";
import UserCard from "@/components/UserCards";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CreatePost from "@/components/CreatePost";
import { Link } from "react-router-dom";
import PostSection from "@/components/ShowPost";
import { useAuth } from "@/contexts/AuthContext";
const Feed = () => {
  const navigate=useNavigate();
  const {avatar}=useAuth();
  // const {UserData,setUserData,userType}=useAuth();
  
const userType=localStorage.getItem("userType");


  
  const username=localStorage.getItem('username');
  
  
  // console.log(avatar);
  const handleProfileClick=()=>{
    navigate('/myprofile')
  }
  const handleLogout=()=>{
    localStorage.removeItem('isUserAuthenticated');
    Cookies.remove('accessToken');
    localStorage.removeItem('username')
    localStorage.removeItem('avatar')
    localStorage.removeItem('userType');
    
    navigate("/auth/login");
  }
  useEffect(()=>{
    
  },[avatar])
 
  
  
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
     
    {/* Sidebar */}
    <div className="w-full md:w-1/5 bg-[#020617] border-r border-gray-200 lg:fixed lg:h-screen">
      <div className="p-4 flex items-center justify-between">
        {/* Profile Icon */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleProfileClick}>
          <img
            src={avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-sm font-semibold text-white">{username}</span>
        </div>
        {/* Logout Button */}
        <button className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="navbar mt-10 flex flex-col gap-5">
      <div className="flex rounded-lg">
          <Link
            to="search"
            className="text-center border w-full p-2 mx-2 text-white hover:bg-gray-700 hover:text-white"
          >
            Search
          </Link>
        </div>
        <div className="flex rounded-lg">
          <Link
            to="/feed"
            className="text-center border w-full p-2 mx-2 text-white hover:bg-gray-700 hover:text-white"
          >
            Feed
          </Link>
        </div>
        
          
            <>
              
          {
            
            userType=='alumni'&&(
              <>
              <div className="flex rounded-lg">
              <Link
              to="/edit/alumni"
              className="text-center border w-full p-2 mx-2 text-white hover:bg-gray-700 hover:text-white"
              
            >
             Edit Profile
            </Link>
            </div>
            </>
            )
          }
          {
            
            userType=='student'&&(
              <>
              <div className="flex rounded-lg">
              <Link
              to="/edit/student"
              className="text-center border w-full p-2 mx-2 text-white hover:bg-gray-700 hover:text-white"
              
            >
             Edit Profile
            </Link>
            </div>
            </>
            )
          }
          
        
            </>
          
        
        {/* {
          userType=="alumni" &&(
            <>
              <div className="flex rounded-lg">
          <Link
            to="editAlumni"
            className="text-center border w-full p-2 mx-2 text-white hover:bg-gray-700 hover:text-white"
            
          >
           Edit Profile
          </Link>
        </div>   
            </>
          )
        } */}
            
          
        
        
        
       
        
        
      </div>
    </div>
    {/* Main Content */}
    <div className=" flex-grow bg-[#0f172a] overflow-y-auto lg:ml-[20%] ">
      {/* Top Navigation Bar */}

      <Outlet/>
     
  </div>
,</div>
  );  
  
}
export default Feed;
