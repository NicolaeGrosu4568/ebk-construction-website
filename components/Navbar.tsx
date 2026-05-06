"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome || menuOpen
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Company name image */}
          <Link href="/" className="flex-shrink-0 -ml-8">
            <Image
              src={scrolled || !isHome || menuOpen ? "/logo.png" : "/company-name-white.png"}
              alt="EBK Construction LTD"
              width={400}
              height={100}
              className={`object-contain ${scrolled || !isHome || menuOpen ? "h-36 w-auto" : "h-auto w-64 sm:w-80 md:w-96"}`}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  scrolled || !isHome
                    ? "text-gray-700 hover:text-[#1a3a6b]"
                    : "text-white/90 hover:text-white"
                } ${pathname === link.href ? "text-[#c8a96e] font-semibold" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-5 py-2.5 bg-[#c8a96e] hover:bg-[#b8943a] text-white text-sm font-semibold tracking-wide transition-colors duration-200 rounded-sm"
            >
              Get a Free Quote
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                scrolled || !isHome || menuOpen ? "bg-gray-800" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                scrolled || !isHome || menuOpen ? "bg-gray-800" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                scrolled || !isHome || menuOpen ? "bg-gray-800" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3 text-base font-medium border-b border-gray-100 transition-colors ${
                pathname === link.href
                  ? "text-[#c8a96e]"
                  : "text-gray-700 hover:text-[#1a3a6b]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 py-3 text-center bg-[#c8a96e] hover:bg-[#b8943a] text-white font-semibold tracking-wide transition-colors rounded-sm"
          >
            Get a Free Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
