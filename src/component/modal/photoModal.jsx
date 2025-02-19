"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import CustomImage from "../image/customImage";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const PhotoModal = ({ photos, activeIndex = 0, onClose }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [photos, activeIndex]);

  if (!photos || photos.length === 0 || isLoading) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl z-50 hover:text-gray-300 
                 transition-colors duration-300"
      >
        ✕
      </button>

      <div className="w-[90%] h-[80%] max-w-6xl mx-auto flex items-center justify-center relative">
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          initialSlide={activeIndex}
          className="h-full w-full"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                <CustomImage
                  src={photo.src}
                  alt={photo.alt || `Photo ${index + 1}`}
                  fill
                  priority={index === activeIndex}
                  className="object-contain"
                  sizes="100vw"
                  mode="contain"
                />
                <div className="absolute bottom-4 left-4 p-2.5 bg-black/50 backdrop-blur-sm
                             rounded-lg text-white z-20">
                  <p className="text-sm font-medium">{photo.title}</p>
                  <p className="text-xs text-white/80 mt-0.5">{photo.location}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="h-24 mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          spaceBetween={8}
          slidesPerView="auto"
          className="h-full"
          watchSlidesProgress
        >
          {photos.map((photo, index) => (
            <SwiperSlide
              key={`thumb-${index}`}
              className="!w-24 h-full cursor-pointer opacity-50 hover:opacity-100 
                       transition-opacity duration-300"
            >
              <div className="relative w-full h-full">
                <CustomImage
                  src={photo.src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  priority={index === activeIndex}
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PhotoModal;