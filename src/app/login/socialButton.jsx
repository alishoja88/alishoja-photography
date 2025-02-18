"use client";
import Image from "next/image";

const SocialButton = ({ icon, provider, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-2 w-full px-4 py-3
      bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
  >
    {icon}
    <span className="text-white">Continue with {provider}</span>
  </button>
);

export default SocialButton;
