import React from "react";
import animationData from "../../public/animationERROR.json";
import Lottie from "lottie-react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FAFB] text-center p-5">
      {/* Lottie Animation */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-6">
        Oops! Page Not Found 😢
      </h1>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-[#2D6A50] text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 text-sm sm:text-base"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
