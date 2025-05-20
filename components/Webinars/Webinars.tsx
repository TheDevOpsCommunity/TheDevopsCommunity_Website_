"use client";

import React, { useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import Link from "next/link";
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { PointerHighlight } from "../ui/pointer-highlight";
import Image from "next/image";

interface WebinarCard {
  title: string;
  subheading: string;
  description: string;
  imageUrl: string;
  date: string;
  time: string;
  speaker: {
    avatar: string;
    name: string;
  };
  isLive: boolean;
}

const webinars: WebinarCard[] = [
  {
    title: "Getting Started with DevOps",
    subheading: "A Comprehensive Introduction",
    description: "Learn the fundamentals of DevOps, its principles, and how it transforms software development and operations.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    date: "March 25, 2024",
    time: "10:00 AM EST",
    speaker: {
      avatar: "https://via.placeholder.com/40",
      name: "John Doe",
    },
    isLive: true
  },
  {
    title: "CI/CD Pipeline Implementation",
    subheading: "Best Practices and Tools",
    description: "Deep dive into setting up efficient CI/CD pipelines using Jenkins, GitHub Actions, and other popular tools.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    date: "April 2, 2024",
    time: "2:00 PM EST",
    speaker: {
      avatar: "https://via.placeholder.com/40",
      name: "Jane Smith",
    },
    isLive: false
  },
  {
    title: "Container Orchestration with Kubernetes",
    subheading: "From Basics to Advanced",
    description: "Master Kubernetes concepts, deployment strategies, and best practices for container orchestration.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    date: "April 10, 2024",
    time: "11:00 AM EST",
    speaker: {
      avatar: "https://via.placeholder.com/40",
      name: "Alice Johnson",
    },
    isLive: true
  }
];

// function getTimeRemaining(dateString: string) {
//   const total = Date.parse(dateString) - Date.now();
//   const seconds = Math.floor((total / 1000) % 60);
//   const minutes = Math.floor((total / 1000 / 60) % 60);
//   const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//   const days = Math.floor(total / (1000 * 60 * 60 * 24));
//   return { total, days, hours, minutes, seconds };
// }

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 18);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 18);
  }

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden rounded-2xl w-full h-full bg-gray-100"
      style={{ perspective: 600 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="object-cover w-full h-full transition-transform duration-300"
        style={{ x, y, scale: 1.05 }}
      />
    </motion.div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, type: "spring", stiffness: 80 },
  }),
};

const WebinarCard = ({ webinar, index }: { webinar: WebinarCard; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 8px 32px rgba(56,189,248,0.15)", 
        borderColor: "#38bdf8",
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      transition={{ type: "spring", stiffness: 120 }}
      className="relative flex flex-col md:flex-row bg-[ghostwhite] rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden"
    >
      {/* Accent bar */}
      <div className="hidden md:block w-2 bg-gradient-to-b from-pink-400 via-fuchsia-400 to-blue-400 rounded-r-2xl" />
      {/* Image */}
      <div className={`md:w-1/2 w-full h-64 md:h-auto relative flex items-center justify-center p-4 md:p-8 ${isEven ? '' : 'order-2 md:order-1'}`}>
        <ParallaxImage src={webinar.imageUrl} alt={webinar.title} />
      </div>
      {/* Content */}
      <div className={`md:w-1/2 flex flex-col justify-center p-8 relative ${isEven ? '' : 'order-2 md:order-1'}`}>
        {/* Badges */}
        <div className="flex gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" /> {webinar.date}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs flex items-center gap-1">
            <ClockIcon className="w-4 h-4" /> {webinar.time}
          </span>
          {webinar.isLive && (
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs flex items-center gap-1 animate-pulse">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="4" />
              </svg>
              LIVE
            </span>
          )}
        </div>
        {/* Title & Subtitle */}
        <h3 className="text-2xl font-bold mb-1">{webinar.title}</h3>
        <p className="text-lg text-neutral-600 mb-2">{webinar.subheading}</p>
        {/* Description */}
        <p className="text-base text-neutral-700 mb-4">{webinar.description}</p>
        {/* Speaker */}
        <div className="flex items-center gap-2 mb-4">
          <Image src={webinar.speaker.avatar} alt={`Avatar of ${webinar.speaker.name}`} width={32} height={32} className="w-8 h-8 rounded-full" />
          <span className="text-sm text-neutral-500">{webinar.speaker.name}</span>
        </div>
        {/* Button */}
        <Link href="/webinars" className="block w-full h-full text-center">
          <button className="mt-2 px-7 py-2 w-auto bg-black text-white rounded-lg hover:bg-white hover:text-black border-2 border-black transition-colors duration-200 font-semibold shadow-sm text-base md:text-lg flex items-center gap-2 relative z-10 pointer-cursor">
            <PointerHighlight 
              pointerClassName="text-red-500" 
              rectangleClassName="border-white rounded-xl"
            >
              <span className="inline-flex items-center gap-2 p-2">
                Register Now <ArrowRightIcon className="w-4 h-4" />
              </span>
            </PointerHighlight>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default function Webinars() {
  return (
    <section id="webinars" className="mt-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-semibold mb-3 text-black tracking-tight leading-tight">Upcoming Webinars</h2>
        <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto font-normal">
          Join our expert-led webinars to learn about the latest trends and best practices in DevOps and cloud technologies.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 gap-8">
        {webinars.map((webinar, index) => (
          <WebinarCard key={webinar.title} webinar={webinar} index={index} />
        ))}
      </div>
    </section>
  );
} 