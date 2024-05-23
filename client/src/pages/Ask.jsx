import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Ask = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  const handleSelection = (type) => {
    setUserType(type);
    // Navigate based on user selection
    if (type === 'student') {
      localStorage.setItem('userType','student');
      navigate('/edit/student');
    } else if (type === 'alumni') {
      localStorage.setItem('userType','student');
      navigate('/edit/alumni');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      <p className="text-lg mb-8">Are you a student or alumni?</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleSelection('student')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Student
        </button>
        <button
          onClick={() => handleSelection('alumni')}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Alumni
        </button>
      </div>
    </div>
  );
};

export default Ask;
