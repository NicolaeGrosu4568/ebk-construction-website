"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "UK", label: "Wide Coverage" },
  { value: "Res & Com", label: "Residential & Commercial" },
  { value: "£1k+", label: "Projects from" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#1a3a6b] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-barlow font-bold text-4xl text-[#c8a96e] mb-1">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
