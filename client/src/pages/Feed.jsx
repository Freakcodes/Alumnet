import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Input } from "@/components/ui/input";
import UserCard from "@/components/UserCards";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Feed = () => {
  const navigate=useNavigate();
  const [userData,setUserData]=useState([]);
  const [search,setSearch]=useState("");
  const src=localStorage.getItem('avatar');
  const username=localStorage.getItem('username');
  const token=Cookies.get('accessToken')
  const fetch=async()=>{
    const response= await axios.get('http://localhost:8000/api/v1/users/home');
    setUserData(response.data.data);
  }
  const fetchSearch=async(input)=>{
    const response=await axios.get(`http://localhost:8000/api/v1/users/search-and-discover?name=${input}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data.data);
    setUserData(response.data.data.data);  
  }
  const handleProfileClick=()=>{
    navigate('/profile')
  }
  const handleLogout=()=>{
    localStorage.removeItem('isUserAuthenticated');
    Cookies.remove('accessToken');
    localStorage.removeItem('username')
    localStorage.removeItem('avatar')
    navigate("/login");
  }
  useEffect(()=>{
    if(search.trim!=""){
      fetchSearch(search);
    }
    fetch();
    
   
    
  },[search])
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-full md:w-1/5 bg-[#020617] border-r border-gray-200">
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
        <button className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {/* Sidebar Content (you can put more content here) */}
    </div>
    {/* Main Content */}
    <div className="flex-grow bg-[#0f172a] overflow-y-auto">
      {/* Top Navigation Bar */}
      <div className="bg-gray-600 border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        {/* Logo */}
        {/* Search Field */}
        <Input
          type="email"
          placeholder="Search..."
          className="bg-gray w-full md:w-1/2 p-2 rounded"
          onChange={(e)=>{
            console.log(e.target.value);
            setSearch(e.target.value);
          }}
        />
      </div>
      {/* Main Content Area */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Placeholder Content */}
        {userData.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  </div>
  );  
  
}
export default Feed;
