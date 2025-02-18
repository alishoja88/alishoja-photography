"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomImage from "../../component/image/customImage";
import HomeImage from "../../../image/HomeImage.JPG";
import WelcomeText from "./welcomeText";
import ContentImage from "./contentImage";
import LookingAround from "./lookingAround";
import ShortStory from "./shortStory";

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

        <section className="px-4 mt-14">
          <ShortStory />
        </section>

        <section className="px-4 mt-14">
        <ContentImage />
        </section>

        <section className="px-4 mt-14 mb-14">
        <LookingAround />
        </section>
      </article>
    </main>
  );
};

export default HomePage;
