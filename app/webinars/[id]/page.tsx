"use client";

import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { CalendarIcon, ClockIcon, UserIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import RazorpayButton from "@/components/RazorpayButton/AWS_Course_RazorpayButton";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useState } from "react";

function DetailCard({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="relative border-2 border-blue-200 rounded-3xl p-2 bg-transparent overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-white border border-blue-100 rounded-2xl p-4 md:p-6 flex flex-col gap-4 shadow-lg">
        {/* Lamp-like gradient accent at top left */}
        <div className="absolute top-0 left-8 h-0.5 w-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full z-20" />
        <div className="absolute top-[-8px] left-6 w-24 h-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-30 blur-2xl rounded-full z-10" />
        <div className="text-lg md:text-xl font-bold text-blue-800 mb-2">{heading}</div>
        <ul className="list-disc pl-6 text-blue-900 space-y-1 md:space-y-2">
          {items.map((item, j) => (
            <li key={j} className="text-sm md:text-base leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3 hover:bg-blue-100 transition-colors">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div>
        <div className="text-xs md:text-sm text-blue-600 font-medium">{title}</div>
        <div className="text-sm md:text-base font-semibold text-blue-900">{value}</div>
      </div>
    </div>
  );
}

export default function WebinarDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const [showSubheading, setShowSubheading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Webinar data for both current and past webinars
  const webinars = {
    "linux-for-devops-5day-demo": {
      title: "Linux for DevOps – 5-Day Live Demo",
      isLive: true,
      date: "July 21st-25th, 2025",
      time: "9:30 AM - 10:30 AM IST (Daily)",
      duration: "5 days, 1 hour each day",
      fee: "₹499",
      mode: "Live Zoom Sessions",
      subheading: "Master Linux for DevOps roles in 5 days",
      speaker: {
        name: "DevOps Expert",
      },
      description: `Master Linux from scratch for DevOps roles. Hands-on, live Zoom sessions over 5 days. Only ₹499 for complete training!`,
      details: [
        {
          heading: "🔥 Why Attend This 5-Day Demo?",
          items: [
            "Master Linux from Scratch – Tailored for DevOps roles",
            "Hands-on Practice – Real-time terminal usage over 5 days",
            "Essential Commands – Files, permissions, processes, networking",
            "Shell Scripting Basics – Automate tasks",
            "Practical for DevOps Projects – Not just theory",
            "Progressive learning – Build skills day by day",
          ],
        },
        {
          heading: "👥 Who Should Join?",
          items: [
            "Beginners with zero tech background",
            "Career switchers from non-IT fields",
            "Freshers or students looking to upskill",
            "Anyone interested in DevOps, Cloud, or Linux Admin",
          ],
        },
        {
          heading: "🎁 Bonus Session Included!",
          items: [
            "Free DevOps Roadmap: Learn the exact tools & skills needed to become a DevOps engineer",
            "Step-by-step roadmap from beginner to expert",
            "Toolstack breakdown (Linux → Git → Docker → Kubernetes → AWS → CI/CD)",
            "Live Q&A Session: Get personalized career suggestions, ask anything about DevOps jobs, interviews, certifications, and more!",
          ],
        },
        {
          heading: "💰 What You Get for ₹499",
          items: [
            "5-Day Live Linux Training (1 hour daily)",
            "Free DevOps Career Roadmap",
            "Personalized Career Q&A",
            "Recordings Access for all sessions",
            "Certificate of Participation",
          ],
        },
      ],
      registrationUrl: "https://rzp.io/rzp/wLPwpbVF",
      registrationText: "Pay ₹499 & Register Now",
      isCompleted: false,
      headingWords: "Linux for DevOps",
      subheadingWords: "5-Day Live Demo",
      descriptionWords: "Master Linux from scratch for DevOps roles. This comprehensive 5-day live webinar series covers everything from basic commands to advanced shell scripting for DevOps automation, with 1 hour of hands-on learning each day.",
    },
    // Redirect old single-day ID to new 5-day one for backward compatibility
    "linux-for-devops-demo": {
      title: "Linux for DevOps – 5-Day Live Demo",
      isLive: true,
      date: "July 21st-25th, 2025",
      time: "9:30 AM - 10:30 AM IST (Daily)",
      duration: "5 days, 1 hour each day",
      fee: "₹499",
      mode: "Live Zoom Sessions",
      subheading: "Master Linux for DevOps roles in 5 days",
      speaker: {
        name: "DevOps Expert",
      },
      description: `Master Linux from scratch for DevOps roles. Hands-on, live Zoom sessions over 5 days. Only ₹499 for complete training!`,
      details: [
        {
          heading: "🔥 Why Attend This 5-Day Demo?",
          items: [
            "Master Linux from Scratch – Tailored for DevOps roles",
            "Hands-on Practice – Real-time terminal usage over 5 days",
            "Essential Commands – Files, permissions, processes, networking",
            "Shell Scripting Basics – Automate tasks",
            "Practical for DevOps Projects – Not just theory",
            "Progressive learning – Build skills day by day",
          ],
        },
        {
          heading: "👥 Who Should Join?",
          items: [
            "Beginners with zero tech background",
            "Career switchers from non-IT fields",
            "Freshers or students looking to upskill",
            "Anyone interested in DevOps, Cloud, or Linux Admin",
          ],
        },
        {
          heading: "🎁 Bonus Session Included!",
          items: [
            "Free DevOps Roadmap: Learn the exact tools & skills needed to become a DevOps engineer",
            "Step-by-step roadmap from beginner to expert",
            "Toolstack breakdown (Linux → Git → Docker → Kubernetes → AWS → CI/CD)",
            "Live Q&A Session: Get personalized career suggestions, ask anything about DevOps jobs, interviews, certifications, and more!",
          ],
        },
        {
          heading: "💰 What You Get for ₹499",
          items: [
            "5-Day Live Linux Training (1 hour daily)",
            "Free DevOps Career Roadmap",
            "Personalized Career Q&A",
            "Recordings Access for all sessions",
            "Certificate of Participation",
          ],
        },
      ],
      registrationUrl: "https://rzp.io/rzp/wLPwpbVF",
      registrationText: "Pay ₹499 & Register Now",
      isCompleted: false,
      headingWords: "Linux for DevOps",
      subheadingWords: "5-Day Live Demo",
      descriptionWords: "Master Linux from scratch for DevOps roles. This comprehensive 5-day live webinar series covers everything from basic commands to advanced shell scripting for DevOps automation, with 1 hour of hands-on learning each day.",
    },
    "devops-roadmap-2025": {
      title: "DevOps Roadmap Webinar – Build a Career That Scales in 2025",
      isLive: false,
      date: "May 30, 2025",
      time: "10:00 AM IST",
      duration: "2 hours",
      fee: "Free",
      mode: "Live Zoom Session",
      subheading: "A 2-hour live masterclass for complete career clarity",
      speaker: {
        name: "DevOps Expert",
      },
      description: `A comprehensive masterclass designed to give you complete clarity on the DevOps career path, tools, and job strategy — even if you're just starting out.`,
      details: [
        {
          heading: "🎯 Key Takeaways",
          items: [
            "The 2025 DevOps Roadmap — What to learn, in what order",
            "Key tools explained: Git, Docker, Jenkins, Kubernetes, Terraform, AWS",
            "How to structure real-world DevOps projects that get you noticed",
            "How to write a DevOps resume that clears ATS",
            "The exact way to optimize your LinkedIn profile to attract recruiters",
            "How to showcase skills on GitHub (with examples)",
            "DevOps interview structure and top questions",
            "Emerging trends: AI + Prompt Engineering in DevOps",
          ],
        },
        {
          heading: "👤 Who Was This For?",
          items: [
            "Freshers exploring cloud/DevOps careers",
            "Professionals restarting after a break",
            "Testers, Support Engineers & Sysadmins moving to DevOps",
            "Working professionals switching domains",
            "Developers moving into platform, automation, or SRE roles",
          ],
        },
      ],
      isCompleted: true,
      registrationUrl: "",
      registrationText: "Registration Closed",
      headingWords: "DevOps Roadmap",
      subheadingWords: "Career masterclass",
      descriptionWords: "A comprehensive 2-hour masterclass designed to give you complete clarity on the DevOps career path, tools, and job strategy for building a career that scales in 2025.",
    },
  };

  const webinar = webinars[id as keyof typeof webinars];

  if (!webinar) {
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
                Webinar Not Found
              </h1>
              <p className="text-xl text-neutral-700 max-w-2xl mx-auto mb-8">
                Sorry, we couldn&apos;t find the webinar you&apos;re looking for.
              </p>
              <Link href="/webinars">
                <button className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base">
                  Back to Webinars
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-neutral-800 py-10 px-4 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Left side - Main Content */}
          <div className="lg:w-[65%]">
            {/* Header Section */}
            <div className="mb-8 md:mb-12 p-4 md:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CalendarIcon className="text-blue-500 w-10 h-10 md:w-12 md:h-12" />
                </motion.div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1">
                  <div className="text-2xl md:text-3xl lg:text-5xl lg:leading-tight font-bold text-blue-900">
                    <TextGenerateEffect 
                      words={webinar.headingWords} 
                      onComplete={() => setShowSubheading(true)}
                    />
                  </div>
                  {webinar.isCompleted ? (
                    <span className="inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs md:text-sm font-semibold w-fit">Completed</span>
                  ) : (
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs md:text-sm font-semibold w-fit">Upcoming</span>
                  )}
                </div>
              </motion.div>
              
              {showSubheading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg md:text-xl lg:text-2xl lg:leading-tight mt-2 font-medium text-blue-700 pl-1"
                >
                  <TextGenerateEffect 
                    words={webinar.subheadingWords} 
                    onComplete={() => setShowDescription(true)}
                  />
                </motion.div>
              )}

              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm md:text-base lg:text-lg lg:leading-relaxed mt-3 text-neutral-600 pl-1"
                >
                  <TextGenerateEffect 
                    words={webinar.descriptionWords} 
                    onComplete={() => setShowContent(true)}
                  />
                </motion.div>
              )}
            </div>

            {/* Webinar Info Cards */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 md:mb-10 p-4 md:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100"
              >
                <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-4">Webinar Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <InfoCard 
                    icon={<CalendarIcon className="w-5 h-5" />}
                    title="Date"
                    value={webinar.date}
                  />
                  <InfoCard 
                    icon={<ClockIcon className="w-5 h-5" />}
                    title="Time & Duration"
                    value={`${webinar.time} (${webinar.duration})`}
                  />
                  <InfoCard 
                    icon={<UserIcon className="w-5 h-5" />}
                    title="Speaker"
                    value={webinar.speaker.name}
                  />
                  <InfoCard 
                    icon={<CurrencyRupeeIcon className="w-5 h-5" />}
                    title="Registration Fee"
                    value={webinar.fee}
                  />
                </div>
                <div className="mt-4">
                  <InfoCard 
                    icon={<CalendarIcon className="w-5 h-5" />}
                    title="Mode"
                    value={webinar.mode}
                  />
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm md:text-base text-blue-900 font-medium text-center">{webinar.description}</p>
                </div>
              </motion.div>
            )}

            {/* Content Sections */}
            {showContent && webinar.details.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, type: "spring", stiffness: 90 }}
                viewport={{ once: true, amount: 0.2 }}
                className="mb-6 md:mb-8"
              >
                <DetailCard heading={section.heading} items={section.items} />
              </motion.div>
            ))}

            {/* Completion Message for Past Webinars */}
            {showContent && webinar.isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-8 md:mb-10 p-4 md:p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100"
              >
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 md:p-6 text-gray-600 text-base md:text-lg font-semibold text-center">
                  This webinar has been completed. <br />
                  <span className="text-sm md:text-base font-normal">Recording or summary will be available soon.</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right side - Sticky Registration */}
          <div className="lg:w-[35%]">
            <div className="sticky top-28 bg-white/80 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl border border-blue-200">
              <div className="mb-4 md:mb-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-blue-900">
                  {webinar.isCompleted ? "Webinar Completed" : "Join This Webinar!"}
                </h3>
                {!webinar.isCompleted && (
                  <p className="text-xs md:text-sm text-neutral-600 mb-2 md:mb-4">
                    Secure your spot in this exclusive live session
                  </p>
                )}
              </div>
              
              {webinar.isCompleted ? (
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 md:p-6 text-gray-600 text-center">
                  <div className="text-base md:text-lg font-semibold mb-2">Registration Closed</div>
                  <p className="text-xs md:text-sm">This webinar has ended. Check back for future sessions!</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-3 md:mb-4">
                    <div className="w-full [&>div]:w-full [&>div]:h-16 md:[&>div]:h-20">
                      <RazorpayButton
                        url={webinar.registrationUrl}
                        text={webinar.registrationText}
                        color="#2563eb"
                        size="large"
                        className="w-full h-16 md:h-20"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 text-center leading-relaxed">
                    After payment, you will receive a confirmation email, joining link, schedule, and free DevOps career PDF.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 