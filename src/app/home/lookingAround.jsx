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
    transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)',
    config: { tension: 170, friction: 26 },
  });

  return (
    <animated.article ref={ref} style={fadeIn} className="px-4">
      <div className="bg-[#4CC9F0] rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:text-start text-center">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-black">
                Looking Around Through My Camera
              </h2>
              <p className="text-base sm:text-lg md:text-lg text-black/80 max-w-md">
                Discover the art of photography through my lens. Each image tells a unique story, capturing moments that would otherwise pass unnoticed.
              </p>
              <div className="flex md:justify-start justify-center text-center">
                <Button
                  href="/gallery"
                  width="50%"
                  className="justify-center gap-2 bg-[#7209B7] text-white rounded-lg hover:bg-[#B5179E]"
                >
                  See more Photos
                </Button>
              </div>
            </div>
            <div className="relative mt-4 md:mt-0 h-[400px]">
              <figure className="relative w-full rounded-lg" style={{ aspectRatio: "4 / 3" }}>
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
