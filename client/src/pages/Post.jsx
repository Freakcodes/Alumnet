// ParentComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CreatePost from '@/components/CreatePost';
import ShowPost from '@/components/ShowPost';


const Post = () => {
  const [posts, setPosts] = useState([]);
  const [isNewPostCreated, setIsNewPostCreated] = useState(false);
  const token = Cookies.get('accessToken');

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/feed/post', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Effect to fetch posts initially and whenever isNewPostCreated changes
  useEffect(() => {
    fetchPosts();
  }, [token, isNewPostCreated]); // Include token and isNewPostCreated as dependencies to re-fetch posts when necessary

  // Function to handle post creation
  const handlePostCreation = () => {
    setIsNewPostCreated(true);
  };

  return (
    <div>
      <CreatePost onPostCreation={handlePostCreation} />
      <ShowPost posts={posts} />
    </div>
  );
};

export default Post;
