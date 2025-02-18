"use client";
import Image from "next/image";

const LoginImage = () => {
  return (
    <div className="hidden md:block lg:w-1/2 h-screen relative">
      <Image
        src="/images/people5.JPEG"
        alt="Fixed Image"
        fill
        className="object-cover"
        priority
        quality={80}
        sizes="(max-width: 768px) 0vw, (max-width: 1024px) 100vw, 50vw"
        
      />
    </div>
  );
};

export default LoginImage;