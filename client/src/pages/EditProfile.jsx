import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const EditProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate=useNavigate();
  const onSubmit = async (data) => {
    
    const avatar=data.avatar[0];
    data.avatar=avatar;
    const token = Cookies.get('accessToken');
    
    if (token) {
      try {
        // Update student API call
        const response = await axios.post('http://localhost:8000/api/v1/users/update-student', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Check if the response indicates successful update
        if (response.status === 200 && response.data.success) {
          // Update successful, redirect to dashboard
          navigate("/dashboard");
        } else {
          // Handle update failure or unauthorized request
          console.error('Update failed or unauthorized request:', response.data.message);
          // Optionally, you can handle different types of errors here
        }
      } catch (error) {
        // Handle network errors or unexpected errors
        console.error('Error:', error);
      }
    } else {
      // Handle missing token
      console.error('Token not found in localStorage');
      // Optionally, you can redirect the user to the login page or display an error message
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 rounded-md shadow-md bg-[#0f172a] text-white">
    <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
            <label htmlFor="profilePicture" className="block mb-1">Avatar (jpg/png)</label>
            <Input
                type="file"
                id="profilePicture"
                {...register("avatar", {
                    required: true,
                    validate: {
                        validFileType: (value) =>
                            ["image/jpeg", "image/png"].includes(value[0].type),
                    },
                })}
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                    // Preview image when a file is selected
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            document.getElementById('avatar-preview').src = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                }}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
            />
            {errors.profilePicture && (
                <span className="text-red-500">
                    Please upload a valid JPG or PNG file
                </span>
            )}
        </div>
        <img id="avatar-preview" src="#" alt="Preview" className="mb-4" style={{ display: 'none', maxWidth: '100%', height: 'auto' }} />
        <div className="mb-4">
            <label className="block mb-1">User Type</label>
            <div className="flex">
                <div className="mr-4">
                    <input
                        type="radio"
                        id="Alumni"
                        value="Alumni"
                        {...register("userType", { required: true })}
                        defaultChecked
                    />
                    <label htmlFor="male" className="ml-1">Alumni</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="Student"
                        value="Student"
                        {...register("userType", { required: true })}
                    />
                    <label htmlFor="female" className="ml-1">Student</label>
                </div>
            </div>
            {errors.userType && <span className="text-red-500">Please select user type</span>}
        </div>
        <div className="mb-4">
            <label htmlFor="phoneNo" className="block mb-1">Phone Number</label>
            <Input
                type="tel"
                id="phoneNo"
                {...register("phoneNo", { required: true, pattern: /^[0-9]{10}$/ })}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
            />
            {errors.phoneNo && <span className="text-red-500">Please enter a valid phone number</span>}
        </div>
        <div className="mb-4">
            <label htmlFor="linkedInUrl" className="block mb-1">LinkedIn URL</label>
            <Input
                type="text"
                id="linkedInUrl"
                {...register("linkedInUrl", { pattern: /^(ftp|http|https):\/\/[^ "]+$/ })}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
            />
            {errors.linkedInUrl && <span className="text-red-500">Please enter a valid LinkedIn URL</span>}
        </div>
        <div className="mb-4">
            <label htmlFor="collegeName" className="block mb-1">College Name</label>
            <Input
                type="text"
                id="collegeName"
                {...register("collegeName", { required: true })}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
            />
            {errors.collegeName && <span className="text-red-500">College name is required</span>}
        </div>
        <div className="mb-4">
            <label htmlFor="courseName" className="block mb-1">Course Name</label>
            <Input
                type="text"
                id="courseName"
                {...register("courseName", { required: true })}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500"
            />
            {errors.courseName && <span className="text-red-500">Course name is required</span>}
        </div>
        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
            Save
        </button>
    </form>
</div>

  );
};

export default EditProfile;
