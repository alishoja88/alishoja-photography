"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormInput = ({ type, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-700/50 rounded-lg text-white
          placeholder:text-gray-400 focus:outline-none focus:ring-2 
          focus:ring-purple-500 ${error ? "ring-2 ring-red-500" : ""}`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
