"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalBlogs: number;
}

export default function BlogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalBlogs,
}: BlogFiltersProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsDropdownOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-8"
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-neutral-600 whitespace-nowrap">
            Filter by:
          </span>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium text-blue-700 min-w-[160px]"
            >
              <span>{selectedCategory}</span>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
              >
                <div className="py-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-neutral-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-neutral-500 whitespace-nowrap">
          {totalBlogs} {totalBlogs === 1 ? "post" : "posts"} found
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== "All Categories" || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs font-medium text-neutral-500">Active filters:</span>
          
          {selectedCategory !== "All Categories" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
            >
              {selectedCategory}
              <button
                onClick={() => onCategoryChange("All Categories")}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.span>
          )}
          
          {searchQuery && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
            >
              &quot;{searchQuery}&quot;
              <button
                onClick={() => onSearchChange("")}
                className="ml-1 hover:bg-green-200 rounded-full p-0.5 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.span>
          )}
          
          <button
            onClick={() => {
              onCategoryChange("All Categories");
              onSearchChange("");
            }}
            className="text-xs text-neutral-500 hover:text-neutral-700 underline transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </motion.div>
  );
}