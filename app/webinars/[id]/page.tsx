"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// This would typically come from an API or database
const webinarDetails = {
  id: "getting-started-devops",
  title: "Getting Started with DevOps",
  subheading: "A Comprehensive Introduction",
  description: "Learn the fundamentals of DevOps, its principles, and how it transforms software development and operations. This webinar will cover essential concepts, tools, and best practices that every DevOps professional should know.",
  imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  date: "March 25, 2024",
  time: "10:00 AM EST",
  duration: "90 minutes",
  speaker: {
    name: "John Doe",
    role: "Senior DevOps Engineer",
    company: "Tech Solutions Inc.",
    avatar: "https://via.placeholder.com/150",
    bio: "John has over 10 years of experience in DevOps and cloud technologies. He has worked with Fortune 500 companies and helped numerous organizations transform their development and operations practices."
  },
  topics: [
    "Introduction to DevOps principles and practices",
    "Key DevOps tools and technologies",
    "CI/CD pipeline implementation",
    "Infrastructure as Code (IaC)",
    "Containerization and orchestration",
    "Monitoring and logging best practices",
    "Q&A session with the expert"
  ],
  requirements: [
    "Basic understanding of software development",
    "Familiarity with command line interface",
    "Laptop with stable internet connection"
  ],
  benefits: [
    "Comprehensive understanding of DevOps concepts",
    "Hands-on experience with popular tools",
    "Certificate of participation",
    "Access to webinar recording",
    "Networking opportunities"
  ]
};

function TopicCard({ topic }: { topic: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[ghostwhite] rounded-xl border border-gray-100 shadow-sm">
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
      </div>
      <p className="text-gray-700">{topic}</p>
    </div>
  );
}

export default function WebinarDetailsPage() {
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 py-10 px-4 pt-24 md:pt-28 lg:mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Webinar Details (70%) */}
          <div className="lg:w-[70%]">
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="text-3xl lg:text-5xl lg:leading-tight font-medium text-black">
                  <TextGenerateEffect 
                    words={webinarDetails.title}
                    onComplete={() => setShowSubheading(true)}
                  />
                </div>
              </motion.div>

              {showSubheading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-xl lg:text-3xl lg:leading-tight mt-2 font-light text-black">
                    <TextGenerateEffect 
                      words={webinarDetails.subheading}
                      onComplete={() => setShowDescription(true)}
                      duration={0.1}
                    />
                  </div>
                </motion.div>
              )}

              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-base lg:text-lg mt-4 text-gray-600">
                    <TextGenerateEffect 
                      words={webinarDetails.description}
                      onComplete={() => setShowContent(true)}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {showContent && (
              <>
                {/* Webinar Image */}
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={webinarDetails.imageUrl}
                    alt={webinarDetails.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Webinar Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-[ghostwhite] rounded-xl border border-gray-100">
                    <CalendarIcon className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{webinarDetails.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[ghostwhite] rounded-xl border border-gray-100">
                    <ClockIcon className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{webinarDetails.time} ({webinarDetails.duration})</p>
                    </div>
                  </div>
                </div>

                {/* Speaker Info */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">About the Speaker</h3>
                  <div className="flex items-start gap-6 p-6 bg-[ghostwhite] rounded-xl border border-gray-100">
                    <Image
                      src={webinarDetails.speaker.avatar}
                      alt={webinarDetails.speaker.name}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="text-xl font-semibold">{webinarDetails.speaker.name}</h4>
                      <p className="text-gray-600">{webinarDetails.speaker.role} at {webinarDetails.speaker.company}</p>
                      <p className="mt-2 text-gray-700">{webinarDetails.speaker.bio}</p>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">What You&apos;ll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {webinarDetails.topics.map((topic, index) => (
                      <TopicCard key={index} topic={topic} />
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                  <div className="space-y-2">
                    {webinarDetails.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <p className="text-gray-700">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">What You&apos;ll Get</h3>
                  <div className="space-y-2">
                    {webinarDetails.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right side - Registration Form (30%) */}
          <div className="lg:w-[30%]">
            <div className="sticky top-42 bg-gradient-to-b from-transparent via-[#EFF2FF] to-transparent rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Register Now</h3>
                <p className="text-sm text-gray-600">Secure your spot in this exclusive webinar. Limited seats available!</p>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-black border-2 border-black transition-colors duration-200"
                >
                  Proceed to Payment
                </button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 