"use client";
import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

export default function CoursesLamp() {
  return (
    <LampContainer className="min-h-[50vh]">
      <div
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Courses
      </div>
    </LampContainer>
  );
} 