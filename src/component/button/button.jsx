"use client";

import Link from "next/link";

const Button = ({ href, type = "button", children, className = "", width = "auto", ...props }) => {
  const widthClasses = {
    "25%": "w-1/4",
    "33%": "w-1/3",
    "50%": "w-1/2",
    "66%": "w-2/3",
    "75%": "w-3/4",
    "100%": "w-full",
    auto: "w-auto",
  };

  return href ? (
    <Link
      href={href}
      className={`flex items-center transition-colors duration-300 px-6 sm:px-4 py-2 sm:py-2 text-base sm:text-base 
        ${widthClasses[width]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={`flex items-center justify-center gap-2 rounded-lg transition-colors duration-300 
        px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base 
        ${widthClasses[width]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
