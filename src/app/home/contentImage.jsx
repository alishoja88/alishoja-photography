"use client";

import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomImage from "@/component/image/customImage";
import Button from "@/component/button/button";
import { image } from "../../../lib/images";

const ContentImage = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0,0,0)' : 'translate3d(0,30px,0)',
    config: { tension: 170, friction: 26 },
  });

  return (
    <animated.article ref={ref} style={fadeIn} className="px-4 mb-6">
      <div className="bg-[#565656] rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:text-start text-center">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white">
                Discover the World Through My Lens
              </h2>
              <p className="text-base sm:text-lg md:text-lg text-white/80 max-w-md">
                Explore the beauty of everyday life captured in fleeting moments.
                Click below to visit my full gallery and experience the stories each image tells.
              </p>
              <div className="flex md:justify-start justify-center">
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
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ type: "fraction" }}
                className="rounded-lg w-full h-full"
                style={{ aspectRatio: "4 / 3" }}
                aria-label="Photo gallery slider"
              >
                {image.map((img, index) => (
                  <SwiperSlide key={`gallery-image-${index}`}>
                    <figure className="relative w-full h-full" style={{ aspectRatio: "4 / 3" }}>
                      <CustomImage
                        src={img.src}
                        alt={`Gallery image ${index + 1}: ${img.alt}`}
                        fill
                        className="rounded-lg object-cover"
                        loading={index < 2 ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </figure>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </animated.article>
  );
};

export default ContentImage;
