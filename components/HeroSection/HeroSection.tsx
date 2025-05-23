"use client";

import { motion } from "motion/react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
import { Card, CardTitle, CardDescription, CardSkeletonContainer, Skeleton1, Skeleton2, Skeleton3 } from "../ui/cards-demo-3";
import { FeaturesSection } from "../Features/Features";
import Courses from "../Courses/Courses";
import FaqSection from "../FaqSection/FaqSection";
import Link from "next/link";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export function HeroSectionOne() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full flex-1 relative">
      {/* <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      /> */}
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-white"></div> */}

      {/* <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="black"
      /> */}
        <BackgroundGradientAnimation 
          gradientBackgroundStart="rgb(230, 245, 255)"      // Very light blue
          gradientBackgroundEnd="rgb(230, 245, 255)"        // Very light blue
          firstColor="255, 0, 128"                          // Strong pink (#ff0080)
          secondColor="56, 189, 248"                         // Strong pink (#ff0080)
          thirdColor="255, 0, 128"                          // Strong pink (#ff0080)
          fourthColor="56, 189, 248"                         // Strong pink (#ff0080)
          fifthColor="255, 0, 128"                        // Strong pink (#ff0080)
          size="150%"
          blendingValue="hard-light"
          className="absolute inset-0"
          interactive={false}
        >
          <div className="w-full px-4 md:px-6 lg:px-8 py-20 md:py-10 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <TextGenerateEffect
                  words="Master Your DevOps Career."
                  className="relative z-10 mx-auto max-w-4xl text-center text-5xl font-semibold text-black md:text-6xl lg:text-8xl"
                  duration={0.7}
                />
              </div>
              <TextGenerateEffect
                words="Build a Roadmap. Build Your Resume. Build Your Future"
                className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-black/90"
                duration={0.7}
              />
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
                <Link href="/webinars" passHref legacyBehavior>
                  <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-base font-semibold leading-6 text-white inline-block w-64">
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    </span>
                    <div className="relative flex space-x-2 items-center justify-center z-10 rounded-full bg-zinc-950 py-2.5 px-5 ring-1 ring-white/10">
                      <span>Register for Webinar</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M10.75 8.75L14.25 12L10.75 15.25"
                        ></path>
                      </svg>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                  </button>
                </Link>
                <Link href="/#courses" passHref legacyBehavior>
                  <button className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-transparent hover:bg-white/10 hover:cursor-pointer transition duration-200 w-60">
                    View Courses
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
          {/* <Spotlight/> */}
        </BackgroundGradientAnimation>
      </div>

      {/* Transition Section with Cards */}
      <div className="relative w-full -mt-32">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardSkeletonContainer>
                  <Skeleton1 />
                </CardSkeletonContainer>
                <CardTitle>🚀 Master In-Demand DevOps Tools</CardTitle>
                <CardDescription>
                  Get hands-on with Docker, Kubernetes, Jenkins, and more-exactly what top employers require in 2025 and beyond.
                </CardDescription>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardSkeletonContainer>
                  <Skeleton2 />
                </CardSkeletonContainer>
                <CardTitle>⚡ Real Cloud Skills, Not Just Theory</CardTitle>
                <CardDescription>
                  Work directly with AWS and Azure, building and automating real-world cloud environments the way professionals do.
                </CardDescription>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardSkeletonContainer>
                  <Skeleton3 />
                </CardSkeletonContainer>
                <CardTitle>🎯 Career-Focused, Job-Ready Training</CardTitle>
                <CardDescription>
                  Every module is mapped to real DevOps interview questions, resume prep, and the skills recruiters actually test for.
                </CardDescription>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <FeaturesSection />
      </motion.div>

      {/* Courses Secttion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Courses />
      </motion.div>

      {/* Frequently Asked Questions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <FaqSection />
      </motion.div>
    </div>
  );
}

