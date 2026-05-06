"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const slides = [
  { src: "/hero/slide-1.jpg", zoom: "in" },
  { src: "/hero/slide-2.jpg", zoom: "out" },
  { src: "/hero/slide-3.jpg", zoom: "in" },
  { src: "/hero/slide-4.jpg", zoom: "out" },
  { src: "/hero/slide-5.jpg", zoom: "in" },
];

const SLIDE_DURATION = 5000; // ms per slide

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Slideshow backgrounds */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Ken Burns zoom */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[current].src}')` }}
            initial={{
              scale: slides[current].zoom === "in" ? 1 : 1.12,
            }}
            animate={{
              scale: slides[current].zoom === "in" ? 1.12 : 1,
            }}
            transition={{ duration: SLIDE_DURATION / 1000 + 1.2, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a6b]/80 via-[#1a3a6b]/65 to-[#1a3a6b]/75 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Logo în loc de text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-0"
        >
          <Image
            src="/logo-white.png"
            alt="EBK Construction LTD"
            width={340}
            height={128}
            className="w-96 sm:w-[440px] md:w-[560px] h-auto object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-barlow font-bold text-2xl sm:text-3xl lg:text-4xl tracking-[0.15em] uppercase text-[#c8a96e] mb-6"
        >
          Building Spaces. Delivering Excellence.
        </motion.p>

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
            href="/contact"
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

        {/* Slide indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center gap-2 mt-12"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-[#c8a96e]"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-0.5 h-8 bg-white/30 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
