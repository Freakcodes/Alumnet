import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/UserCards";
import Cookies from "js-cookie";
const Search = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("name");
  const token = Cookies.get("accessToken");
  const fetch = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/users/home");
    setUserData(response.data.data);
  };
  const fetchSearch = async (input) => {
    
    const response = await axios.get(
      `http://localhost:8000/api/v1/users/search-and-discover?${filter}=${input}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data.data);
    setUserData(response.data.data.data);
  };
  useEffect(() => {

        if (search.trim != "") {
            fetchSearch(search);
          }
          fetch()
    
  }, [search]);
  return (
    <div className="flex">
      {/* Top Navigation Bar */}
      <div className="bg-black border-gray-200 py-4 px-6 flex items-center gap-3 lg:fixed w-screen ">
        {/* Logo */}

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-black text-gray-300 border-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          <option value="name">Name</option>
          <option value="collegeName">College Name</option>
          <option value="companyName">Company</option>
          <option value="areaOfExpertise">Area of Expertise</option>
        </select>

        {/* Search Field */}
        <Input
          type="text"
          placeholder="Search..."
          className="bg-gray w-1/2 md:w-1/2 p-2 bg-zinc-900 shadow-cyan-800 shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-gray-300 rounded-md"
          onChange={(e) => {
            console.log(e.target.value);
            setSearch(e.target.value);
          }}
        />
        <button type="submit" className="bg-gradient-to-r from-cyan-600 to-cyan-950 text-sm rounded-md h-8 w-20 hover:shadow-cyan-800 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  transition-all duration-400 text-gray-100">Search</button>
      </div>

      {/* Main Content Area */}
      
      <div className="bg-black p-6 grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
        {/* Placeholder Content */}
        {userData.map((user) => {
          return <UserCard key={user._id} user={user} />;
        })}
      </div>
    </div>
   
  );
};

export default Search;