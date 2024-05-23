import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import p from "../assets/img.svg";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const token = Cookies.get("accessToken");
  const getProfile = async () => {
    if (token) {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/my-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setProfileData(response.data.data);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className=" flex items-center justify-center m-16 inside-box lg:w-[68%] md:w-[68%] sm:w-[80%] mx-auto">
      <div className=" lg:block hidden p-2 lg:w-1/2 mr-32">
        <img src={p} alt=""  />
      </div>

      <div className=" transition-all duration-700 hover:scale-110 hover:shadow-cyan-700/100 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] lg:w-[50%] lg:h-[50%] rounded-lg  ">
        {profileData ? (
          <div className="p-4 ">
            <div className="flex items-center justify-center w-[200px] ">
              <img
                className="rounded-lg"
                src={profileData.avatar.url}
                alt="Avatar"
                
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold">User Type:</label>
              <p className="text-gray-600">{profileData.userType}</p>
            </div>
            <hr />
            <div className="mt-4">
              <label className="block text-sm font-semibold">
                Phone Number:
              </label>
              <p className="text-gray-600">{profileData.phoneNo}</p>
            </div>
            <hr />
            <div className="mt-4">
              <label className="block text-sm font-semibold">
                LinkedIn URL:
              </label>
              <a
                href={profileData.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                {profileData.linkedInUrl}
              </a>
            </div>
            <hr />
            <div className="mt-4">
              <label className="block text-sm font-semibold">
                College Name:
              </label>
              <p className="text-gray-600">{profileData.collegeName}</p>
            </div>
            <hr />
            <div className="mt-4">
              <label className="block text-sm font-semibold">
                Course Name:
              </label>
              <p className="text-gray-600">{profileData.courseName}</p>
            </div>
          </div>
        ) : (
          <p className="p-4 text-center text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
