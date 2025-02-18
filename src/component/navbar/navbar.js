"use client";

import React, { useState } from "react";
import LogoNav from "./logoNav";
import CenterNav from "./centerNav";
import RightNav from "./rightNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between h-[60px] md:h-[80px] px-4 md:px-6 lg:px-14 bg-white text-black fixed top-0 left-0 right-0 z-50 shadow-md max-w-screen-2xl mx-auto">
      <LogoNav />

      <div className="hidden md:flex justify-center flex-1 min-w-0">
        <CenterNav />
      </div>

      <RightNav />

      <button
        className="md:hidden flex items-center justify-center w-8 h-8 border rounded-lg ml-4"
        onClick={toggleMenu}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-white text-black transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-40 shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">Menu</h3>
          <button onClick={toggleMenu}>✕</button>
        </div>
        <ul className="flex flex-col gap-4 p-4">
          <CenterNav onClick={toggleMenu} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
