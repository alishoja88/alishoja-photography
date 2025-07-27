"use client";
// src/app/components/ClientLayout.js
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/Footer/footer";

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop loading after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SessionProvider 
      refetchInterval={0}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      {isLoading ? (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </>
      )}
    </SessionProvider>
  );
}