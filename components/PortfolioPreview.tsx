"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "80 Eaton Square",
    category: "Bespoke Joinery",
    location: "Belgravia, London",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80",
    slug: "80-eaton-square",
  },
  {
    title: "Rosewood Hotel London",
    category: "Interior Fit-Out",
    location: "High Holborn, London",
    image: "/portfolio/rosewood.jpg",
    slug: "rosewood-hotel",
  },
  {
    title: "Loro Piana — New Bond Street",
    category: "Luxury Retail Fit-Out",
    location: "New Bond Street, London",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    slug: "loro-piana",
  },
];

export default function PortfolioPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">
            Recent Work
          </p>
          <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-[#1a3a6b] mb-5">
            Featured Projects
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            A selection of our recent work across London's most prestigious
            residential and commercial properties.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Link
                href="/portfolio"
                className="group block overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover scale-150 group-hover:scale-100 transition-transform duration-[2000ms] ease-in-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#1a3a6b]/0 group-hover:bg-[#1a3a6b]/30 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#c8a96e] text-white text-xs font-semibold px-3 py-1 rounded-sm tracking-wide uppercase">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-5 border-b-2 border-transparent group-hover:border-[#c8a96e] transition-colors duration-300">
                  <h3 className="font-barlow font-bold text-lg text-[#1a3a6b] mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{project.location}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            href="/portfolio"
            className="inline-block px-8 py-3.5 border-2 border-[#1a3a6b] text-[#1a3a6b] hover:bg-[#1a3a6b] hover:text-white font-semibold tracking-wide transition-all duration-200 rounded-sm"
          >
            View Full Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
