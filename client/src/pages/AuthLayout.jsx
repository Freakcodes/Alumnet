import React from 'react'
import { LampDemo } from "../components/ui/LoginImage";
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
  return (
    <div className="w-screen flex font-sans">
      <div className="w-[50%] lg:block hidden h-screen">
        <LampDemo />
      </div>
      <div className=" lg:w-[50%] w-full   bg-[#020617] h-screen">
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthLayout