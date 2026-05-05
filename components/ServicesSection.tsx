"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

const icons: Record<string, string> = {
  flooring: "🪵",
  joinery: "🔨",
  kitchen: "🍳",
  fitout: "🏗️",
  firedoor: "🚪",
  carpentry: "🪚",
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">
            What We Do
          </p>
          <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-[#1a3a6b] mb-5">
            Our Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            From bespoke joinery to full commercial fit-outs, we deliver
            exceptional results across every aspect of carpentry and construction.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/services#${service.slug}`}
                className="group flex flex-col h-full bg-white border border-gray-100 hover:border-[#c8a96e] hover:shadow-lg transition-all duration-300 p-8 rounded-sm"
              >
                <div className="text-4xl mb-5">{icons[service.icon]}</div>
                <h3 className="font-barlow font-bold text-xl text-[#1a3a6b] mb-1 group-hover:text-[#c8a96e] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#c8a96e] font-medium mb-3">
                  {service.subtitle}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {service.short}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[#1a3a6b] group-hover:text-[#c8a96e] text-sm font-semibold transition-colors">
                  Learn more
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            href="/services"
            className="inline-block px-8 py-3.5 border-2 border-[#1a3a6b] text-[#1a3a6b] hover:bg-[#1a3a6b] hover:text-white font-semibold tracking-wide transition-all duration-200 rounded-sm"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
