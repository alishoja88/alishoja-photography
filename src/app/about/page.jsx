"use client";
import { motion } from "framer-motion";
import Profile from "./profile";
import Goals from "./gols";
import Link from "next/link";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay: 0.2 },
  };
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-3 sm:space-y-4 md:space-y-6 mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-white text-xl xs:text-2xl sm:text-3xl md:text-4xl font-medium
            bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
            {...fadeInUp}
          >
            Hi There!
          </motion.h1>
          <motion.p
            className="text-[#73A942] text-lg xs:text-xl sm:text-2xl md:text-3xl font-serif font-bold
            max-w-3xl mx-auto px-4 leading-relaxed"
            {...fadeIn}
          >
            For me, every frame is a gateway to a world that happens only once.
          </motion.p>
        </motion.div>
        <div className="flex flex-col md:flex-row items-start gap-16">
          <motion.div
            className="w-full md:w-auto flex self-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Profile />
          </motion.div>

          <motion.div
            className="w-full md:w-[60%] space-y-6 pt-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-200 mb-6">My story.</h2>

            <div className="space-y-4 text-gray-400">
              <p className="text-lg leading-relaxed">
                When I first got my hands on a digital device that allowed me to
                take photos, I was about 24 years old. At the time, due to my
                work, I had to travel to different cities across Iran.
                Gradually, I started taking pictures and capturing moments.
                Initially, it was just a way to explore my tablet, but soon, I
                realized something deeper—photography made me pause. It made me
                stop and truly look at the world around me: the people, nature,
                and life unfolding in front of me. I became aware of how
                fleeting time is, how quickly everything passes by.
              </p>

              <p className="text-lg leading-relaxed">
                As time went on, I discovered that photography was more than
                just taking pictures; it was a tool that helped me focus on my
                surroundings. That realization led me to buy a smartphone with a
                good camera, and at that time, the iPhone 6s was a great choice.
                From that moment on, capturing street life, people, and nature
                became the most enjoyable thing I had ever done.
              </p>

              <p className="text-lg leading-relaxed">
                Now, I see the world as if it's framed within a lens. Every time
                I look at something, I unconsciously compose it as a picture.
                When I gaze at the moon, I observe it in relation to its
                surroundings. Everything I see naturally fits into a frame in my
                mind.
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Goals />
        </motion.div>

        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 
                     text-lg font-medium tracking-wider text-white bg-gradient-to-r from-[#7209B7] to-[#4CC9F0] 
                     rounded-lg overflow-hidden shadow-lg hover:shadow-xl 
                     transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center">
              Get in Touch
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#4CC9F0] to-[#7209B7]
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </motion.div>

        <motion.p
          className="text-center text-gray-400 mt-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Have a project in mind? Let's discuss it!
        </motion.p>
      </div>
    </div>
  );
};

export default About;