"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SiDocker, SiKubernetes, SiJenkins, SiAmazon, SiTerraform } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaFileAlt, FaBriefcase, FaCheckCircle } from "react-icons/fa";

export function CardDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">🚀 Master In-Demand DevOps Tools</h3>
          <p className="mt-2 text-base text-gray-600">
            Get hands-on with Docker, Kubernetes, Jenkins, and more-exactly what top employers require in 2025 and beyond.
          </p>
        </div>
        <Skeleton1 />
      </div>

      <div className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">⚡ Real Cloud Skills, Not Just Theory</h3>
          <p className="mt-2 text-base text-gray-600">
            Work directly with AWS and Azure, building and automating real-world cloud environments the way professionals do.
          </p>
        </div>
        <Skeleton2 />
      </div>

      <div className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">🎯 Career-Focused, Job-Ready Training</h3>
          <p className="mt-2 text-base text-gray-600">
            Every module is mapped to real DevOps interview questions, resume prep, and the skills recruiters actually test for.
          </p>
        </div>
        <Skeleton3 />
      </div>
    </div>
  );
}

export const Skeleton1 = () => {
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-4">
        <Container className="h-20 w-20 circle-1">
          <SiDocker className="h-12 w-12 text-[#2496ED]" />
        </Container>
        <Container className="h-20 w-20 circle-2">
          <SiKubernetes className="h-12 w-12 text-[#326CE5]" />
        </Container>
        <Container className="h-20 w-20 circle-3">
          <SiJenkins className="h-12 w-12 text-[#D33833]" />
        </Container>
      </div>
      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};

export const Skeleton2 = () => {
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-4">
        <Container className="h-20 w-20 circle-1">
          <SiAmazon className="h-12 w-12 text-[#FF9900]" />
        </Container>
        <Container className="h-20 w-20 circle-2">
          <VscAzure className="h-12 w-12 text-[#0078D4]" />
        </Container>
        <Container className="h-20 w-20 circle-3">
          <SiTerraform className="h-12 w-12 text-[#7B42BC]" />
        </Container>
      </div>
      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};

export const Skeleton3 = () => {
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-4">
        <Container className="h-20 w-20 circle-1">
          <FaFileAlt className="h-12 w-12 text-[#4285F4]" />
        </Container>
        <Container className="h-20 w-20 circle-2">
          <FaBriefcase className="h-12 w-12 text-[#2E7D32]" />
        </Container>
        <Container className="h-20 w-20 circle-3">
          <FaCheckCircle className="h-12 w-12 text-[#1976D2]" />
        </Container>
      </div>
      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};

const Sparkles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => {
        const initialTop = `${random() * 100}%`;
        const initialLeft = `${random() * 100}%`;
        
        return (
          <motion.span
            key={`star-${i}`}
            initial={{
              top: initialTop,
              left: initialLeft,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              top: `calc(${random() * 100}% + ${randomMove()}px)`,
              left: `calc(${random() * 100}% + ${randomMove()}px)`,
              opacity: randomOpacity(),
              scale: [1, 1.2, 0],
            }}
            transition={{
              duration: random() * 2 + 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              zIndex: 1,
            }}
            className="inline-block bg-black dark:bg-white"
          />
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative isolate">
      <div
        className={cn(
          "max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,1)] bg-[#F8F8F8]/80 shadow-[0_4px_20px_-4px_rgba(216,180,254,1)] hover:shadow-[0_8px_30px_-4px_rgba(216,180,254,1)] transition-all duration-300 hover:-translate-y-1 group backdrop-blur-3xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-xl font-semibold text-gray-800 py-3",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-base font-normal text-neutral-600 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[20rem] rounded-xl z-40",
        className,
        showGradient &&
          "bg-purple-200 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] group-hover:shadow-[0px_0px_12px_0px_rgba(248,248,248,0.35)_inset,0px_40px_32px_-20px_rgba(0,0,0,0.50)] transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};
