"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CalendarIcon, ClockIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/blog-api";
import ShareButtons from "./ShareButtons";

interface BlogMetaProps {
  blog: BlogPost;
}

export default function BlogMeta({ blog }: BlogMetaProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(100, Math.max(0, (scrolled / maxScroll) * 100));
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sticky top-6"
    >
      {/* Article Info */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Article Info</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-neutral-600">
            <CalendarIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium">Published</div>
              <div className="text-sm">{formatDate(blog.published_at)}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-neutral-600">
            <ClockIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium">Reading Time</div>
              <div className="text-sm">{blog.reading_time} minutes</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 text-neutral-600">
            <UserIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Authors</div>
              <div className="text-sm">
                {blog.authors.map((author, index) => (
                  <span key={author}>
                    {author}
                    {index < blog.authors.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
          <TagIcon className="w-5 h-5" />
          Tags
        </h4>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-blue-900 mb-3">Share Article</h4>
        <ShareButtons 
          url={currentUrl}
          title={blog.title}
          description={blog.summary}
        />
      </div>

      {/* Reading Progress */}
      <div className="border-t border-gray-100 pt-6 mt-6">
        <h4 className="text-lg font-bold text-blue-900 mb-3">Reading Progress</h4>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          {Math.round(readingProgress)}% completed
        </p>
      </div>
    </motion.div>
  );
}