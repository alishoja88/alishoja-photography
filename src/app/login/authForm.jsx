"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormInput from "@/component/formInput/formInput";
import Button from "@/component/button/button";
import SocialButton from "./socialButton";
import Image from "next/image";

const AuthForm = ({ mode, onModeChange }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  if (session) {
    router.push("/gallery");
    return null;
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/gallery");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/gallery");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/gallery" });
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="w-full max-w-md px-6">
      <h2 className="text-3xl font-bold text-white mb-2">
        {mode === "signup" ? "Create an account" : "Welcome back"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <p className="text-gray-400 mb-8">
        {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => onModeChange(mode === "signup" ? "signin" : "signup")}
          className="text-[#7209B7] hover:text-[#B5179E]"
        >
          {mode === "signup" ? "Log in" : "Sign up"}
        </button>
      </p>

      <form className="space-y-4" onSubmit={mode === "signup" ? handleSignup : handleLogin}>
        {mode === "signup" && (
          <div className="flex gap-4">
            <FormInput 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              value={formData.firstName} 
              onChange={handleInputChange("firstName")} 
              required 
            />
            <FormInput 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              value={formData.lastName} 
              onChange={handleInputChange("lastName")} 
              required 
              
            />
          </div>
        )}

        <FormInput 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleInputChange("email")} 
          autoComplete="on"
          required 
        />
        <FormInput 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleInputChange("password")} 
          autoComplete="new-password"
          required 
        />

        <Button 
          className="bg-[#7209B7] text-white rounded-lg hover:bg-[#B5179E]" 
          type="submit" 
          width="100%"
          disabled={loading}
        >
          {loading ? "Loading..." : (mode === "signup" ? "Create account" : "Sign in")}
        </Button>
      </form>

      <div className="mt-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1c1c28] text-gray-400">Or continue with</span>
          </div>
        </div>

        <SocialButton
          icon={<Image src="/svg/iconGoogle.svg" alt="Google" width={20} height={20} />}
          provider="Google"
          onClick={handleGoogleSignIn}
        />
      </div>

      <p className="text-gray-400 text-sm text-center mt-6">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-[#7209B7] hover:text-[#B5179E]">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-[#7209B7] hover:text-[#B5179E]">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;