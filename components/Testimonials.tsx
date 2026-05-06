"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "James Whitfield",
    role: "Private Homeowner",
    location: "Belgravia, London",
    rating: 5,
    text: "EBK transformed our ground floor completely. The bespoke joinery they produced for our living room is exceptional — every detail was considered and the finish is flawless. They worked cleanly, communicated throughout, and delivered exactly on time. Wouldn't hesitate to use them again.",
  },
  {
    name: "Sarah Mitchell",
    role: "Project Manager",
    location: "Commercial Fit-Out, City of London",
    rating: 5,
    text: "We brought EBK in on a tight programme for a commercial refurbishment and they delivered without a single issue. Professional team, great attention to detail, and they understood exactly what standard was expected. The flooring and partitioning work was outstanding.",
  },
  {
    name: "David Okafor",
    role: "Property Developer",
    location: "East London",
    rating: 5,
    text: "I've worked with a lot of contractors over the years and EBK stand out. They're reliable, skilled, and their pricing is genuinely transparent — no surprises on the final invoice. The fire door installation across our HMO portfolio was completed to a high standard and all fully compliant.",
  },
  {
    name: "Natalie Brewer",
    role: "Interior Designer",
    location: "Kensington, London",
    rating: 5,
    text: "As a designer, I need tradespeople who can work to exacting specifications and actually deliver. EBK Construction did exactly that. The bespoke cabinetry they built for my client was crafted beautifully — perfect tolerances, immaculate finish. My clients were delighted.",
  },
  {
    name: "Nicolae Grosu",
    role: "Director, Earn G Ltd",
    location: "Milton Keynes",
    rating: 5,
    text: "We've worked alongside EBK Construction on several commercial projects and the quality of their work is consistently excellent. Reliable, skilled, and easy to work with — they understand what's required on a professional site and they deliver it every time. A contractor we trust completely.",
  },
];

export default function Testimonials() {
  return (
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
            Client Feedback
          </p>
          <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-[#1a3a6b] mb-5">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            We build lasting relationships as well as lasting spaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-sm shadow-md p-8 border-l-4 border-[#c8a96e] flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} className="text-[#c8a96e] text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 leading-relaxed italic">"{t.text}"</p>

              {/* Author */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="font-barlow font-bold text-[#1a3a6b] text-base">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.role} — {t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
