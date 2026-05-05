"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">
            Client Feedback
          </p>
          <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-[#1a3a6b] mb-8">
            What Our Clients Say
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-sm py-16 px-8">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-gray-400 text-lg italic">
              Client testimonials coming soon.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              We're proud of our work — and we let it speak for itself.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
