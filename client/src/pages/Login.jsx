import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../components/ui/PasswordInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { User } from "lucide-react";
import { useState } from "react";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const { UserData, setUserData,setUserType,userType } = useAuth();
  const onSubmit = async (data) => {
    try {
      // login API call
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data
      );
      // console.log('Login successful!', response.data);
      // Redirect to dashboard after successful login
      const accessToken = response.data.data.accessToken;

      //store the token in cookies
      Cookies.set("accessToken", accessToken);

      setUserData([response.data.data]);
      console.log(response.data.data);
      localStorage.setItem("isUserAuthenticated", true);
      localStorage.setItem("username", response.data.data.user.name);
      localStorage.setItem("avatar", response.data.data.user?.avatar?.url);
      localStorage.setItem("userType",response.data.data.user?.userType);
      // setUserType(response.data.data.user?.userType)

      if (response.data.data.user.avatar != null) {
        navigate("/search");
      } else {
        navigate("/ask");
      }
      // console.log(localStorage.getItem('data'));
    } catch (error) {
      toast.error("Wrong Email or Password! Please try again.");
    }
  };
  return(
        <div className="inside-box lg:w-[68%] md:w-[68%] sm:w-[80%]   mx-auto my-20 rounded-md  bg-[#0f172a] pb-2">
          <div className="inner-inner-box m-6">
            <div className=" font-bold text-white text-4xl  pt-8  ">
              <h2>Hey! 👋</h2>
              <h2 className="mt-3">
                Welcome to <span className="text-[#3863d2] ">Alumnet</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} action="POST">
              <div className="mt-10">
                <p className="text-gray-600 font-semibold mt-3">
                  Email Address / Phone Number
                </p>
                <div className="relative mb-6">
                  <FontAwesomeIcon
                    className="flex absolute mt-[9.5px] mx-1 font-thin text-gray-400 text-2xl pr-3"
                    icon={faEnvelope}
                  />
                  <Input
                    {...register("email", {
                      required: "Email or Phone Number is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="bg-gray-800 border-1 text-white mt-3 placeholder:font-medium placeholder:font-sans placeholder:ml-12 pl-8"
                    placeholder="Enter your Email or Phone Number"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailOrPhone && errors.emailOrPhone.message}
                  </p>

                  <label className="text-gray-600 font-semibold block mt-3">
                    Password
                  </label>
                  <PasswordInput
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="bg-gray-800 border-1 text-white mt-2 placeholder:font-medium placeholder:font-sans placeholder:ml-12"
                    placeholder="●●●●●●●●"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password && errors.password.message}
                  </p>
                </div>
              </div>
              <div className="button">
                <Button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-900"
                >
                  Continue
                </Button>
                <ToastContainer />
              </div>
            </form>

            <div>
              <p className="text-gray-600 mt-1 text-center ">
                Don't have an Account?
                <span
                  className="text-blue-600 font-bold cursor-pointer "
                  onClick={() => navigate("/auth/signup")}
                >
                  Sign Up
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
     
    
  );
}
