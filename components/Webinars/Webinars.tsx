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
    isLive: true,
    id: "getting-started-with-devops"
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
    isLive: false,
    id: "ci-cd-pipeline-implementation"
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
    isLive: true,
    id: "container-orchestration-with-kubernetes"
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
  const featuredWebinar = webinars.find(w => w.isLive) || webinars[0]; // Prioritize live or take the first
  const otherWebinars = webinars.filter(w => w.id !== featuredWebinar.id);

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
            Unlock Your DevOps Potential
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Join our expert-led live webinars. Learn, interact, and grow with the latest in DevOps and cloud technologies.
          </p>
        </motion.div>

        {/* Featured Webinar Section */}
        {featuredWebinar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-200"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Left Side: Image */}
              <div className="w-full lg:w-1/2 h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <ParallaxImage src={featuredWebinar.imageUrl} alt={featuredWebinar.title} />
              </div>
              {/* Right Side: Content */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3 self-start">
                  {featuredWebinar.isLive ? "Happening Now" : "Featured Webinar"}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{featuredWebinar.title}</h3>
                <p className="text-lg text-neutral-700 mb-4">{featuredWebinar.subheading}</p>
                <div className="flex items-center gap-3 text-neutral-600 mb-4 text-sm">
                  <CalendarIcon className="w-5 h-5 text-blue-500" /> 
                  <span>{featuredWebinar.date}</span>
                  <ClockIcon className="w-5 h-5 text-blue-500" /> 
                  <span>{featuredWebinar.time}</span>
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <Image src={featuredWebinar.speaker.avatar} alt={featuredWebinar.speaker.name} width={40} height={40} className="rounded-full border-2 border-blue-200" />
                  <div>
                    <p className="font-semibold text-blue-800">{featuredWebinar.speaker.name}</p>
                    {/* <p className="text-xs text-neutral-500">DevOps Expert</p> */}
                  </div>
                </div>
                <p className="text-neutral-600 mb-6 leading-relaxed text-sm">{featuredWebinar.description}</p>
                <Link href={`/webinars/${featuredWebinar.id}`} className="self-start">
                  <button className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2 text-base">
                    Register Now <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Webinars Section */}
        {otherWebinars.length > 0 && (
          <div className="mb-12 md:mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-8 md:mb-10">
              Explore Other Upcoming Sessions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {otherWebinars.map((webinar, index) => (
                <WebinarCardSmall key={webinar.id} webinar={webinar} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const WebinarCardSmall = ({ webinar, index }: { webinar: WebinarCard; index: number }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants} // You might want to adjust delay for these cards
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="w-full h-48 overflow-hidden">
        <Image src={webinar.imageUrl} alt={webinar.title} width={400} height={200} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-blue-600 mb-2">
          <CalendarIcon className="w-4 h-4" /> <span>{webinar.date}</span>
          <ClockIcon className="w-4 h-4" /> <span>{webinar.time}</span>
        </div>
        <h4 className="text-lg font-semibold text-blue-900 mb-1 leading-tight truncate" title={webinar.title}>{webinar.title}</h4>
        <p className="text-sm text-neutral-600 mb-3 flex-grow truncate" title={webinar.subheading}>{webinar.subheading}</p>
        
        <div className="flex items-center gap-2 mb-3 text-xs text-neutral-500">
            <Image src={webinar.speaker.avatar} alt={webinar.speaker.name} width={24} height={24} className="rounded-full" />
            <span>{webinar.speaker.name}</span>
        </div>

        <Link href={`/webinars/${webinar.id}`} className="mt-auto">
          <button className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1.5">
            View Details <ArrowRightIcon className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}; 