import { features } from "../constants";
import {useNavigate} from "react-router-dom"
const FeatureSection = () => {
  const navigate=useNavigate();
  return (
    
    <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
      <div className="text-center">
        <span className="text-white bg-gradient-to-r from-blue-400 to-blue-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-350 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2  uppercase cursor-pointer" onClick={()=>navigate("/auth/signup")}>
          Join us
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Unique{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-950 text-transparent bg-clip-text">
            Features
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                <p className="text-md p-2 mb-20 text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
