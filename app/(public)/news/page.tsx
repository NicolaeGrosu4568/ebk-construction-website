"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
};

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data: any[]) => {
        setPosts(Array.isArray(data) ? data.filter((p) => p.published) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Hero */}
      <section className="bg-[#1a3a6b] pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-3">Latest Updates</p>
            <h1 className="font-barlow font-bold text-5xl sm:text-6xl text-white mb-5">News</h1>
            <p className="text-white/90 text-xl max-w-xl leading-relaxed">
              Project updates, company news, and insights from EBK Construction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#1a3a6b] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No news yet — check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full"
                >
                  <Link href={`/news/${post.slug}`} className="group flex flex-col bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    {post.cover_image_url ? (
                      <div className="aspect-video overflow-hidden rounded-t-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-white rounded-t-sm flex items-center justify-center border-b border-gray-100">
                        <img src="/logo-full.png" alt="EBK Construction" className="w-44 object-contain" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-[#c8a96e] text-xs font-semibold uppercase tracking-widest mb-2">
                        {formatDate(post.created_at)}
                      </p>
                      <h2 className="font-barlow font-bold text-xl text-[#1a3a6b] mb-3 group-hover:text-[#c8a96e] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                      )}
                      <p className="mt-4 text-sm font-semibold text-[#1a3a6b] group-hover:text-[#c8a96e] transition-colors">
                        Read more →
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
