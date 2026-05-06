"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const contactDetails = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    label: "Phone",
    value: "+44 7975 797959",
    href: "tel:+447975797959",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "info@ebkconstruction.co.uk",
    href: "mailto:info@ebkconstruction.co.uk",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    label: "Address",
    value: "8 Stanwyck Gardens, Romford, RM3 7JU",
    href: null,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    label: "Coverage",
    value: "Based in East London, operating UK-wide",
    href: null,
  },
];

const services = [
  "Flooring",
  "Bespoke Joinery",
  "Kitchens & Wardrobes",
  "Interior Fit-Out",
  "Fire Doors",
  "Carpentry & Construction",
  "Other",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <main className="pt-28">

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <Image src="/portfolio/rw-new-3.jpg" alt="Contact EBK Construction" fill className="object-cover scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a6b]/80 via-[#1a3a6b]/65 to-[#1a3a6b]/75" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="block h-px w-12 bg-[#c8a96e] origin-right" />
            <span className="text-[#c8a96e] font-semibold tracking-[0.25em] uppercase text-sm">Get In Touch</span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="block h-px w-12 bg-[#c8a96e] origin-left" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/70 text-lg mt-4 max-w-xl mx-auto"
          >
            Tell us about your project and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16">

            {/* Left — contact info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">Contact Details</p>
              <h2 className="font-barlow font-bold text-3xl sm:text-4xl text-[#1a3a6b] mb-4">
                Let's Discuss Your Project
              </h2>
              <div className="w-10 h-0.5 bg-[#c8a96e] mb-8" />
              <p className="text-gray-500 leading-relaxed mb-10">
                Whether you have a detailed brief or just an idea, we're happy to talk it through. Get in touch for a free, no-obligation quote — we'll assess your requirements and provide a clear, transparent proposal.
              </p>

              <div className="space-y-6">
                {contactDetails.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-[#1a3a6b] flex items-center justify-center text-[#c8a96e]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-gray-700 hover:text-[#1a3a6b] transition-colors font-medium">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/447975797959"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm tracking-wide transition-all rounded-sm shadow-md"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Message Us on WhatsApp
              </a>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[#f8f8f8] rounded-sm p-8 sm:p-10 shadow-sm">
                <h3 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-2">Request a Free Quote</h3>
                <p className="text-gray-500 text-sm mb-8">Fill in the form below and we'll be in touch within 24 hours.</p>

                {formState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#1a3a6b] flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-[#c8a96e]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <h4 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-3">Message Sent!</h4>
                    <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
                      Thank you for getting in touch. We'll review your enquiry and get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm"
                        />
                      </div>
                    </div>

                    {/* Phone + Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+44 7700 000000"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Service Required</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-800 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm appearance-none"
                        >
                          <option value="">Select a service...</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Project Details *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project — what you need, the location, approximate size, and any specific requirements..."
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm resize-none"
                      />
                    </div>

                    {formState === "error" && (
                      <p className="text-red-500 text-sm">Something went wrong. Please try again or contact us directly by phone or email.</p>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full py-4 bg-[#1a3a6b] hover:bg-[#142d54] disabled:opacity-60 text-white font-semibold tracking-wide transition-all duration-200 rounded-sm text-sm shadow-md"
                    >
                      {formState === "submitting" ? "Sending..." : "Send Enquiry"}
                    </button>

                    <p className="text-center text-gray-400 text-xs">
                      We respond to all enquiries within 24 hours. Your details are kept confidential.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map / area strip */}
      <section className="py-16 bg-[#1a3a6b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: "Response Time", value: "Within 24 Hours" },
              { label: "Free Quotes", value: "No Obligation" },
              { label: "Coverage", value: "London & UK-Wide" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-barlow font-bold text-2xl text-[#c8a96e] mb-1">{item.value}</p>
                <p className="text-white/50 text-xs uppercase tracking-widest">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
