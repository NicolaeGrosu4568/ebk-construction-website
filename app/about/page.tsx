"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "London & UK", label: "Wide Coverage" },
  { value: "Res & Com", label: "Residential & Commercial" },
  { value: "£1k+", label: "Projects From" },
];

const values = [
  {
    title: "Craftsmanship First",
    body: "Every joint, every finish, every detail — executed to the highest standard. We take pride in work that lasts.",
  },
  {
    title: "Honest Communication",
    body: "Clear quotes, realistic timelines, no surprises. We keep you informed from first enquiry to final handover.",
  },
  {
    title: "Reliable Delivery",
    body: "We show up, we follow through, and we finish what we start. Our track record speaks for itself.",
  },
  {
    title: "Client-First Mindset",
    body: "Your project, your space, your trust. We treat every job with the care and respect it deserves.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-28">

      {/* Hero banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/about-hero.jpg"
          alt="EBK Construction craftsmanship"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a6b]/80 via-[#1a3a6b]/65 to-[#1a3a6b]/75" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block h-px w-12 bg-[#c8a96e] origin-right"
            />
            <span className="text-[#c8a96e] font-semibold tracking-[0.25em] uppercase text-sm">
              About EBK Construction
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block h-px w-12 bg-[#c8a96e] origin-left"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl"
          >
            Built on Experience.<br />Driven by Excellence.
          </motion.h1>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#1a3a6b] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <p className="font-barlow font-bold text-3xl text-[#c8a96e] mb-1">{stat.value}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">
                Who We Are
              </p>
              <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-[#1a3a6b] mb-8">
                London's Trusted Carpentry & Fit-Out Specialists
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  EBK Construction LTD is a London-based carpentry, joinery, and interior fit-out company,
                  founded in November 2024 by a team with over 20 years of combined industry experience.
                  We work with homeowners, landlords, developers, and commercial clients across London
                  and throughout the UK, delivering high-quality construction and finishing work on projects
                  of all sizes — from a single room renovation to a full commercial fit-out.
                </p>
                <p>
                  EBK was founded with a clear purpose: to bring genuine craftsmanship back to the building
                  industry. After years working across major residential and commercial projects in London,
                  our founders saw a gap in the market — skilled tradespeople who communicate well,
                  respect deadlines, and take real pride in the quality of their work. That's exactly what
                  EBK Construction was built to be.
                </p>
                <p>
                  We believe the best construction work is invisible — you notice the finished space,
                  not the process. That means clean workmanship, proper preparation, and an obsessive
                  attention to detail that runs through everything we do.
                </p>
                <p>
                  From your first enquiry to the final handover, we're committed to making the process
                  straightforward and stress-free. Clear quotes, honest timelines, and regular updates —
                  because having work done on your property requires trust, and we don't take that lightly.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-sm overflow-hidden shadow-xl"
            >
              <Image
                src="/portfolio/eaton-square.jpg"
                alt="EBK Construction — 80 Eaton Square"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a3a6b]/80 to-transparent p-6">
                <p className="text-white font-barlow font-bold text-lg">80 Eaton Square</p>
                <p className="text-[#c8a96e] text-sm">Bespoke Joinery — Belgravia, London</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">
              Our Promise
            </p>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-[#1a3a6b] mb-5">
              What We Stand For
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              From your first enquiry to the final handover, we're committed to making the process
              straightforward, transparent, and stress-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-sm shadow-sm border-t-2 border-[#c8a96e]"
              >
                <h3 className="font-barlow font-bold text-lg text-[#1a3a6b] mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1a3a6b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-4">
              Work With Us
            </p>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether you're planning a home renovation, a commercial fit-out, or a bespoke joinery
              commission — we'd love to hear about your project. Get in touch for a free, no-obligation quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#c8a96e] hover:bg-[#b8943a] text-white font-semibold tracking-wide transition-all duration-200 rounded-sm"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 border-2 border-white/40 hover:border-white text-white font-semibold tracking-wide transition-all duration-200 rounded-sm hover:bg-white/10"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
