"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  loading = false,
}: PaginationProps) {
  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2; // Show 2 pages before and after current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Calculate start and end of the range around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Always show last page (if it's not the first page)
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where there are gaps
    let prev = 0;
    for (const page of range) {
      if (page - prev === 2) {
        rangeWithDots.push(prev + 1);
      } else if (page - prev !== 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2 mt-8 mb-4"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage || loading}
        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${
          hasPrevPage && !loading
            ? "border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow"
            : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="flex items-center justify-center w-10 h-10 text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <motion.button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              disabled={loading}
              whileHover={!isCurrentPage && !loading ? { scale: 1.05 } : {}}
              whileTap={!isCurrentPage && !loading ? { scale: 0.95 } : {}}
              className={`flex items-center justify-center w-10 h-10 rounded-lg border font-medium text-sm transition-all duration-200 ${
                isCurrentPage
                  ? "border-blue-500 bg-blue-500 text-white shadow-md"
                  : loading
                  ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow"
              }`}
            >
              {pageNumber}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || loading}
        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${
          hasNextPage && !loading
            ? "border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow"
            : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-600 hidden sm:block">
        Page {currentPage} of {totalPages}
      </div>
    </motion.div>
  );
}
