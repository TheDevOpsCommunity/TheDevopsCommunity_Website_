"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { FaAws, FaAngleRight } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

const courses = [
  {
    id: "azure-devops",
    title: "Azure DevOps Course",
    description: "Master Azure, Azure DevOps and core DevOps tools: fundamentals, networking, compute, storage, databases, AKS, CI/CD (YAML), Terraform, Docker, Kubernetes, monitoring, security and a real capstone project.",
    icon: <VscAzure className="text-blue-600 w-12 h-12" />,
    link: "/courses/azure-devops",
    tags: ["Azure", "Azure DevOps", "Terraform", "Docker", "Kubernetes"],
  },
  {
    id: "aws-devops",
    title: "AWS DevOps Certification Course",
    description: "Master DevOps principles and tools on the AWS cloud. From CI/CD pipelines to Infrastructure as Code, become a certified AWS DevOps Engineer.",
    icon: <FaAws className="text-orange-500 w-12 h-12" />,
    link: "/courses/aws-devops",
    tags: ["AWS", "DevOps", "CI/CD", "Terraform", "Kubernetes"],
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
            Azure & AWS DevOps Courses
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Accelerate your career with our industry-leading DevOps courses, designed by experts for all skill levels.
          </p>
        </motion.div>

        {/* Courses grid (unchanged, but framed in new layout) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
          className="mt-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative group"
              >
                <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-b from-blue-300/25 via-blue-200/10 to-transparent blur-xl opacity-70 group-hover:opacity-90 transition-opacity" />

                <div className="relative rounded-2xl border border-blue-200/70 bg-white shadow-[0_8px_24px_rgba(30,64,175,0.08)] hover:shadow-[0_14px_36px_rgba(30,64,175,0.12)]">
                  <div className={`absolute top-0 left-0 right-0 h-1 ${index % 2 === 0 ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600' : 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500'}`} />
                  <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full bg-blue-50 ring-1 ring-blue-200 flex items-center justify-center text-blue-700 shadow-inner">
                    {course.icon}
                  </div>
                  <div className="p-6 md:p-7">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-900/80">{course.id === 'azure-devops' ? 'Azure DevOps Course' : course.id === 'aws-devops' ? 'AWS DevOps Course' : 'DevOps Course'}</span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">Featured</span>
                    </div>
                    <h2 className="mb-3 line-clamp-2 text-2xl md:text-3xl font-black leading-tight tracking-tight text-blue-900">{course.title}</h2>
                    <p className="mb-5 line-clamp-4 text-[1rem] leading-relaxed text-neutral-700">{course.description}</p>
                    <div className="mb-6 flex flex-wrap gap-2.5">
                      {course.tags.map((tag, i) => (
                        <span key={tag} className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border transition-colors duration-200 shadow-sm ${i === 0 ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-neutral-600 border-neutral-200'}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs font-semibold text-blue-900/70">Starts weekly • Live doubt support</div>
                      <Link href={course.link} passHref>
                        <button className="rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-5 transition-colors flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(30,64,175,0.25)]">
                          <span>View Details</span>
                          <FaAngleRight className="transition-transform duration-300" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
} 