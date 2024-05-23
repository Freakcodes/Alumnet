import ShowPost from '@/components/ShowPost';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import React, {useState, useEffect } from 'react'
import axios from 'axios';
const ShowFeed = () => {
    const [posts,setPosts]=useState([]);
    const token=Cookies.get('accessToken');
    const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/feed/post', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.data);
          setPosts(response.data.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      const handleProfileClick = () => {
        navigate('/myprofile');
      };
    useEffect(()=>{
        fetchPosts();
    },[])
  return (
    <div className="container mx-auto">
      {posts.length > 0 ? (
        posts.map(post => (
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
              
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-8">Loading...</p>
      )}
    </div>
  )
}

export default ShowFeed