"use client";

import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import CustomImage from "@/component/image/customImage";
import LookContent from "../../../public/images/people90.JPEG";
import Button from "@/component/button/button";

const LookingAround = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)" : "translate3d(0,20px,0)",
    config: { tension: 170, friction: 26 },
  });

  return (
    <animated.article ref={ref} style={fadeIn} className="px-4">
      <div className="bg-[#4CC9F0] rounded-lg overflow-hidden">
        <div className="p-3 sm:p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 text-center md:text-start">
            <div className="space-y-3 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-black">
                Looking Around Through My Camera
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-black/80 max-w-md mx-auto md:mx-0">
                Discover the art of photography through my lens. Each image tells a unique story, capturing moments that would otherwise pass unnoticed.
              </p>
              <div className="flex justify-center md:justify-start">
                <Button
                  href="/gallery"
                  width="auto"
                  className="text-sm sm:text-base text-center px-3 py-1 sm:px-6 sm:py-2 
                    justify-center gap-1 bg-[#7209B7] text-white rounded-lg hover:bg-[#B5179E]"
                >
                  See more Photos
                </Button>
              </div>
            </div>
            <div className="relative md:mt-0 h-[200px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
              <figure className="relative w-full rounded-lg mb-0 md:mb-6" style={{ aspectRatio: "4 / 3" }}>
                <CustomImage
                  src={LookContent}
                  alt="Street photography showcasing unique perspectives and moments captured through the lens"
                  fill
                  className="rounded-lg object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </animated.article>
  );
};

export default LookingAround;
