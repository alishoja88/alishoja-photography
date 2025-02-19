import Link from "next/link";
import Logo from "../../../public/svg/logo/AliLogo.svg";

const LogoNav = () => {
  return (
    <div className="flex items-center cursor-pointer mr-6 h-[60px] md:h-[80px]"> 
      <Link href="/" className="flex items-center h-full">
        <Logo className="w-auto h-full max-h-[60px] md:max-h-[80px] 
          fill-[#3A0CA3] hover:fill-[#4CC9F0] transition-all duration-300" />
      </Link>
    </div>
  );
};

export default LogoNav;
