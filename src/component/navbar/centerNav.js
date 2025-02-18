import Link from "next/link";
import React from "react";

const CenterNav = ({ onClick }) => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About Me" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <ul className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 md:gap-2 lg:gap-4 w-full">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onClick}
            className="block px-2 lg:px-4 py-2 text-center text-sm md:text-base hover:bg-[#4895EF] rounded-md transition-colors whitespace-nowrap"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CenterNav;