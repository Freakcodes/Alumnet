import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <Link to={`profile/${user._id}`}>
    
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 ">
      <img className="w-full h-32 object-cover text-black" src={user.avatar.url} alt={user.name} />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-black">{user.name}</h2>
        <p className="text-gray-600 mt-2">{user.companyName}</p>
      </div>
    </div>
    </Link>
  );
};

export default UserCard;