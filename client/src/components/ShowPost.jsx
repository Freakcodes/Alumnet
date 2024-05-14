import React from 'react';

const PostSection = ({  content, imageUrl }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 mb-4">
      {/* Author */}
      <div className="flex items-center mb-2">
        <img
          
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="text-gray-800 font-semibold">Abhay Gupta</span>
      </div>
      {/* Content */}
      <p className="text-gray-700 mb-4">{content}</p>
      {/* Image */}
      {imageUrl && (
        <div className="mb-4">
          <img src={imageUrl} alt="Post" className="w-full rounded-md" />
        </div>
      )}
      {/* Like and Comment Section */}
      <div className="flex items-center justify-between">
        <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
          Like
        </button>
        <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
          Comment
        </button>
      </div>
    </div>
  );
};

export default PostSection;
