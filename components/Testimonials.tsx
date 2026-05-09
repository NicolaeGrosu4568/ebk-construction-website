"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Testimonial = {
  id: string;
  client_name: string;
  client_role: string | null;
  content: string;
  rating: number | null;
  published?: boolean;
};

const fallback: Testimonial[] = [
  { id: "1", client_name: "James Whitfield", client_role: "Private Homeowner — Belgravia, London", content: "EBK transformed our ground floor completely. The bespoke joinery they produced for our living room is exceptional — every detail was considered and the finish is flawless. They worked cleanly, communicated throughout, and delivered exactly on time. Wouldn't hesitate to use them again.", rating: 5 },
  { id: "2", client_name: "Sarah Mitchell", client_role: "Project Manager — Commercial Fit-Out, City of London", content: "We brought EBK in on a tight programme for a commercial refurbishment and they delivered without a single issue. Professional team, great attention to detail, and they understood exactly what standard was expected. The flooring and partitioning work was outstanding.", rating: 5 },
  { id: "3", client_name: "David Okafor", client_role: "Property Developer — East London", content: "I've worked with a lot of contractors over the years and EBK stand out. They're reliable, skilled, and their pricing is genuinely transparent — no surprises on the final invoice. The fire door installation across our HMO portfolio was completed to a high standard and all fully compliant.", rating: 5 },
  { id: "4", client_name: "Natalie Brewer", client_role: "Interior Designer — Kensington, London", content: "As a designer, I need tradespeople who can work to exacting specifications and actually deliver. EBK Construction did exactly that. The bespoke cabinetry they built for my client was crafted beautifully — perfect tolerances, immaculate finish. My clients were delighted.", rating: 5 },
];

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`text-2xl transition-colors ${star <= (hovered || value) ? "text-[#c8a96e]" : "text-gray-200"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function LeaveReviewModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ client_name: "", client_role: "", content: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.client_name.trim() || !form.content.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white rounded-sm shadow-2xl w-full max-w-lg border-t-4 border-[#c8a96e] p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 text-xl leading-none transition-colors"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-4">★</div>
            <h3 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-3">Thank You!</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your review has been submitted and will appear on our site once approved. We really appreciate your feedback.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 bg-[#1a3a6b] text-white text-sm font-semibold rounded-sm hover:bg-[#142d54] transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-xs mb-2">Share Your Experience</p>
            <h3 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-6">Leave a Review</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Your Name *</label>
                  <input
                    value={form.client_name}
                    onChange={(e) => setForm((f) => ({ ...f, client_name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Role / Company</label>
                  <input
                    value={form.client_role}
                    onChange={(e) => setForm((f) => ({ ...f, client_role: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors"
                    placeholder="Homeowner, London"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Your Review *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors resize-none"
                  placeholder="Tell us about your experience with EBK Construction..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Rating</label>
                <StarPicker value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting || !form.client_name.trim() || !form.content.trim()}
                  className="px-6 py-2.5 bg-[#1a3a6b] hover:bg-[#142d54] disabled:opacity-50 text-white text-sm font-semibold rounded-sm transition-all"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-200 text-gray-500 hover:text-[#1a3a6b] text-sm font-semibold rounded-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallback);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then((data: Testimonial[]) => {
        const published = data.filter((t: Testimonial) => t.published);
        if (published.length > 0) setTestimonials(published);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">Client Feedback</p>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-[#1a3a6b] mb-5">What Our Clients Say</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">We build lasting relationships as well as lasting spaces.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-sm shadow-md p-8 border-l-4 border-[#c8a96e] flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating ?? 5 }).map((_, s) => (
                    <span key={s} className="text-[#c8a96e] text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic">"{t.content}"</p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="font-barlow font-bold text-[#1a3a6b] text-base">{t.client_name}</p>
                  {t.client_role && <p className="text-gray-400 text-sm">{t.client_role}</p>}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Leave a Review CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <p className="text-gray-400 text-sm mb-4">Worked with us? We'd love to hear from you.</p>
            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-[#1a3a6b] text-[#1a3a6b] font-semibold text-sm rounded-sm hover:bg-[#1a3a6b] hover:text-white transition-all duration-200"
            >
              <span className="text-[#c8a96e]">★</span>
              Leave a Review
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showReviewModal && <LeaveReviewModal onClose={() => setShowReviewModal(false)} />}
      </AnimatePresence>
    </>
  );
}
