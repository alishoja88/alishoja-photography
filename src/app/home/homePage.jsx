"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomImage from "../../components/ui/image/customImage";
import HomeImage from "../../../image/HomeImage.JPG";
import WelcomeText from "../../components/home/welcomeText";
import SectionCard from "../../components/home/sectionCard";
import ShortStory from "../../components/home/shortStory";
import { image } from "../../../lib/images";
import LookContent from "../../../public/images/people90.JPEG";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="flex flex-col w-full overflow-hidden">
      <article>
        <section className="relative w-full h-screen">
          <div className="relative w-full h-full">
            <div className="absolute inset-0">
              <CustomImage
                src={HomeImage}
                alt="Professional photography portfolio"
                fill
                priority
                sizes="100vw"
                className="object-cover w-full h-full"
                style={{ opacity: 0.7, transform: `translateY(${scrollY * 0.3}px)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0.2 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-1 flex items-center justify-center"
            >
              <WelcomeText />
            </motion.div>
          </div>
        </section>

        <section className="px-2 sm:px-4 mt-8 sm:mt-12 md:mt-16">
          <ShortStory />
        </section>

        {/* Gallery Slider Section */}
        <section className="px-2 sm:px-4 mt-8 sm:mt-12 md:mt-16">
          <SectionCard
            title="Discover the World Through My Lens"
            description="Explore the beauty of everyday life captured in fleeting moments. Click below to visit my full gallery and experience the stories each image tells."
            buttonText="See more Photos"
            buttonHref="/gallery"
            backgroundColor="#565656"
            textColor="text-white"
            images={image}
            imageAlt="Gallery showcase"
            imageFirst={true}
            animationDelay={0}
          />
        </section>

        {/* Street Photography Section */}
        <section className="px-2 sm:px-4 mt-8 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-24">
          <SectionCard
            title="Looking Around Through My Camera"
            description="Discover the art of photography through my lens. Each image tells a unique story, capturing moments that would otherwise pass unnoticed."
            buttonText="See more Photos"
            buttonHref="/gallery"
            backgroundColor="#4CC9F0"
            textColor="text-black"
            singleImage={LookContent}
            imageAlt="Street photography showcasing unique perspectives and moments captured through the lens"
            imageFirst={true}
            animationDelay={200}
          />
        </section>
      </article>
    </main>
  );
};

export default HomePage;
