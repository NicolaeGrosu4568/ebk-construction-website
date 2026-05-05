"use client";

import { motion } from "framer-motion";

const points = [
  {
    icon: "🏆",
    title: "Over 20 Years of Expertise",
    body: "With more than two decades of hands-on experience in carpentry, joinery, and interior fit-out, our team brings the kind of craftsmanship and technical knowledge that only time can build.",
  },
  {
    icon: "✅",
    title: "Quality You Can See and Feel",
    body: "We don't cut corners — ever. From the materials we select to the finishing touches we apply, every element of our work is delivered to the highest standard. We build spaces that last.",
  },
  {
    icon: "🤝",
    title: "Reliable, Professional Service",
    body: "We show up on time, communicate clearly, and finish what we start. No surprises, no hidden costs. You'll always know where your project stands.",
  },
  {
    icon: "💷",
    title: "Competitive Pricing, No Compromise",
    body: "Great workmanship shouldn't mean inflated costs. We offer transparent, competitive quotes with no hidden fees — so you get exceptional results that represent real value for money.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">
            Why EBK
          </p>
          <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-[#1a3a6b]">
            Why Choose Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex gap-5 bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl flex-shrink-0 mt-1">{point.icon}</div>
              <div>
                <h3 className="font-barlow font-bold text-xl text-[#1a3a6b] mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">{point.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
