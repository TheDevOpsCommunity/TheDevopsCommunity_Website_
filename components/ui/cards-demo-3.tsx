"use client";
import { animate, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SiDocker, SiKubernetes, SiJenkins, SiGithub, SiTerraform } from "react-icons/si";

export function CardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardSkeletonContainer>
          <Skeleton1 />
        </CardSkeletonContainer>
        <CardTitle>Container Orchestration</CardTitle>
        <CardDescription>
          Tools for managing and orchestrating containerized applications.
        </CardDescription>
      </Card>

      <Card>
        <CardSkeletonContainer>
          <Skeleton2 />
        </CardSkeletonContainer>
        <CardTitle>CI/CD Pipeline</CardTitle>
        <CardDescription>
          Continuous integration and deployment tools for automated workflows.
        </CardDescription>
      </Card>

      <Card>
        <CardSkeletonContainer>
          <Skeleton3 />
        </CardSkeletonContainer>
        <CardTitle>Infrastructure as Code</CardTitle>
        <CardDescription>
          Tools for managing infrastructure through code and automation.
        </CardDescription>
      </Card>
    </div>
  );
}

export const Skeleton1 = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    animate(sequence, {
      // @ts-ignore
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-4">
        <Container className="h-16 w-16 circle-1">
          <SiDocker className="h-10 w-10 text-[#2496ED]" />
        </Container>
        <Container className="h-16 w-16 circle-2">
          <SiKubernetes className="h-10 w-10 text-[#326CE5]" />
        </Container>
        <Container className="h-16 w-16 circle-3">
          <SiTerraform className="h-10 w-10 text-[#7B42BC]" />
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
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    animate(sequence, {
      // @ts-ignore
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-4">
        <Container className="h-16 w-16 circle-1">
          <SiGithub className="h-10 w-10 text-[#181717]" />
        </Container>
        <Container className="h-16 w-16 circle-2">
          <SiJenkins className="h-10 w-10 text-[#D24939]" />
        </Container>
        <Container className="h-16 w-16 circle-3">
          <SiDocker className="h-10 w-10 text-[#2496ED]" />
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
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    animate(sequence, {
      // @ts-ignore
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-4">
        <Container className="h-16 w-16 circle-1">
          <SiTerraform className="h-10 w-10 text-[#7B42BC]" />
        </Container>
        <Container className="h-16 w-16 circle-2">
          <SiKubernetes className="h-10 w-10 text-[#326CE5]" />
        </Container>
        <Container className="h-16 w-16 circle-3">
          <SiGithub className="h-10 w-10 text-[#181717]" />
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
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] bg-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 group",
        className
      )}
    >
      {children}
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
          "bg-neutral-300 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
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
