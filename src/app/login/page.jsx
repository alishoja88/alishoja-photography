"use client";
import { useState } from "react";
import LoginImage from "./loginImage";
import AuthForm from "./AuthForm";


const LoginPage = () => {
  const [authMode, setAuthMode] = useState("signin");

  return (
    <div className="min-h-screen w-full flex">
    <LoginImage />
    <div className="w-full lg:w-1/2 min-h-screen bg-[#1c1c28] flex items-center justify-center">
      <AuthForm mode={authMode} onModeChange={setAuthMode} />
    </div>
  </div>
  );
};

export default LoginPage;
