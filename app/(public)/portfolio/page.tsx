"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string | null;
  short_description: string | null;
  full_description: string | null;
  cover_image_url: string | null;
  images: string[];
  published: boolean;
  order_index: number;
};

function LightboxModal({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl px-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-4 text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors"
        >
          ESC / Close ✕
        </button>
        <div className="relative h-[70vh] rounded-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[current]}
                alt={`Image ${current + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized={images[current].startsWith("http")}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button onClick={prev} className="px-5 py-2 border border-white/20 hover:border-[#c8a96e] text-white/60 hover:text-[#c8a96e] text-sm font-medium tracking-wide transition-all rounded-sm">← Prev</button>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#c8a96e] scale-125" : "bg-white/30 hover:bg-white/60"}`} />
            ))}
          </div>
          <button onClick={next} className="px-5 py-2 border border-white/20 hover:border-[#c8a96e] text-white/60 hover:text-[#c8a96e] text-sm font-medium tracking-wide transition-all rounded-sm">Next →</button>
        </div>
        <p className="text-center text-white/40 text-xs mt-3 tracking-widest">{current + 1} / {images.length}</p>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const [heroImage, setHeroImage] = useState("/portfolio/rw-new-1.jpg");

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((r) => r.json())
      .then((data: Project[]) => {
        const published = data.filter((p) => p.published);
        setProjects(published);
        if (published.length > 0 && published[0].cover_image_url) {
          setHeroImage(published[0].cover_image_url);
        }
      });
  }, []);

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ images, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  return (
    <main className="pt-28">

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <Image src={heroImage} alt="EBK Construction Portfolio" fill className="object-cover scale-105" priority unoptimized={heroImage.startsWith("http")} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a6b]/80 via-[#1a3a6b]/65 to-[#1a3a6b]/75" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center justify-center gap-4 mb-5">
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="block h-px w-12 bg-[#c8a96e] origin-right" />
            <span className="text-[#c8a96e] font-semibold tracking-[0.25em] uppercase text-sm">Our Work</span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="block h-px w-12 bg-[#c8a96e] origin-left" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl">Portfolio</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }} className="text-white/70 text-lg mt-4 max-w-xl mx-auto">
            A selection of projects that define what we do — and how we do it.
          </motion.p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-8 bg-white">
        {projects.map((project, i) => {
          const cover = project.cover_image_url ?? "/portfolio/rw-new-1.jpg";
          const extraImages = (project.images ?? []).filter((img) => img !== cover);
          const allImages = [cover, ...extraImages];
          const thumbs = extraImages.slice(0, 4);

          return (
            <div key={project.id} id={project.slug} className={`py-20 ${i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }} className="mb-12">
                  <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-2">0{i + 1} — {project.category}</p>
                  <h2 className="font-barlow font-bold text-3xl sm:text-4xl text-[#1a3a6b] mb-2">{project.title}</h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-0.5 bg-[#c8a96e]" />
                    <p className="text-gray-400 text-sm tracking-wide">{project.location}</p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
                  <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.7, ease: "easeOut" }}>
                    <div className="group relative h-[480px] rounded-sm overflow-hidden shadow-xl cursor-pointer" onClick={() => openLightbox(allImages, 0)}>
                      <Image src={cover} alt={project.title} fill className="object-cover scale-150 group-hover:scale-100 transition-transform duration-[1500ms] ease-in-out" sizes="(max-width: 1024px) 100vw, 60vw" unoptimized={cover.startsWith("http")} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-semibold tracking-widest uppercase bg-black/30 px-4 py-2 rounded-sm">View Gallery</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.7, ease: "easeOut" }} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      {thumbs.map((img, j) => (
                        <div key={j} className="group relative rounded-sm overflow-hidden shadow-md cursor-pointer" style={{ height: "140px" }} onClick={() => openLightbox(allImages, j + 1)}>
                          <Image src={img} alt={`${project.title} ${j + 1}`} fill className="object-cover scale-150 group-hover:scale-100 transition-transform duration-[1200ms] ease-in-out" sizes="(max-width: 1024px) 50vw, 20vw" unoptimized={img.startsWith("http")} />
                          <div className="absolute inset-0 bg-[#1a3a6b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                    <div className="bg-white rounded-sm p-6 shadow-sm border-l-2 border-[#c8a96e]">
                      <p className="text-gray-600 text-sm leading-relaxed">{project.full_description}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1a3a6b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}>
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-4">Start Your Project</p>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-white mb-6">Ready to Create Something Exceptional?</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">Every project in our portfolio started with a conversation. Get in touch to discuss yours.</p>
            <Link href="/contact" className="inline-block px-10 py-4 bg-[#c8a96e] hover:bg-[#b8943a] text-white font-semibold tracking-wide transition-all duration-200 rounded-sm shadow-lg">Get a Free Quote</Link>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && <LightboxModal images={lightbox.images} startIndex={lightbox.index} onClose={closeLightbox} />}
      </AnimatePresence>

    </main>
  );
}
