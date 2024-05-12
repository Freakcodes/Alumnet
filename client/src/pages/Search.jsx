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
      <div className="bg-gray-600 border-b border-gray-200 py-4 px-6 flex items-center gap-3 lg:fixed w-screen ">
        {/* Logo */}

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#1f1f1f] p-2 rounded"
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
          className="bg-gray w-1/2 md:w-1/2 p-2 rounded-lg bg-white text-black"
          onChange={(e) => {
            console.log(e.target.value);
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 mt-[5%] ">
        {/* Placeholder Content */}
        {userData.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Search;
