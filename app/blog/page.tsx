"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { FaCalendarAlt, FaUserEdit, FaAngleRight, FaSpinner } from "react-icons/fa";

interface BlogPost {
  id: string;
  title: string;
  snippet: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = []; // Empty array as content is coming soon

// const blogPosts = [
//   {
//     id: "getting-started-devops",
//     title: "Demystifying DevOps: A Beginner's Guide",
//     snippet: "New to DevOps? This guide breaks down the core principles, benefits, and essential tools to get you started on your journey...",
//     author: "Pratham Shirbhate",
//     date: "June 10, 2024",
//     image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop", // Placeholder
//     tags: ["DevOps", "Beginner", "CI/CD"],
//   },
//   {
//     id: "aws-vs-azure-devops",
//     title: "AWS DevOps vs. Azure DevOps: Which is Right for You?",
//     snippet: "A comprehensive comparison of AWS and Azure DevOps services, helping you choose the best platform for your project needs...",
//     author: "Jane Doe",
//     date: "June 15, 2024",
//     image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop", // Placeholder
//     tags: ["AWS", "Azure", "DevOps", "Comparison"],
//   },
//   {
//     id: "future-of-devops",
//     title: "The Future of DevOps: Trends to Watch in 2025",
//     snippet: "Explore upcoming trends in the DevOps landscape, including AI in DevOps (AIOps), GitOps, and the rise of platform engineering...",
//     author: "John Smith",
//     date: "June 20, 2024",
//     image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop", // Placeholder
//     tags: ["DevOps", "Trends", "AIOps", "GitOps"],
//   },
//   // Add more blog posts here
// ];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, type: "spring", stiffness: 90 },
  }),
};

export default function BlogPage() {
  return (
    <main className="relative w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 text-neutral-800 py-20 md:py-28 min-h-screen">
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
            Our DevOps Blog
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, tutorials, and news from the world of DevOps and Cloud Engineering.
          </p>
        </motion.div>

        {blogPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 120 }}
            className="flex flex-col items-center justify-center text-center py-16 md:py-24 bg-white rounded-2xl shadow-xl border-2 border-blue-100"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="mb-6 text-blue-600"
            >
              <FaSpinner className="w-16 h-16 md:w-20 md:h-20" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">
              Content Coming Soon!
            </h2>
            <p className="text-neutral-600 text-lg md:text-xl max-w-md mx-auto mb-8">
              We&apos;re working hard to bring you exciting new blog posts. Please check back later!
            </p>
            <Link href="/" passHref>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md text-base"
              >
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 flex flex-col group"
              >
                <Link href={`/blog/${post.id}`} passHref className="block">
                  <div className="relative w-full h-52 sm:h-60 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-blue-100 text-blue-700 text-xs font-medium mr-1.5 mb-1.5 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.id}`} passHref>
                    <h2 className="text-xl font-semibold text-blue-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-neutral-600 text-sm mb-4 flex-grow line-clamp-3">
                    {post.snippet}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mt-auto pt-3 border-t border-blue-100">
                    <div className="flex items-center gap-1.5">
                      <FaUserEdit />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`} passHref>
                      <button className="mt-5 w-full bg-blue-100 text-blue-700 font-semibold py-2.5 px-5 rounded-lg hover:bg-blue-200 hover:text-blue-800 transition-colors duration-300 flex items-center justify-center gap-2 group/button">
                          Read More
                          <FaAngleRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                      </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  );
} 