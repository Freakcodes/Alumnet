// ShowPost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const ShowPost = ({ posts, isNewPostCreated }) => {
  const navigate = useNavigate();
  const [fetchedPosts, setFetchedPosts] = useState([]);

  useEffect(() => {
    setFetchedPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (isNewPostCreated) {
      fetchPosts();
    }
  }, [isNewPostCreated]);

  const fetchPosts = async () => {
    const token = Cookies.get('accessToken');
    try {
      const response = await axios.get('http://localhost:8000/api/v1/feed/post', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFetchedPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/myprofile');
  };

  const handleDelete = async (postId) => {
    const token = Cookies.get('accessToken');
    console.log(postId);
    try {
      
      const response = await axios.delete(`http://localhost:8000/api/v1/feed/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // If post is deleted successfully, fetch posts again to update the list
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="container mx-auto">
      {fetchedPosts.length > 0 ? (
        fetchedPosts.map(post => (
          <div key={post._id} className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <div className="p-6">
              <Link to={`/search/profile/${post.ownerInfo._id}`}>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={handleProfileClick}>
                  <img src={post.ownerInfo.avatar.url} alt="Profile" className="w-12 h-12 rounded-full" />
                  <span className="text-sm font-semibold text-black">{post.ownerInfo.username}</span>
                </div>
              </Link>
              <h3 className="text-xl  mb-2 text-black mt-3">{post.content}</h3>
              {post.image ? (
                <img src={post.image.url} alt="Post" className="w-full h-64 object-cover mb-2" />
              ) : (
                <></>
              )}
              <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-8">Loading...</p>
      )}
    </div>
  );
};

export default ShowPost;