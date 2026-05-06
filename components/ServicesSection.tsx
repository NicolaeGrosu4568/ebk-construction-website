"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/constants";

const serviceImages: Record<string, string> = {
  flooring: "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800&q=80",
  joinery: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800&q=80",
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  fitout: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  firedoor: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  carpentry: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=800&q=80",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="group relative flex flex-col h-72 overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Background image */}
                <Image
                  src={serviceImages[service.icon]}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay gradient — mai dens jos */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/90 via-[#1a3a6b]/40 to-transparent group-hover:from-[#1a3a6b]/95 transition-all duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-barlow font-bold text-xl text-white mb-1 group-hover:text-[#c8a96e] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#c8a96e] text-xs font-semibold tracking-wide uppercase mb-3">
                    {service.subtitle}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3">
                    {service.short}
                  </p>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    Learn more
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
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
