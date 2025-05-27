"use client";

import { motion } from "motion/react";
// import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
// import { Card, CardTitle, CardDescription, CardSkeletonContainer, Skeleton1, Skeleton2, Skeleton3 } from "../ui/cards-demo-3";
// import { FeaturesSection } from "../Features/Features";
// import Courses from "../Courses/Courses";
// import FaqSection from "../FaqSection/FaqSection";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
// import AnimatedTestimonialsDemo from "@/components/animated-testimonials-demo";
import React, { useEffect, useState } from "react";
import { SiCognizant, SiInfosys, SiZoho, SiTcs } from "react-icons/si";
import { Briefcase } from "lucide-react";
import Image from "next/image";

function FAQAccordion() {
  const faqs = [
    {
      question: "What is this platform about?",
      answer: "This platform helps you master DevOps and Cloud skills with hands-on, project-based learning, live webinars, and expert mentorship.",
    },
    {
      question: "Are the courses beginner friendly?",
      answer: "Yes! Our courses start from the basics and progress to advanced topics, suitable for both beginners and experienced professionals.",
    },
    {
      question: "Do you offer live classes or only recorded content?",
      answer: "We offer both live webinars and recorded modules so you can learn at your own pace and interact with instructors in real time.",
    },
    {
      question: "Is there a community for doubt support?",
      answer: "Absolutely! You get access to a peer community, expert engineers, and regular mock interviews for doubt resolution and career guidance.",
    },
    {
      question: "What is the refund policy?",
      answer: "Purchases are processed via Whop, which has its own refund policy. Please review their terms before enrolling.",
    },
  ];
  const [openIndex, setOpenIndex] = useState<number>(0);
  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg divide-y divide-blue-100 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => (
        <div key={idx} className="bg-blue-50 min-w-0 overflow-hidden">
          <button
            className="w-full text-left px-8 py-6 focus:outline-none flex justify-between items-center text-base font-medium text-blue-900"
            onClick={() => {
              if (idx === 0) return; // First FAQ always open
              setOpenIndex(openIndex === idx ? 0 : idx);
            }}
            aria-expanded={openIndex === idx || idx === 0}
            aria-controls={`faq-answer-${idx}`}
          >
            <span>{faq.question}</span>
            <span className="text-2xl text-blue-400">{openIndex === idx || idx === 0 ? "×" : "+"}</span>
          </button>
          {(openIndex === idx || idx === 0) && (
            <div
              key={"faq-answer-" + idx}
              id={`faq-answer-${idx}`}
              className="overflow-hidden px-8 pb-6 text-blue-800 text-base min-w-0"
              style={{ wordBreak: 'break-word' }}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function InquiryModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="w-full bg-blue-700 text-white rounded-full py-3 font-medium text-base mt-2 hover:bg-blue-800 transition"
        onClick={() => setOpen(true)}
      >
        Contact Us
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-6 z-10 flex flex-col">
            <button
              className="absolute top-3 right-3 text-blue-700 text-2xl font-bold hover:text-blue-900"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-2 text-blue-900 text-center">Inquiry Form</h3>
            {/* <p className="mb-4 text-base text-blue-700 text-center">Fill out the form and our team will get back to you soon.</p> */}
            <InquiryForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function InquiryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };
  if (submitted) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2 text-blue-900">Thank you!</h2>
        <p className="text-blue-700">Your inquiry has been submitted. We&apos;ll get back to you soon.</p>
      </div>
    );
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-blue-900 mb-1">Name</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="Your Name" />
        </div>
        <div className="flex-1">
          <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="you@email.com" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-blue-900 mb-1">Message</label>
        <textarea id="message" name="message" required value={form.message} onChange={handleChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-h-[80px]" placeholder="How can we help you?" />
      </div>
      <button type="submit" className="w-full mt-4 px-4 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">
        Submit Inquiry
      </button>
    </form>
  );
}

export function HeroSectionOne() {
  const [animatedHeading, setAnimatedHeading] = useState("");
  const fullHeading = "Master DevOps with Experts Who've Done It for 10+ Years";
  const typingSpeed = 50; // milliseconds per character

  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  useEffect(() => {
    if (animatedHeading.length < fullHeading.length) {
      const timer = setTimeout(() => {
        setAnimatedHeading(fullHeading.substring(0, animatedHeading.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [animatedHeading, fullHeading, typingSpeed]);

  useEffect(() => {
    // Hide welcome message after a delay
    const welcomeTimer = setTimeout(() => {
      setIsWelcomeVisible(false);
    }, 1000); // Welcome message displayed for 2 seconds before fading out
    return () => clearTimeout(welcomeTimer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Welcome Message Overlay - Fades in from white, then fades out */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isWelcomeVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: isWelcomeVisible ? 'auto' : 'none' }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isWelcomeVisible ? 1 : 0, y: isWelcomeVisible ? 0 : 10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-blue-800 tracking-tight"
        >
          Welcome to DevOps Community
        </motion.h1>
      </motion.div>

      {/* Main Hero Section Content - Fades in after welcome message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isWelcomeVisible ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 text-black"
      >
        {/* Hero Section - Two Column Layout */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-4 md:px-8 gap-12 mt-16">
          {/* Left Side: Text */}
          <div className="flex-1 flex flex-col items-start justify-center gap-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black min-h-[100px] md:min-h-[144px]">
              {animatedHeading}
              <span className={`ml-1 inline-block animate-blink ${animatedHeading.length === fullHeading.length ? 'hidden' : ''}`}>|</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-blue-700">
              AWS DevOps, Azure DevOps, and Real-World Projects
            </h2>
            <p className="text-base md:text-lg text-neutral-700 max-w-xl">
              Taught by engineers with 10+ years of hands-on experience from top tech companies.
            </p>
            {/* Badges/Highlights */}
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">2000+ Learners</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">Project-Based Learning</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">4+ Trainers</span>
            </div>
            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <Link href="/webinars" passHref legacyBehavior>
                <button className="bg-blue-700 hover:bg-blue-800 transition-colors text-white font-semibold px-6 py-3 rounded-full shadow-lg text-base">
                  Join Free Webinar
                </button>
              </Link>
              <Link href="/courses" passHref legacyBehavior>
                <button className="bg-white text-blue-700 border border-blue-700 hover:bg-blue-50 transition-colors font-semibold px-6 py-3 rounded-full shadow text-base">
                  Browse Courses
                </button>
              </Link>
            </div>
          </div>
          {/* Right Side: Visual/Testimonial Slider */}
          <div className="flex-1 flex items-center justify-center w-full max-w-md">
            {/* Placeholder for UI mockup or testimonial slider */}
            <div className="w-full h-[340px] bg-blue-50 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden border border-blue-100">
              {/* Placeholder image or UI mockup */}
              <div className="w-4/5 h-4/5 bg-gradient-to-br from-blue-100/60 to-blue-200/60 rounded-2xl flex flex-col items-center justify-center border-2 border-blue-200">
                <span className="text-blue-700 text-lg font-semibold">Course UI Mockup</span>
                <span className="text-blue-500 text-xs mt-2">(Replace with real screenshot)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Webinar Section */}
        <section className="w-full bg-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-700">
              Upcoming Webinar
            </h2>
            <WebinarCountdownCTA />
          </div>
          <div className="max-w-5xl mx-auto px-4 mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-700">
              Featured Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AWS DevOps Course */}
              <div className="bg-white rounded-xl p-6 border-2 border-blue-100 flex flex-col gap-4 shadow">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 relative">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                      alt="AWS Logo"
                      width={100}
                      height={50}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black">AWS DevOps Certification Course</h3>
                    <p className="text-neutral-600">Master DevOps fundamentals and cloud automation on AWS.</p>
                  </div>
                </div>
                <ul className="text-sm text-neutral-700 mb-2 pl-2 list-disc">
                  <li>Linux, Git, Jenkins, Docker, Kubernetes</li>
                  <li>AWS EC2, S3, IAM, CodePipeline, Terraform</li>
                  <li>CI/CD Implementation, Infrastructure as Code</li>
                </ul>
                <Link href="/courses/aws-devops" passHref legacyBehavior>
                  <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-base">
                    View Details
                  </button>
                </Link>
              </div>
              {/* Azure DevOps Course */}
              <div className="bg-white rounded-xl p-6 border-2 border-blue-100 flex flex-col gap-4 shadow">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 relative">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
                      alt="Azure Logo"
                      width={100}
                      height={50}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black">Azure DevOps with Azure Admin</h3>
                    <p className="text-neutral-600">Build expertise in Azure cloud, networking, and DevOps pipelines.</p>
                  </div>
                </div>
                <ul className="text-sm text-neutral-700 mb-2 pl-2 list-disc">
                  <li>VNet, Storage, VMs, SQL, App Services</li>
                  <li>Azure DevOps Pipelines, ARM Templates, Terraform</li>
                  <li>Monitoring, Security, Real-world Projects</li>
                </ul>
                <Link href="/courses/azure-devops" passHref legacyBehavior>
                  <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-base">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By / Featured In Section */}
        <section className="w-full bg-white border-y border-blue-100 py-10">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-center text-xl font-semibold text-neutral-500 mb-6 tracking-wide uppercase">Trusted by learners working at</h3>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {/* TCS */}
              <SiTcs className="h-20 w-auto grayscale opacity-80 hover:opacity-100 transition" title="TCS" />
              {/* Cognizant */}
              <SiCognizant className="h-20 w-auto grayscale opacity-80 hover:opacity-100 transition" title="Cognizant" />
              {/* Capgemini (no SiCapgemini, use briefcase icon as placeholder) */}
              <Briefcase className="h-20 w-auto grayscale opacity-80 hover:opacity-100 transition" aria-label="Capgemini" />
              {/* Infosys */}
              <SiInfosys className="h-20 w-auto grayscale opacity-80 hover:opacity-100 transition" title="Infosys" />
              {/* Zoho */}
              <SiZoho className="h-20 w-auto grayscale opacity-80 hover:opacity-100 transition" title="Zoho" />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full bg-blue-50 py-20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900">
              DevOps That Gets You Hired
            </h2>
            <ul className="space-y-4 mb-12 max-w-2xl mx-auto">
              {[
                "Real-world project-based learning",
                "Resume and LinkedIn optimization",
                "Doubt support from expert engineers",
                "Peer community + Mock interview help",
                "Lifetime access to training materials",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg text-blue-900">
                  <CheckCircle2 className="text-blue-500 w-6 h-6" />
                  {item}
                </li>
              ))}
            </ul>
            {/* Student Reviews / Career Success */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Review 1 */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 shadow flex flex-col gap-3">
                <div className="text-yellow-400 text-xl">★★★★★</div>
                <div className="text-lg font-medium text-gray-900">&quot;I switched from QA to DevOps within 90 days. The trainers were brilliant and always available!&quot;</div>
                <div className="text-sm text-blue-700 font-semibold">— Ravi, Now at Capgemini</div>
              </div>
              {/* Review 2 */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 shadow flex flex-col gap-3">
                <div className="text-yellow-400 text-xl">★★★★★</div>
                <div className="text-lg font-medium text-gray-900">&quot;The hands-on labs and real projects made all the difference. I landed my first DevOps job at Infosys!&quot;</div>
                <div className="text-sm text-blue-700 font-semibold">— Priya, Infosys</div>
              </div>
              {/* Review 3 */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 shadow flex flex-col gap-3">
                <div className="text-yellow-400 text-xl">★★★★★</div>
                <div className="text-lg font-medium text-gray-900">&quot;Resume and LinkedIn help was a game changer. Got interview calls from 3 MNCs in a month.&quot;</div>
                <div className="text-sm text-blue-700 font-semibold">— Sandeep, TCS</div>
              </div>
              {/* Review 4 */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 shadow flex flex-col gap-3">
                <div className="text-yellow-400 text-xl">★★★★★</div>
                <div className="text-lg font-medium text-gray-900">&quot;The community and mock interviews gave me the confidence to ace my Azure DevOps interview.&quot;</div>
                <div className="text-sm text-blue-700 font-semibold">— Anjali, Cognizant</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 ">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-neutral-500 mb-10 max-w-2xl mx-auto">
              Find answers to the most common questions about our platform, courses, and community.
            </p>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Inquiry Form (Left) */}
              <div className="bg-blue-50 shadow-lg rounded-2xl p-8 flex-1 max-w-full md:max-w-none flex flex-col justify-center" style={{ flexBasis: '35%' }}>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Still Have Questions?</h3>
                <p className="mb-4 text-base text-blue-700">Fill out the form and our team will get back to you soon.</p>
                <InquiryModal />
              </div>
              {/* FAQ Accordion (Right) */}
              <div className="bg-blue-50 shadow-lg rounded-2xl flex-1 max-w-full md:max-w-none" style={{ flexBasis: '65%' }}>
                <FAQAccordion />
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function WebinarCountdownCTA() {
  // 48 hours from now
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-block bg-blue-600 text-white rounded-lg px-2 py-1 font-bold text-lg">Webinar</span>
          <span className="text-blue-700 font-semibold text-lg">Live in:</span>
          <span className="font-mono text-blue-900 text-lg">
            {hours.toString().padStart(2, "0")}h : {minutes.toString().padStart(2, "0")}m : {seconds.toString().padStart(2, "0")}s
          </span>
        </div>
        <div className="text-lg font-semibold text-blue-900 mb-1">Getting Started with DevOps</div>
        <div className="text-gray-700 mb-2 text-base max-w-xl">
          Join our free live webinar and learn the fundamentals of DevOps, CI/CD, and cloud automation from engineers with 10+ years of experience. Perfect for beginners and those looking to upskill for 2024!
        </div>
      </div>
      <div className="flex flex-col gap-3 min-w-[220px] w-full md:w-auto">
        <Link href="/webinars/register" passHref legacyBehavior>
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow transition-colors text-base">
            Register for Webinar
          </button>
        </Link>
        <Link href="/webinars" passHref legacyBehavior>
          <button className="w-full bg-white border border-blue-700 text-blue-900 font-semibold py-3 px-6 rounded-xl shadow hover:bg-blue-50 transition-colors text-base">
            View All Webinars
          </button>
        </Link>
      </div>
    </div>
  );
}

