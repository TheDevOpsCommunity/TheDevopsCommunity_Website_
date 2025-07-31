"use client";

import React from "react";
import { motion } from "motion/react";
import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  blogs: BlogPost[];
  loading?: boolean;
}

const LoadingSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200" />
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-14 bg-gray-200 rounded-full" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
    className="col-span-full flex flex-col items-center justify-center py-16 px-4"
  >
    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
      <svg
        className="w-12 h-12 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-blue-900 mb-2">No Blog Posts Found</h3>
    <p className="text-neutral-600 text-center max-w-md mb-6">
      We couldn't find any blog posts matching your criteria. Try adjusting your filters or check back later for new content.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-md hover:shadow-lg"
    >
      Refresh Page
    </button>
  </motion.div>
);

export default function BlogGrid({ blogs, loading = false }: BlogGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 6 }, (_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {blogs.map((blog, index) => (
        <BlogCard key={blog._id} blog={blog} index={index} />
      ))}
    </motion.div>
  );
}