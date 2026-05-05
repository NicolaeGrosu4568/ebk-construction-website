"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="bg-[#1a3a6b] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-white mb-5">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Get in touch today for a free, no-obligation quote. We'll discuss
            your requirements and provide a clear, competitive proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#c8a96e] hover:bg-[#b8943a] text-white font-semibold tracking-wide transition-all duration-200 rounded-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Contact Us Today
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="px-8 py-4 border-2 border-white/50 hover:border-white text-white font-semibold tracking-wide transition-all duration-200 rounded-sm hover:bg-white/10"
            >
              {SITE.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
