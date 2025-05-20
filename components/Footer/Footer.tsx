"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ghostwhite border-t border-gray-200 w-full pt-12 pb-6 px-4 md:px-12 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-0">
        {/* Left: Personal Details */}
        <div className="flex-1 min-w-[220px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block bg-black text-white rounded-lg px-2 py-1 font-bold text-lg">P</span>
            <span className="font-semibold text-xl text-black">Pratham Shirbhate</span>
          </div>
          <div className="text-neutral-600 mb-1">A product by Pratham Shirbhate</div>
          <div className="text-neutral-500 text-sm">Building in public at <a href="https://twitter.com/prathamcodes" className="underline hover:text-black" target="_blank" rel="noopener noreferrer">@prathamcodes</a></div>
        </div>
        {/* Right: Pages */}
        <div className="flex-[2] grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <div className="font-medium text-black mb-2">Pages</div>
            <ul className="space-y-1 text-neutral-600">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#courses">Courses</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-black mb-2">Connect</div>
            <ul className="space-y-1 text-neutral-600">
              <li><a href="https://twitter.com/prathamcodes" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://github.com/prathamcodes" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="mailto:pratham@example.com">Email</a></li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-black mb-2">Community</div>
            <ul className="space-y-1 text-neutral-600">
              <li><a href="https://discord.gg/yourdiscord" target="_blank" rel="noopener noreferrer">Discord</a></li>
              <li><a href="/showcase">Showcase</a></li>
              <li><a href="/playground">Playground</a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom: All Pages, Courses, Webinar */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center text-sm">
        <div className="flex flex-wrap gap-4 text-neutral-500">
          <Link href="/">Home</Link>
          <Link href="/#courses">Courses</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="flex flex-wrap gap-4 text-neutral-500">
          <span className="font-medium text-black">Courses:</span>
          <Link href="/courses/aws-devops">AWS DevOps</Link>
          <Link href="/courses/azure-devops">Azure DevOps</Link>
        </div>
        <div className="flex flex-wrap gap-4 text-neutral-500">
          <span className="font-medium text-black">Webinar:</span>
          <a href="/webinars" className="hover:text-black">Register</a>
        </div>
      </div>
    </footer>
  );
} 