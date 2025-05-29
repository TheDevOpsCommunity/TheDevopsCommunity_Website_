"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import RazorpayButton from "@/components/RazorpayButton/RazorpayButton";

// This would typically come from an API or database
const webinarDetails = {
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

const WebinarInquiryForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          type: 'webinar'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg text-center border border-blue-100">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Thank You!</h3>
        <p className="text-blue-700">We'll get back to you soon about the webinar.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-blue-900">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-blue-900">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm font-medium text-blue-900">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-medium text-blue-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Any questions about the webinar?"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-blue-200 resize-none"
        />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Inquiry'
        )}
      </button>
    </form>
  );
};

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
                <p className="text-sm text-gray-600">Limited seats available at ₹299/-</p>
                <p className="text-sm text-gray-600 mt-2">100% secure Razorpay payment</p>
              </div>
              <RazorpayButton />
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-2">Inquiry</h3>
              <WebinarInquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 