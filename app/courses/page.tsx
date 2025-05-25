"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { FaAws, FaAngleRight } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

const courses = [
  {
    id: "aws-devops",
    title: "AWS DevOps Certification Course",
    description: "Master DevOps principles and tools on the AWS cloud. From CI/CD pipelines to Infrastructure as Code, become a certified AWS DevOps Engineer.",
    icon: <FaAws className="text-orange-500 w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1551818255-e6e1097514cf?q=80&w=1200&auto=format&fit=crop", // Placeholder
    link: "/courses/aws-devops",
    tags: ["AWS", "DevOps", "CI/CD", "Terraform", "Kubernetes"],
  },
  {
    id: "azure-devops",
    title: "Azure DevOps with Azure Admin",
    description: "Gain expertise in Azure cloud services, networking, and build robust DevOps pipelines using Azure DevOps tools and best practices.",
    icon: <VscAzure className="text-blue-600 w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1614728263952-84ea256ec347?q=80&w=1200&auto=format&fit=crop", // Placeholder
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
            Our DevOps Courses
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Accelerate your career with our industry-leading DevOps courses, designed by experts for all skill levels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 flex flex-col group"
            >
              <div className="relative w-full h-56 sm:h-64 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                 <div className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                  {course.icon}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold text-blue-900 mb-2 leading-tight">
                  {course.title}
                </h2>
                <p className="text-neutral-600 text-sm mb-4 flex-grow line-clamp-3">
                  {course.description}
                </p>
                <div className="mb-4">
                  {course.tags.map((tag) => (
                    <span key={tag} className="inline-block bg-blue-100 text-blue-700 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={course.link} passHref>
                  <button className="mt-auto w-full bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center gap-2 group/button">
                    View Details
                    <FaAngleRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
} 