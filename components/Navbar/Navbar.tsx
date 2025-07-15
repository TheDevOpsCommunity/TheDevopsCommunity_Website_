"use client";
import React from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizable-navbar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavbarTop() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleCoursesClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      const coursesSection = document.querySelector('section[id="courses"]');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    {
      name: "Courses",
      link: "/courses",
      onClick: isHomePage ? handleCoursesClick : undefined,
    },
    {
      name: "Webinars",
      link: "/webinars",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Blog",
      link: "/blog",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems 
            items={navItems} 
            className="text-blue-900"
          />
          <div className="flex items-center gap-4 cursor-pointer z-20">
            <Link href="/webinars/linux-for-devops-demo" style={{ cursor: 'pointer' }}>
              <button className="bg-blue-700 hover:bg-blue-800 transition-colors text-white font-semibold px-5 py-2.5 rounded-full shadow-md text-sm cursor-pointer">
                Register for Webinar
              </button>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="bg-blue-50">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            className="bg-blue-100/95 backdrop-blur-sm"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  if (item.onClick) {
                    item.onClick(e);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="block py-2.5 px-4 text-lg font-medium text-blue-900 hover:bg-black hover:text-white rounded-md transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Link 
              href="/webinars/linux-for-devops-demo" 
              style={{ cursor: 'pointer' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <button className="mt-4 w-full bg-blue-700 hover:bg-blue-800 transition-colors text-white font-semibold py-3 px-4 rounded-lg shadow-md text-base">
                Register for Webinar
              </button>
            </Link>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

