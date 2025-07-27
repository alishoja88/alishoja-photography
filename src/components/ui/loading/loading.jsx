"use client";

import React from "react";

const LoadingSpinner = ({
  text = "Loading...",
  size = "md", 
  fullscreen = false, 
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-24 h-24 border-8",
  };

  return (
    <div
      className={`flex items-center justify-center ${
        fullscreen ? "fixed inset-0 bg-gray-900 bg-opacity-50 z-50" : ""
      }`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`animate-spin rounded-full border-t-4 border-red-500  border-solid ${
            sizeClasses[size]
          }`}
        ></div>
        <p className="mt-4 text-white text-lg font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
