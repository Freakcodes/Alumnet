import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const EditProfileAlumni = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const token = Cookies.get('accessToken');
    
    if (token) {
      try {
        const formData = new FormData();
        formData.append('avatar', data.avatar[0]);
        formData.append('userType', data.userType);
        formData.append('phoneNo', data.phoneNo);
        formData.append('linkedInUrl', data.linkedInUrl);
        formData.append('collegeName', data.collegeName);
        formData.append('courseName', data.courseName);
        formData.append('companyName', data.companyName);
        formData.append('location', data.location);
        formData.append('areaOfExpertise', data.areaOfExpertise);
        
        const response = await axios.post('http://localhost:8000/api/v1/users/update-alumni', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200 && response.data.success) {
          navigate("/feed");
        } else {
          console.error('Profile creation failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Token not found in localStorage');
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="avatar" className="block mb-1">Avatar (jpg/png)</label>
          <input
            type="file"
            id="avatar"
            {...register("avatar", {
              required: true,
              validate: {
                validFileType: (value) =>
                  ["image/jpeg", "image/png"].includes(value[0].type),
              },
            })}
            accept=".jpg, .jpeg, .png"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
          {errors.avatar && (
            <span className="text-red-500">Please upload a valid JPG or PNG file</span>
          )}
        </div>
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
              <label htmlFor="Alumni" className="ml-1">Alumni</label>
            </div>
            <div>
              <input
                type="radio"
                id="Student"
                value="Student"
                {...register("userType", { required: true })}
              />
              <label htmlFor="Student" className="ml-1">Student</label>
            </div>
          </div>
          {errors.userType && <span className="text-red-500">Please select user type</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNo" className="block mb-1">Phone Number</label>
          <input
            type="tel"
            id="phoneNo"
            {...register("phoneNo", { required: true, pattern: /^[0-9]{10}$/ })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
          {errors.phoneNo && <span className="text-red-500">Please enter a valid phone number</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="linkedInUrl" className="block mb-1">LinkedIn URL</label>
          <input
            type="text"
            id="linkedInUrl"
            {...register("linkedInUrl", { pattern: /^(ftp|http|https):\/\/[^ "]+$/ })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
          {errors.linkedInUrl && <span className="text-red-500">Please enter a valid LinkedIn URL</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="collegeName" className="block mb-1">College Name</label>
          <input
            type="text"
            id="collegeName"
            {...register("collegeName", { required: true })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
          {errors.collegeName && <span className="text-red-500">College name is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="courseName" className="block mb-1">Course Name</label>
          <input
            type="text"
            id="courseName"
            {...register("courseName", { required: true })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
          {errors.courseName && <span className="text-red-500">Course name is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="companyName" className="block mb-1">Company Name</label>
          <input
            type="text"
            id="companyName"
            {...register("companyName", { required: true })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
          {errors.companyName && <span className="text-red-500">Company name is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-1">Location</label>
          <input
            type="text"
            id="location"
            {...register("location", { required: true })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
          {errors.location && <span className="text-red-500">Location is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="areaOfExpertise" className="block mb-1">Area of Expertise</label>
          <input
            type="text"
            id="areaOfExpertise"
            {...register("areaOfExpertise", { required: true })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
          {errors.areaOfExpertise && <span className="text-red-500">Area of expertise is required</span>}
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

export default EditProfileAlumni;
