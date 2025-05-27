"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { FaAws, FaDocker, FaUsers, FaChalkboardTeacher, FaNetworkWired, FaBuilding, FaLightbulb, FaCloud } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiJenkins, SiGithubactions } from 'react-icons/si';

export default function AboutPage() {
  const techSkills = [
    { name: "AWS DevOps", icon: <FaAws className="w-6 h-6 text-orange-500" /> },
    { name: "Azure DevOps", icon: <FaCloud className="w-6 h-6 text-blue-500" /> },
    { name: "Kubernetes", icon: <SiKubernetes className="w-6 h-6 text-blue-600" /> },
    { name: "Terraform", icon: <SiTerraform className="w-6 h-6 text-purple-600" /> },
    { name: "Docker", icon: <FaDocker className="w-6 h-6 text-blue-400" /> },
    { name: "CI/CD Pipelines", icon: <SiJenkins className="w-6 h-6 text-gray-500" /> },
    { name: "GitHub Actions", icon: <SiGithubactions className="w-6 h-6 text-black" /> },
    { name: "Cloud-native security & automation", icon: <FaNetworkWired className="w-6 h-6 text-green-500" /> },
  ];

  const offerings = [
    { name: "Live webinars and workshops with 10+ year experts", icon: <FaChalkboardTeacher className="w-8 h-8 text-blue-500" /> },
    { name: "Practical DevOps roadmaps for beginners to advanced", icon: <FaUsers className="w-8 h-8 text-green-500" /> },
    { name: "Community support and job-oriented mentorship", icon: <FaUsers className="w-8 h-8 text-purple-500" /> },
    { name: "Courses built on real-world projects — no fluff", icon: <FaLightbulb className="w-8 h-8 text-yellow-500" /> },
    { name: "A growing global network of learners and engineers", icon: <FaNetworkWired className="w-8 h-8 text-teal-500" /> },
  ];

  const trustedByLogos = [
    { name: "TCS", src: "/logos/tcs.svg", alt: "TCS Logo" },
    { name: "Infosys", src: "/logos/infosys.svg", alt: "Infosys Logo" },
    { name: "Zoho", src: "/logos/zoho.svg", alt: "Zoho Logo" },
    { name: "Capgemini", src: "/logos/capgemini.svg", alt: "Capgemini Logo" },
    { name: "Cognizant", src: "/logos/cognizant.svg", alt: "Cognizant Logo" },
  ];

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
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto font-medium">
            Welcome to DevOps Community — where engineers grow, innovate, and lead.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 80 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 md:mb-16 p-8 bg-white rounded-2xl shadow-xl border border-blue-100"
        >
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed text-center">
            At DevOps Community, we believe that DevOps isn&apos;t just a skill — it&apos;s a mindset. Our mission is to empower individuals from all backgrounds to master the tools, practices, and culture that drive world-class software delivery.
          </p>
        </motion.div>
        
        {/* Hands-on Training Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 80 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 md:mb-16 p-8 bg-white rounded-2xl shadow-xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Real-World, Hands-On Training In:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness:100 }}
                viewport={{ once: true, amount: 0.5 }}
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
              >
                {skill.icon}
                <span className="text-neutral-700 font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why We Exist Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, type: "spring", stiffness: 80 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 md:mb-16 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Why We Exist</h2>
          <p className="text-lg md:text-xl leading-relaxed text-center max-w-4xl mx-auto">
            The tech industry is evolving fast. Traditional degrees alone don&apos;t cut it. We fill that gap with industry-aligned, project-based training crafted by real engineers — not textbook authors.
            <br/><br/>
            We&apos;re not just an educational platform. We&apos;re a movement — building a strong, inclusive community of DevOps enthusiasts, practitioners, and leaders.
          </p>
        </motion.div>

        {/* What We Offer Section */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 80 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16 md:mb-20 p-8 bg-white rounded-2xl shadow-xl border border-blue-100"
        >
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {offerings.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 100 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="p-3 bg-white rounded-full shadow-md mb-4 inline-block">
                           {item.icon}
                        </div>
                        <p className="text-neutral-700 font-medium leading-relaxed">{item.name}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, type: "spring", stiffness: 80 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 md:mb-20 p-8 bg-white rounded-2xl shadow-xl border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Trusted By</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Our learners have gone on to work at leading companies like:
            <br />
            TCS, Infosys, Zoho, Capgemini, Cognizant, and more.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {trustedByLogos.map((logo) => (
              <div key={logo.name} className="flex flex-col items-center grayscale hover:grayscale-0 transition-all">
                 <FaBuilding className="w-12 h-12 text-gray-400" />
                 <span className="text-sm text-neutral-500 mt-1">{logo.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Join the Movement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 90 }}
          viewport={{ once: true }}
          className="text-center py-12 md:py-16 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 px-4">Join the Movement</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto px-4 text-lg">
            Whether you&apos;re a developer, system admin, student, or career switcher — DevOps Community is your launchpad to the future of engineering.
          </p>
          <p className="text-xl font-semibold text-yellow-300 mb-10 px-4">
            👉 Let&apos;s automate, collaborate, and innovate — together.
          </p>
          <Link href="/webinars" passHref>
            <button className="bg-yellow-400 text-blue-800 font-bold py-3.5 px-10 rounded-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg text-lg transform hover:scale-105">
              Explore Webinars & Courses
            </button>
          </Link>
        </motion.div>

      </motion.div>
    </main>
  );
} 