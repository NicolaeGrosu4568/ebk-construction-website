"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image via CSS — stock construction interior */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a6b]/85 via-[#1a3a6b]/75 to-[#1a3a6b]/60" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#c8a96e] font-barlow text-lg sm:text-xl tracking-[0.2em] uppercase font-semibold mb-4"
        >
          EBK Construction LTD
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-barlow font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6"
        >
          Building Spaces.
          <br />
          <span className="text-[#c8a96e]">Delivering Excellence.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-inter leading-relaxed"
        >
          Premium carpentry, joinery and interior fit-out specialists.
          Over 20 years of experience delivering exceptional results
          across London and the UK.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="#contact"
            className="px-8 py-4 bg-[#c8a96e] hover:bg-[#b8943a] text-white font-semibold text-base tracking-wide transition-all duration-200 rounded-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-4 border-2 border-white/60 hover:border-white text-white font-semibold text-base tracking-wide transition-all duration-200 rounded-sm hover:bg-white/10"
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-0.5 h-8 bg-white/30 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
