"use client";

import { motion } from "motion/react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";

export function HeroSectionOne() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full flex-1 relative">
        <BackgroundGradientAnimation 
          gradientBackgroundStart="rgb(0, 0, 0)"
          gradientBackgroundEnd="rgb(0, 0, 0)"
          firstColor="237, 0, 213"
          secondColor="255, 0, 61"
          thirdColor="111, 0, 221"
          fourthColor="237, 0, 213"
          fifthColor="255, 0, 61"
          pointerColor="111, 0, 221"
          size="50%"
          blendingValue="soft-light"
          className="absolute inset-0"
        >
          <div className="w-full px-4 md:px-6 lg:px-8 py-20 md:py-10 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-white md:text-4xl lg:text-7xl">
                {"Master Your DevOps Career."
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeInOut",
                      }}
                      className="mr-2 inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
              </h1>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.8,
                }}
                className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-white/90"
              >
                Build a Roadmap. Build Your Resume. Build Your Future
              </motion.p>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: 1,
                }}
                className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <button className="w-60 transform rounded-lg bg-[#ED00D5] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ED00D5]/90">
                  Register for Webinar
                </button>
                <button className="w-60 transform rounded-lg border border-white/20 bg-white/10 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20">
                  View Courses
                </button>
              </motion.div>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </div>
    </div>
  );
}

