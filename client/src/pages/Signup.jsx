import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { LampDemo } from "../components/ui/LoginImage";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../components/ui/PasswordInput";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
// import { Toast } from "react-toastify/dist/components";
import { ToastContainer, toast } from 'react-toastify';
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
      console.log(response.data.data);
      // const accessToken=response.data.data.accessToken;
      
      //store the token in cookies
      // Cookies.set('accessToken', accessToken);
      toast.error("Login Successfull!!")
      // Redirect to dashboard after successful login
      navigate("/ask");
    } catch (error) {
      toast.error("Signup failed!");
      // Handle error (e.g., show error message)
    }

    // You can perform form submission logic here
  };
  return (
    
      

      

        <div className="   inside-box lg:w-[68%] md:w-[68%] sm:w-[80%]   mx-auto my-14 rounded-md  bg-[#0f172a] pb-2">
          <div className="inner-inner-box m-6">
            <div className=" font-bold text-white text-4xl  pt-8  ">
              <h2>Hey! 👋</h2>
              <h2 className="mt-3">
                Welcome to <span className="text-[#3863d2] ">Alumnet</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-10">
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
                  onClick={() => navigate("/auth/login")}
                >
                  Login
                </span>{" "}
              </p>
            </div>
          </div>
          <ToastContainer />
        </div>
        
     
    
  );
}
