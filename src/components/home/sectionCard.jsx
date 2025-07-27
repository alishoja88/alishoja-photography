"use client";

import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomImage from "@/components/ui/image/customImage";
import Button from "@/components/ui/button/button";

const SectionCard = ({
  // Content props
  title,
  description,
  buttonText = "See more Photos",
  buttonHref = "/gallery",
  
  // Style props
  backgroundColor = "#565656",
  textColor = "text-white",
  buttonBgColor = "bg-[#7209B7]",
  buttonHoverColor = "hover:bg-[#B5179E]",
  
  // Image props
  images = [], // Array of images for slider
  singleImage = null, // Single image object
  imageAlt = "Gallery image",
  
  // Layout props
  imageFirst = true, // true = image first on mobile, false = text first
  threshold = 0.3,
  
  // Animation props
  animationDelay = 0,
  animationDuration = 600,
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)" : "translate3d(0,30px,0)",
    config: { tension: 170, friction: 26 },
    delay: animationDelay,
  });

  // Determine if we're using slider or single image
  const isSlider = images.length > 0;
  const imageToShow = singleImage || (images.length > 0 ? images[0] : null);

  const renderImage = () => {
    if (isSlider) {
      return (
        <div className="rounded-lg overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ type: "fraction" }}
            className="w-full h-full"
            aria-label="Photo gallery slider"
          >
            {images.map((img, index) => (
              <SwiperSlide key={`gallery-image-${index}`}>
                <figure className="relative w-full h-full">
                  <CustomImage
                    src={img.src}
                    alt={img.alt || `${imageAlt} ${index + 1}`}
                    fill
                    className="object-cover"
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
    } else if (imageToShow) {
      return (
        <figure className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
          <CustomImage
            src={imageToShow.src || imageToShow}
            alt={imageToShow.alt || imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </figure>
      );
    }
    return null;
  };

  const imageOrder = imageFirst ? "order-1 md:order-2" : "order-2 md:order-1";
  const textOrder = imageFirst ? "order-2 md:order-1" : "order-1 md:order-2";

  return (
    <animated.article ref={ref} style={fadeIn} className="px-2 sm:px-4 mb-6 sm:mb-8">
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor }}>
        <div className="p-3 sm:p-6 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
            {/* Image Section */}
            <div className={`relative w-full ${imageOrder}`}>
              {renderImage()}
            </div>

            {/* Text Content Section */}
            <div className={`space-y-4 sm:space-y-6 text-center md:text-start px-2 sm:px-0 ${textOrder}`}>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight ${textColor}`}>
                {title}
              </h2>
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0 ${textColor}/80`}>
                {description}
              </p>
              {buttonText && buttonHref && (
                <div className="flex justify-center md:justify-start pt-2">
                  <Button
                    href={buttonHref}
                    width="auto"
                    className={`text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4
                      justify-center gap-2 text-white rounded-lg 
                      transition-all duration-300 font-semibold shadow-lg hover:shadow-xl
                      ${buttonBgColor} ${buttonHoverColor}`}
                  >
                    {buttonText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </animated.article>
  );
};

export default SectionCard; 