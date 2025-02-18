"use client";
// src/app/components/ClientLayout.js
import { SessionProvider } from "next-auth/react";
import Navbar from "@/component/navbar/navbar";
import Footer from "@/component/Footer/footer";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SessionProvider>
  );
}