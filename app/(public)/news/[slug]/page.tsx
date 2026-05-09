"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  created_at: string;
};

export default function NewsPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then((data: Post[]) => {
        const found = data.find((p: any) => p.slug === slug && p.published);
        if (found) setPost(found);
        else setNotFound(true);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div className="w-8 h-8 border-2 border-[#1a3a6b] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (notFound) return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#c8a96e] font-semibold tracking-widest uppercase text-sm mb-4">Not Found</p>
        <h1 className="font-barlow font-bold text-4xl text-[#1a3a6b] mb-6">This article doesn't exist</h1>
        <Link href="/news" className="text-sm font-semibold text-[#1a3a6b] hover:text-[#c8a96e] transition-colors">
          ← Back to News
        </Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Hero */}
      <section className="bg-[#1a3a6b] pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/news" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
              ← Back to News
            </Link>
            <p className="text-[#c8a96e] text-xs font-semibold uppercase tracking-widest mb-4">
              {post && formatDate(post.created_at)}
            </p>
            <h1 className="font-barlow font-bold text-4xl sm:text-5xl text-white leading-tight">
              {post?.title}
            </h1>
            {post?.excerpt && (
              <p className="text-white/60 text-lg mt-4 leading-relaxed">{post.excerpt}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Cover image */}
      {post?.cover_image_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-video rounded-sm overflow-hidden shadow-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none
              prose-headings:font-barlow prose-headings:font-bold prose-headings:text-[#1a3a6b]
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-[#c8a96e] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#1a3a6b]
              prose-li:text-gray-600
              prose-hr:border-gray-200"
          >
            {post?.content ? (
              <ReactMarkdown>{post.content}</ReactMarkdown>
            ) : (
              <p className="text-gray-400 italic">No content yet.</p>
            )}
          </motion.div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a3a6b] hover:text-[#c8a96e] transition-colors"
            >
              ← Back to all news
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
