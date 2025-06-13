"use client";

// import { useState } from "react";
import { motion } from "motion/react";
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CalendarIcon } from "@heroicons/react/24/outline";
// import Image from "next/image";
// import RazorpayButton from "@/components/RazorpayButton/RazorpayButton";
import Link from "next/link";

// This would typically come from an API or database
/* const webinarDetails = {
  id: "devops-roadmap-2025",
  title: "DevOps Roadmap Webinar – Build a Career That Scales in 2025",
  subheading: "A 2-hour live masterclass for complete career clarity",
  description: "A comprehensive masterclass designed to give you complete clarity on the DevOps career path, tools, and job strategy — even if you're just starting out. Learn from industry experts and get actionable insights to kickstart or advance your DevOps career.",
  imageUrl: "/image.png",
  date: "May 30, 2025",
  time: "10:00 AM IST",
  duration: "2 hours",
  speaker: {
    name: "DevOps Expert",
    role: "Senior DevOps Engineer",
    company: "DevOps Community",
    avatar: "https://avatar.iran.liara.run/public/6",
    bio: "Experienced DevOps professional with expertise in cloud technologies, automation, and infrastructure management."
  },
  topics: [
    "The 2025 DevOps Roadmap — What to learn, in what order",
    "Key tools explained: Git, Docker, Jenkins, Kubernetes, Terraform, AWS",
    "How to structure real-world DevOps projects that get you noticed",
    "How to write a DevOps resume that clears ATS",
    "The exact way to optimize your LinkedIn profile to attract recruiters",
    "How to showcase skills on GitHub (with examples)",
    "DevOps interview structure and top questions",
    "Emerging trends: AI + Prompt Engineering in DevOps"
  ],
  requirements: [
    "No prior DevOps experience required",
    "Basic computer knowledge",
    "Laptop with stable internet connection",
    "Zoom application installed"
  ],
  benefits: [
    "DevOps Roadmap PDF (with tools, steps, projects)",
    "Resume + LinkedIn Optimization Kit",
    "5 DevOps project ideas with GitHub examples",
    "Private DevOps community invite",
    "Free slot in our upcoming mock interview pool (optional)",
    "Live Q&A with the instructor"
  ],
  price: "₹299",
  format: "Live Zoom Session",
  targetAudience: [
    "Freshers exploring cloud/DevOps careers",
    "Professionals restarting after a break",
    "Testers, Support Engineers & Sysadmins moving to DevOps",
    "Working professionals switching domains",
    "Developers moving into platform, automation, or SRE roles"
  ]
}; */

/* function TopicCard({ topic }: { topic: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[ghostwhite] rounded-xl border border-gray-100 shadow-sm">
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
      </div>
      <p className="text-gray-700">{topic}</p>
    </div>
  );
} */

export default function WebinarDetailsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-10 px-4 pt-24 md:pt-28 lg:mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <CalendarIcon className="w-20 h-20 text-blue-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              No Webinars Currently Scheduled
            </h1>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto mb-8">
              We are working on bringing you valuable webinars on DevOps, cloud technologies, and career development. 
              Check back soon for updates on our upcoming sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <button className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base">
                  Explore Our Courses
                </button>
              </Link>
              <Link href="/contact-us">
                <button className="px-8 py-3 bg-white text-blue-700 border border-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 