"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BlogPost } from "@/types/blog";
import { getRelativeTime } from "@/lib/blog-api";

interface BlogHeroProps {
  blog: BlogPost;
}

const getCategoryColor = (category: string) => {
  const colors = {
    DevOps: "bg-blue-100 text-blue-700 border-blue-200",
    Kubernetes: "bg-purple-100 text-purple-700 border-purple-200",
    AWS: "bg-orange-100 text-orange-700 border-orange-200",
    Azure: "bg-cyan-100 text-cyan-700 border-cyan-200",
    Infrastructure: "bg-green-100 text-green-700 border-green-200",
    "Data Science": "bg-pink-100 text-pink-700 border-pink-200",
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700 border-gray-200";
};

export default function BlogHero({ blog }: BlogHeroProps) {
  return (
    <div className="relative w-full">
      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/Gemini_Generated_Image.png"
          alt={blog.title}
          fill
          className="object-cover object-bottom"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-6"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-neutral-800 px-4 py-2 rounded-lg hover:bg-white transition-colors shadow-lg"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="font-medium">Back to Blog</span>
          </Link>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 right-6"
        >
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${getCategoryColor(blog.category)}`}>
            {blog.category}
          </span>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            >
              {blog.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed max-w-3xl"
            >
              {blog.summary}
            </motion.p>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span className="font-medium">{blog.authors.join(", ")}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{getRelativeTime(blog.published_at)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>{blog.reading_time} min read</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-white border-b border-gray-100 py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-neutral-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-800 font-medium truncate">
              {blog.title}
            </span>
          </nav>
        </div>
      </motion.div>
    </div>
  );
}