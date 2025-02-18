"use client";
import Link from "next/link";
import Logo from "../../../public/svg/logo/AliLogo.svg";

const LogoNav = () => {
  return (
    <div className="flex items-center  cursor-pointer mr-6"> 
      <Link href="/" className="flex items-center">
        <Logo className="w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[170px] lg:max-w-[180px] xl:max-w-[200px] 
          fill-[#3A0CA3] hover:fill-[#4CC9F0] transition-all duration-300" />
      </Link>
    </div>
  );
};

export default LogoNav;
