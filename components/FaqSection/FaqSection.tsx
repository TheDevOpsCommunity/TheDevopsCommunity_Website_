"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "../ui/animated-modal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    question: "What is DevOps Community?",
    answer: "DevOps Community is a platform for learning and upskilling in DevOps and Cloud technologies. We offer comprehensive courses, live webinars, and hands-on training to help you master modern DevOps practices.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods through Razorpay, including credit/debit cards, UPI, net banking, and digital wallets. All payments are secure and processed instantly.",
  },
  {
    question: "Do you provide certificates?",
    answer: "Yes, we provide certificates of completion for all our courses and webinars. These certificates validate your learning and can be shared on professional platforms like LinkedIn.",
  },
  {
    question: "Are there live classes or just recorded content?",
    answer: "We offer both live interactive sessions and recorded content. Our webinars are conducted live with real-time Q&A, while courses include both live sessions and recorded materials for flexible learning.",
  },
  {
    question: "What support do you provide?",
    answer: "We provide comprehensive support including technical assistance, learning guidance, and career mentorship. You can reach our support team at frontdesk@thedevopscommunity.com for any queries.",
  },
];

function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return submitted ? (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
      <p className="text-neutral-600">Your inquiry has been submitted. We&apos;ll get back to you soon.</p>
    </div>
  ) : (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your Name" type="text" required />
        </div>
        <div className="flex-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@email.com" type="email" required />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Input id="message" placeholder="How can we help you?" type="text" required className="h-20" />
      </div>
      <button
        className="w-full mt-4 px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-neutral-800 transition"
        type="submit"
      >
        Submit Inquiry
      </button>
    </form>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-5xl lg:leading-tight mt-10 max-w-5xl mx-auto text-center tracking-tight font-medium text-black">Frequently Asked Questions</h2>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal">Find answers to the most common questions about our platform, courses, and community.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Contact Card */}
        <div className="bg-ghostwhite shadow-lg rounded-2xl p-8 flex-1 max-w-full md:max-w-none" style={{ flexBasis: '35%' }}>
          <h3 className="text-xl font-semibold mb-2 text-neutral-900">Still Have Questions?</h3>
          <p className="mb-4 text-base text-neutral-700">
            <Link href="/contact-us" className="text-blue-600 underline">Contact Us</Link>, we are happy to help you
          </p>
          <div className="flex items-center space-x-2 mb-6">
            <Image src="https://randomuser.me/api/portraits/women/44.jpg" alt="Portrait of user1" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow" />
            <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Portrait of user2" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow -ml-4" />
            <Image src="https://randomuser.me/api/portraits/men/65.jpg" alt="Portrait of user3" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow -ml-4" />
          </div>
          <Modal>
            <ModalTrigger className="w-full bg-black text-white rounded-full py-3 font-medium text-base mt-2 hover:bg-neutral-800 transition">
              Fill Inquiry Form
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <h4 className="text-lg font-semibold text-center mb-6">Inquiry Form</h4>
                <InquiryForm />
              </ModalContent>
              <ModalFooter>
                <button className="px-4 py-2 bg-gray-200 text-black rounded-md mr-2" onClick={() => window.location.reload()}>Cancel</button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        </div>
        {/* Right: FAQ List */}
        <div className="bg-ghostwhite shadow-lg rounded-2xl flex-1 max-w-full md:max-w-none" style={{ flexBasis: '65%' }}>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-ghostwhite min-w-0 overflow-hidden">
                <button
                  className="w-full text-left px-8 py-6 focus:outline-none flex justify-between items-center text-base font-medium text-neutral-900"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{faq.question}</span>
                  <span className="text-2xl text-neutral-400">{openIndex === idx ? "×" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      key={"faq-answer-" + idx}
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                      animate={{ height: 'auto', opacity: 1, paddingTop: 8, paddingBottom: 24 }}
                      exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden px-8 text-neutral-700 text-base min-w-0"
                      style={{ wordBreak: 'break-word' }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 