import React, { useEffect,useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const token = Cookies.get('accessToken');
    const getProfile=async()=>{
        if(token){
            const response = await axios.get('http://localhost:8000/api/v1/users/my-profile', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response.data);
            setProfileData(response.data.data) ;
            
        }
    }

    useEffect(()=>{
        getProfile();
    },[])
   
    return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-gray-900">
              <h1 className="text-white font-bold text-2xl">Profile</h1>
            </div>
            {profileData ? (
              <div className="p-4">
                <div className="flex items-center justify-center">
                  <img className="w-20 h-20 rounded-full" src={profileData.avatar.url} alt="Avatar" />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold">User Type:</label>
                  <p className="text-gray-800">{profileData.userType}</p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold">Phone Number:</label>
                  <p className="text-gray-800">{profileData.phoneNo}</p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold">LinkedIn URL:</label>
                  <a href={profileData.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">{profileData.linkedInUrl}</a>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold">College Name:</label>
                  <p className="text-gray-800">{profileData.collegeName}</p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold">Course Name:</label>
                  <p className="text-gray-800">{profileData.courseName}</p>
                </div>
              </div>
            ) : (
              <p className="p-4 text-center text-gray-800">Loading...</p>
            )}
          </div>
        </div>
      );
    
}

export default Profile;