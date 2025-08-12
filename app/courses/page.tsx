"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { FaAws, FaAngleRight } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

const courses = [
  {
    id: "aws-devops",
    title: "AWS DevOps Certification Course",
    description: "Master DevOps principles and tools on the AWS cloud. From CI/CD pipelines to Infrastructure as Code, become a certified AWS DevOps Engineer.",
    icon: <FaAws className="text-orange-500 w-12 h-12" />,
    link: "/courses/aws-devops",
    tags: ["AWS", "DevOps", "CI/CD", "Terraform", "Kubernetes"],
  },
  {
    id: "azure-devops",
    title: "Azure DevOps with Azure Admin",
    description: "Gain expertise in Azure cloud services, networking, and build robust DevOps pipelines using Azure DevOps tools and best practices.",
    icon: <VscAzure className="text-blue-600 w-12 h-12" />,
    link: "/courses/azure-devops",
    tags: ["Azure", "DevOps", "Pipelines", "ARM Templates", "Security"],
  },

  // Add more courses here if needed
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, type: "spring", stiffness: 90 },
  }),
};

export default function CoursesPage() {
  return (
    <main className="relative w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 text-neutral-800 py-20 md:py-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 tracking-tight">
            Our Professional Courses
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Accelerate your career with our industry-leading DevOps courses, designed by experts for all skill levels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {courses.map((course, index) => {
            return (
            <motion.div
              key={course.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative transition-all duration-300 group hover:-translate-y-0.5"
            >
              {/* Aura to add visual weight without loud colors */}
              <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-b from-blue-300/25 via-blue-200/10 to-transparent blur-xl opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Compact blue-themed card */}
              <div className="relative bg-white rounded-2xl border border-blue-200/70 shadow-[0_8px_24px_rgba(30,64,175,0.08)] hover:shadow-[0_14px_36px_rgba(30,64,175,0.12)] p-5">
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-t-2xl" />
                {/* Header row: icon + title */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-200 shadow-inner">
                    {course.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-blue-900 leading-tight tracking-tight">
                    {course.title}
                  </h2>
                </div>
                
                {/* Description */}
                <p className="text-neutral-700 text-[0.95rem] mb-4 leading-relaxed">
                  {course.description}
                </p>
                
                {/* Tags */}
                <div className="mb-4">
                  <div className="mb-2 text-[0.8rem] font-semibold text-blue-900/80">Key skills you learn</div>
                  <div className="flex flex-wrap gap-2.5">
                    {course.tags.map((tag, index) => (
                      <span 
                        key={tag} 
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border transition-colors duration-200 shadow-sm ${
                          index === 0 ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-neutral-600 border-neutral-200'
                        } hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTA */}
                <Link href={course.link} passHref>
                  <button className="mt-2 w-full rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-5 transition-colors flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(30,64,175,0.25)]">
                    <span>View Details</span>
                    <FaAngleRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                  </button>
                </Link>
              </div>
              
            </motion.div>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
} 