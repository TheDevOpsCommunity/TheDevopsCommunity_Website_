"use client";
import { motion } from "motion/react";
import { FaUsers, FaBullseye, FaLightbulb } from "react-icons/fa";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 text-neutral-800 py-20 md:py-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 tracking-tight">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Learn more about our mission, vision, and the team dedicated to empowering DevOps professionals worldwide.
          </p>
        </motion.div>

        {/* Mission, Vision, Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16 md:mb-20">
          {[
            {
              icon: <FaBullseye className="w-10 h-10 text-blue-600 mb-4" />,
              title: "Our Mission",
              text: "To provide accessible, high-quality DevOps education that bridges the gap between theoretical knowledge and real-world application, empowering individuals to achieve their career goals."
            },
            {
              icon: <FaLightbulb className="w-10 h-10 text-yellow-500 mb-4" />,
              title: "Our Vision",
              text: "To be the leading global platform for DevOps learning and career advancement, fostering a community of skilled, innovative, and successful professionals."
            },
            {
              icon: <FaUsers className="w-10 h-10 text-green-500 mb-4" />,
              title: "Our Values",
              text: "Excellence, Integrity, Community, Innovation, and Lifelong Learning. We are committed to these principles in everything we do."
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 100 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 text-center flex flex-col items-center"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold text-blue-900 mb-3">{item.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section (Placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 p-8 bg-white rounded-2xl shadow-xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Meet Our Team</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Our instructors and mentors are seasoned industry professionals with years of hands-on experience in DevOps, cloud computing, and software engineering. They are passionate about sharing their knowledge and helping you succeed.
          </p>
          {/* Placeholder for team member cards or images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <div className="w-32 h-32 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FaUsers className="w-16 h-16 text-blue-400" />
                </div>
                <h4 className="font-semibold text-blue-800 text-lg">Team Member {i}</h4>
                <p className="text-sm text-neutral-500">DevOps Expert</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Us / Call to Action (Placeholder) */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            viewport={{ once: true }}
            className="text-center py-12 md:py-16"
        >
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Join Our Community!</h2>
            <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                Ready to start your DevOps journey or have more questions? We&apos;d love to hear from you.
            </p>
            <Link href="/webinars" passHref>
                <button className="bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-lg text-lg">
                    Explore Webinars
                </button>
            </Link>
        </motion.div>

      </motion.div>
    </main>
  );
} 