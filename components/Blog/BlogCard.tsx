"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import { BlogPost } from "@/types/blog";
import { formatDate, getRelativeTime } from "@/lib/blog-api";
import { Poppins } from "next/font/google";

interface BlogCardProps {
  blog: BlogPost;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, type: "spring", stiffness: 90 },
  }),
};

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

const headingFont = Poppins({ subsets: ["latin"], weight: ["700", "800", "900"] });

export default function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden group cursor-pointer"
    >
      <Link href={`/blog/${blog._id}`} className="block h-full">
        {/* Cover Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src="/Gemini_Generated_Image.png"
            alt={blog.title}
            fill
            className="object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(blog.category)}`}>
              {blog.category}
            </span>
          </div>
          
          {/* Reading Time */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs font-medium flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              {blog.reading_time} min read
            </span>
          </div>

          {/* Blog Title Overlay */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pr-8">
            <div className="relative max-w-[85%] md:max-w-[70%]">
              {/* Accent glow behind text */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-sky-400/30 via-blue-500/25 to-transparent blur-md -z-20" />
              {/* Glass backdrop */}
              <div className="absolute inset-0 -z-10 rounded-xl bg-slate-900/30 backdrop-blur-[3px] ring-1 ring-white/15 shadow-[0_12px_32px_rgba(2,6,23,0.35)]" />

              <h3
                className={`${headingFont.className} text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-blue-100 to-sky-50 font-extrabold text-lg md:text-2xl leading-snug line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]`}
              >
                {blog.title.length > 52 ? `${blog.title.substring(0, 52)}...` : blog.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags - Moved to top */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <span className="mr-1 opacity-60">#</span>
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-blue-900 mb-3 leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors">
            {blog.title}
          </h3>

          {/* Summary */}
          <p className="text-neutral-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {blog.summary}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{getRelativeTime(blog.published_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="w-4 h-4" />
                <span>{blog.authors[0]}</span>
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <div className="flex items-center justify-between">
            <span className="text-blue-700 font-semibold text-sm group-hover:text-blue-800 transition-colors">
              Read Article →
            </span>
            <div className="text-xs text-neutral-400">
              {formatDate(blog.published_at)}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}