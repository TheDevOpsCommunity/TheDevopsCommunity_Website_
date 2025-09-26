"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";

import { BlogPost } from "@/types/blog";
import { getBlogById } from "@/lib/blog-api";
import BlogHero from "@/components/Blog/BlogHero";
import BlogContent from "@/components/Blog/BlogContent";
import BlogMeta from "@/components/Blog/BlogMeta";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ErrorMessage from "@/components/ui/error-message";

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const blogData = await getBlogById(id);
        console.log("[BlogDetailPage] Loaded blog", { id, image_url: (blogData as any)?.image_url, title: blogData?.title });
        setBlog(blogData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Update reading progress
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(100, Math.max(0, (scrolled / maxScroll) * 100));
      
      // Update progress bar if it exists
      const progressBar = document.querySelector('[data-progress-bar]') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Set meta tags for social sharing - always call useEffect  
  useEffect(() => {
    if (!blog) return; // Early return if no blog data
    
    // Update document title
    document.title = `${blog.title} | DevOps Community Blog`;
    
    // Get current URL for meta tags
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    // Update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', blog.summary);
    updateMetaTag('author', blog.authors.join(', '));
    
    // Open Graph tags for rich link previews
    updateMetaTag('og:type', 'article');
    updateMetaTag('og:title', blog.title);
    updateMetaTag('og:description', blog.summary);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:image', `${window.location.origin}/blue.png`);
    updateMetaTag('og:site_name', 'DevOps Community');
    updateMetaTag('og:image:width', '1536');
    updateMetaTag('og:image:height', '1024');
    updateMetaTag('og:image:alt', blog.title);
    updateMetaTag('og:locale', 'en_US');
    
    // Article specific tags
    updateMetaTag('article:author', blog.authors.join(', '));
    updateMetaTag('article:published_time', blog.published_at);
    updateMetaTag('article:section', 'DevOps');
    updateMetaTag('article:tag', blog.tags.join(', '));
    
    // Twitter Card tags for Twitter sharing
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@devops_community');
    updateMetaTag('twitter:creator', '@devops_community');
    updateMetaTag('twitter:title', blog.title);
    updateMetaTag('twitter:description', blog.summary);
    updateMetaTag('twitter:image', `${window.location.origin}/blue.png`);
    updateMetaTag('twitter:image:alt', blog.title);
    
    // Additional meta tags for better SEO and sharing
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-neutral-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <ErrorMessage
          title={error === "Blog post not found" ? "Blog Post Not Found" : "Failed to Load Blog Post"}
          message={error || "The blog post you're looking for doesn't exist or has been moved."}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 pt-20 md:pt-24">
        {/* Hero Section */}
        <BlogHero blog={blog} />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:w-2/3"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-12">
              <img
                src={blog.image_url && blog.image_url.trim() !== '' ? blog.image_url : "https://placehold.co/100x40"}
                alt={blog.title}
                className="w-full h-auto rounded-xl mb-8"
              />
              <BlogContent content={blog.content} />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:w-1/3 space-y-6"
          >
            <BlogMeta blog={blog} />
          </motion.div>
        </div>
      </div>

      {/* Related Posts Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Continue Reading
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition-colors duration-300"
            >
              ← Previous Page
            </button>
            <button
              onClick={() => window.location.href = '/blog'}
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-300"
            >
              View All Posts
            </button>
          </div>
        </div>
      </motion.div>

      {/* Reading Progress Bar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          data-progress-bar
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: '0%' }}
        />
      </div>
    </main>
  );
}