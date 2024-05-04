import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
const Dashboard = () => {
  const {UserData,setUserData}=useAuth();
  // console.log(UserData);
  const navigate=useNavigate();
  const name=UserData[0].data.user.name;
 
  const logout=()=>{
    localStorage.removeItem('isUserAuthenticated');
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