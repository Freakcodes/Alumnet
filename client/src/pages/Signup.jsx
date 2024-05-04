import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { LampDemo } from "../components/ui/LoginImage";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../components/ui/PasswordInput";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    // e.preventDefault();
    try {
      // Assuming login API call
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        data
      );
      console.log("Login successful!", response.data);
      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed!", error);
      // Handle error (e.g., show error message)
    }

    // You can perform form submission logic here
  };
  return (
    <div className="w-screen flex font-sans">
      <div className="w-[50%] lg:block hidden h-screen">
        <LampDemo />
      </div>

      <div className=" lg:w-[50%] w-full   bg-[#020617] h-screen">
        {/* <h1 className="font-bold text-4xl text-[#3863d2] text-center mt-[10%]">
         
        </h1> */}
        <div className="   inside-box lg:w-[68%] md:w-[68%] sm:w-[80%]   mx-auto my-15 rounded-md  bg-[#0f172a] pb-2">
          <div className="inner-inner-box m-6">
            <div className=" font-bold text-white text-4xl  pt-8  ">
              <h2>Hey! 👋</h2>
              <h2 className="mt-3">
                Welcome to <span className="text-[#3863d2] ">Alumnet</span>
              </h2>
            </div>
            <div className=" mt-3">
              <p className="font-sans text-[#334155]">
                Simplify your signup process with one-click Google access.
              </p>
            </div>
            <div className="button ">
              <Button className="border border-gray-600 w-full mt-8 ">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="30px"
                  height="30px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>{" "}
                <span className="text-[1rem] ml-3">Continue with Google</span>
              </Button>
            </div>
            <div className="continue">
              <div class="flex items-center mt-3">
                <hr class="flex-grow border-t border-gray-600" />
                <span class="px-3 text-gray-500 ">or Continue with</span>
                <hr class="flex-grow border-t border-gray-600" />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p className="text-gray-600 font-semibold mt-1">Username</p>
                <Input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 6,
                      message: "Username must be at least 6 characters long",
                    },
                  })}
                  className={`bg-gray-800 border-1 text-white  placeholder:font-medium placeholder:font-sans placeholder:ml-12 ${
                    errors.username ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your Username"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
                 <p className="text-gray-600 font-semibold mt-1">Name</p>
                <Input
                  {...register("name", {
                    required: "Username is required",
                    minLength: {
                      value: 6,
                      message: "Username must be at least 6 characters long",
                    },
                  })}
                  className={`bg-gray-800 border-1 text-white  placeholder:font-medium placeholder:font-sans placeholder:ml-12 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your name"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
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
                      required: "Email or Phone number is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`bg-gray-800 border-1 text-white  placeholder:font-medium placeholder:font-sans placeholder:ml-12 pl-8 ${
                      errors.emailOrPhone ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your Email or Phone Number"
                  />
                  {errors.emailOrPhone && (
                    <p className="text-red-500 mt-1">
                      {errors.emailOrPhone.message}
                    </p>
                  )}
                  <label className="text-gray-600 font-semibold block mt-3">
                    Password
                  </label>
                  <PasswordInput
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                    className={`bg-gray-800 border-1 text-white  placeholder:font-medium placeholder:font-sans placeholder:ml-12 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="●●●●●●●●"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>
              <div className="button">
                <Button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-900"
                >
                  Continue
                </Button>
              </div>
            </form>
            <div>
              <p className="text-gray-600 mt-1 text-center ">
                Already have an Account?
                <span
                  className="text-blue-600 font-bold cursor-pointer  "
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
