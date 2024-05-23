// CreatePost.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { compress } from 'image-conversion';

const CreatePost = ({ onPostCreation }) => {
  const { register, handleSubmit, watch, reset } = useForm(); // Added reset function from useForm
  const [compressedImage, setCompressedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedImage = watch('image');

  const onSubmit = async (data) => {
    const token = Cookies.get('accessToken');
    
    if (token) {
      try {
        setIsLoading(true); // Set loading state to true
        // Compress image
        const compressedFile = await compress(selectedImage[0], { quality: 0.3 }); // Adjust quality as needed

        // Update form data with compressed image
        const formData = new FormData();
        formData.append('image', compressedFile);
        formData.append('content', data.content);

        // Make API call with compressed image
        const response = await axios.post('http://localhost:8000/api/v1/feed/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the response indicates successful update
        if (response.status === 200 && response.data.success) {
          // Update successful
          console.log(response.data.data);
          alert('Post uploaded successfully!');
          reset(); // Clear form fields
          setCompressedImage(null); // Clear compressed image state
          setIsLoading(false); // Reset loading state
          onPostCreation(); // Notify parent component that a new post has been created
        } else {
          console.error('Update failed or unauthorized request:', response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false); // Reset loading state in case of error
      }
    } else {
      console.error('Token not found in localStorage');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image')}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => {
              const file = e.target.files[0];
              // Compress and set compressed image state
              compress(file, { quality: 0.6 }).then((compressedFile) => {
                setCompressedImage(compressedFile);
              });
            }}
          />
        </div>
        {compressedImage && (
          <div className="mb-4">
            <img src={URL.createObjectURL(compressedImage)} alt="Selected" className="max-w-full h-auto rounded-md" />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Caption</label>
          <textarea
            {...register('content')}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24 resize-none"
            placeholder="Enter your caption..."
          ></textarea>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2">Uploading...</span>
          </div>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
