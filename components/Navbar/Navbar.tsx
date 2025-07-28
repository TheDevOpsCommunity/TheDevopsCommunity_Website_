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
          {/* Register for Webinar Button (Desktop) */}
          <Link href="/webinars/docker-kubernetes-bootcamp" style={{ cursor: 'pointer', zIndex: 1000 }}>
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-blue-800 transition-colors font-medium text-sm"
            >
              Register for Webinar
            </button>
          </Link>
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
              href="/webinars/docker-kubernetes-bootcamp"
              className="block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register for Webinar
            </Link>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

