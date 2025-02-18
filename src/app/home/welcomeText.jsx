import React from "react";
import "./welcomeText.css";

const WelcomeText = () => {
  return (
    <div className="welcome-text absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 md:px-8">
      <div className="text-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Visual Stories
        </h1>
        <h6 className="text-white text-base sm:text-lg mt-4">
          Daily photography by Ali Shoja
        </h6>
      </div>
    </div>
  );
};

export default WelcomeText;
