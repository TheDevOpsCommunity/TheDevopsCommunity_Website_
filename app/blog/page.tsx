"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BlogPost, BlogApiResponse } from "@/types/blog";
import { getAllBlogs, getBlogsByCategory, searchBlogs } from "@/lib/blog-api";
import BlogGrid from "@/components/Blog/BlogGrid";
import BlogFilters from "@/components/Blog/BlogFilters";
import ErrorMessage from "@/components/ui/error-message";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data: BlogApiResponse = await getAllBlogs();
        setBlogs(data.blogs);
        setCategories(data.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle category filter
  const handleCategoryChange = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCategory(category);
      setSearchQuery(""); // Clear search when changing category

      let filteredBlogs: BlogPost[];
      if (category === "All Categories") {
        const data: BlogApiResponse = await getAllBlogs();
        filteredBlogs = data.blogs;
      } else {
        filteredBlogs = await getBlogsByCategory(category);
      }

      setBlogs(filteredBlogs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to filter blogs");
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      // If search is cleared, reload blogs for current category
      handleCategoryChange(selectedCategory);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await searchBlogs(query);
      setBlogs(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (searchQuery) {
      handleSearchChange(searchQuery);
    } else {
      handleCategoryChange(selectedCategory);
    }
  };

  return (
    <main className="relative w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 text-neutral-800 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 tracking-tight">
            DevOps Community Blog
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            AI-generated insights, tutorials, and best practices for DevOps, Cloud, and Data Science. 
            Stay updated with the latest trends and technologies in the industry.
          </p>
        </motion.div>

        {/* Filters */}
        <BlogFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          totalBlogs={blogs.length}
        />

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage
            title="Failed to Load Blog Posts"
            message={error}
            onRetry={handleRetry}
            className="my-8"
          />
        )}

        {/* Blog Grid */}
        {!error && (
          <BlogGrid blogs={blogs} loading={loading} />
        )}

        {/* Featured Categories Section */}
        {!loading && !error && blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 pt-16 border-t border-blue-200"
          >
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
              Explore by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.filter(cat => cat !== "All Categories").map((category) => {
                const categoryCount = blogs.filter(blog => blog.category === category).length;
                const getCategoryIcon = (cat: string) => {
                  const icons = {
                    DevOps: "🚀",
                    Kubernetes: "☸️",
                    AWS: "☁️",
                    Azure: "🔷",
                    Infrastructure: "🏗️",
                    "Data Science": "📊",
                  };
                  return icons[cat as keyof typeof icons] || "📝";
                };

                return (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                      selectedCategory === category
                        ? "bg-blue-100 border-blue-300 text-blue-800"
                        : "bg-white border-blue-100 text-neutral-700 hover:border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{getCategoryIcon(category)}</div>
                    <div className="font-semibold text-sm mb-1">{category}</div>
                    <div className="text-xs text-neutral-500">
                      {categoryCount} {categoryCount === 1 ? "post" : "posts"}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-white rounded-2xl shadow-lg border border-blue-100 p-8"
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Stay Updated with Latest Posts
            </h3>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Our AI-powered blog is constantly updated with new insights, tutorials, and best practices. 
              Check back regularly for fresh content on DevOps, Cloud, and Data Science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Refresh for New Posts
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setSearchQuery("");
                  handleCategoryChange("All Categories");
                }}
                className="px-6 py-3 bg-white border border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                View All Posts
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}