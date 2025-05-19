"use client";
import React from "react";

interface GradientBadgeProps {
  topGradient?: string; // e.g. 'from-pink-400'
  bottomGradient?: string; // e.g. 'to-blue-400'
  text: string;
  className?: string;
}

export function GradientBadge({ topGradient = 'from-black', bottomGradient = 'to-gray-700', text, className = "" }: GradientBadgeProps) {
  return (
    <span
      className={`inline-block px-4 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-b ${topGradient} ${bottomGradient} shadow-md ${className}`}
      style={{ letterSpacing: "0.04em" }}
    >
      {text}
    </span>
  );
} 