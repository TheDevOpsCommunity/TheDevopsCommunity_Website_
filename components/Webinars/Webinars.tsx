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
  id: string;
}

const webinars: WebinarCard[] = [
  {
    title: "DevOps Roadmap Webinar – Build a Career That Scales in 2025",
    subheading: "A 2-hour live masterclass for complete career clarity",
    description: "A comprehensive masterclass designed to give you complete clarity on the DevOps career path, tools, and job strategy — even if you're just starting out.",
    imageUrl: "/image.png",
    date: "May 30, 2025",
    time: "10:00 AM IST",
    speaker: {
      avatar: "https://avatar.iran.liara.run/public/6",
      name: "DevOps Expert",
    },
    isLive: true,
    id: "devops-roadmap-2025"
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
      className="relative flex flex-col bg-white rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden"
    >
      <div className="hidden md:block w-2 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-2xl" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-1 text-blue-900">{webinar.title}</h3>
        <p className="text-lg text-neutral-600 mb-2">{webinar.subheading}</p>
        <p className="text-base text-neutral-700 mb-4">{webinar.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <Image src={webinar.speaker.avatar} alt={`Avatar of ${webinar.speaker.name}`} width={32} height={32} className="w-8 h-8 rounded-full" />
          <span className="text-sm text-neutral-500">{webinar.speaker.name}</span>
        </div>
        <Link href={`/webinars/${webinar.id}`} className="block w-full h-full text-center">
          <button className="mt-2 px-7 py-2 w-auto bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold shadow-sm text-base md:text-lg flex items-center gap-2 relative z-10 pointer-cursor">
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
    <section id="webinars" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 tracking-tight">
            Webinars Coming Soon
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            We are currently preparing exciting webinars to help you master DevOps and cloud technologies. Stay tuned for updates!
          </p>
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 80 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 bg-white p-8 rounded-3xl shadow-xl border border-blue-200 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <CalendarIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">No Webinars Currently Scheduled</h3>
            <p className="text-lg text-neutral-700 mb-6">
              We are working on bringing you valuable webinars on DevOps, cloud technologies, and career development. 
              Check back soon for updates on our upcoming sessions.
            </p>
            <Link href="/courses">
              <button className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base">
                Explore Our Courses
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 