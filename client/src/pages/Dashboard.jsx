import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Dashboard = () => {
  const {UserData,setUserData}=useAuth();
 
  const navigate=useNavigate();
  const name=localStorage.getItem('username')
  
 
  const logout=()=>{
    localStorage.removeItem('isUserAuthenticated');
    Cookies.remove('accessToken');
    localStorage.removeItem('username')
    navigate("/login");

  }
  
  return (
    <>
      <div className='text-3xl'>
        Welcome {name}
      </div>
      <button onClick={logout}>Logout </button>
    </>
  )
}

export default Dashboard