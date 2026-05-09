"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Stats = {
  newEnquiries: number;
  portfolioProjects: number;
  testimonials: number;
  blogPosts: number;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ newEnquiries: 0, portfolioProjects: 0, testimonials: 0, blogPosts: 0 });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setEmail(session.user.email ?? null);

      const [enquiries, projects, testimonials, blogs] = await Promise.all([
        supabase.from("contact_submissions").select("id", { count: "exact" }).eq("read", false).eq("archived", false),
        supabase.from("projects").select("id", { count: "exact" }),
        supabase.from("testimonials").select("id", { count: "exact" }),
        supabase.from("blog_posts").select("id", { count: "exact" }),
      ]);

      setStats({
        newEnquiries: enquiries.count ?? 0,
        portfolioProjects: projects.count ?? 0,
        testimonials: testimonials.count ?? 0,
        blogPosts: blogs.count ?? 0,
      });

      setLoading(false);
    });
  }, [router]);

  const handleLogout = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }, [router]);

  const cards = [
    { label: "New Enquiries", icon: "✉", value: stats.newEnquiries, href: "/admin/enquiries", highlight: stats.newEnquiries > 0 },
    { label: "Portfolio Projects", icon: "🏗", value: stats.portfolioProjects, href: "/admin/portfolio", highlight: false },
    { label: "Testimonials", icon: "⭐", value: stats.testimonials, href: "/admin/testimonials", highlight: false },
    { label: "Blog Posts", icon: "📝", value: stats.blogPosts, href: "/admin/blog", highlight: false },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#1a3a6b] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <header className="bg-[#1a3a6b] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex-1">
          <Image src="/logo-white.png" alt="EBK Construction" width={200} height={60} className="object-contain" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p
            className="text-sm tracking-[0.3em] uppercase font-bold"
            style={{
              background: "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Admin Panel
          </p>
        </div>
        <div className="flex-1 flex items-center justify-end gap-4">
          <p className="text-white/60 text-sm hidden sm:block">{email}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white/20 hover:border-white text-white text-sm font-medium transition-all rounded-sm"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-2">Welcome back</p>
        <h2 className="font-barlow font-bold text-3xl text-[#1a3a6b] mb-10">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card) => (
            <button
              key={card.label}
              onClick={() => router.push(card.href)}
              className={`bg-white rounded-sm shadow-sm p-6 border-t-2 text-left hover:shadow-md hover:-translate-y-0.5 transition-all ${
                card.highlight ? "border-[#c8a96e]" : "border-gray-200 hover:border-[#c8a96e]"
              }`}
            >
              <p className="text-2xl mb-3">{card.icon}</p>
              <div className="flex items-baseline gap-2">
                <p className="font-barlow font-bold text-2xl text-[#1a3a6b]">{card.value}</p>
                {card.highlight && card.value > 0 && (
                  <span className="text-xs font-bold text-[#c8a96e] uppercase tracking-wider">New</span>
                )}
              </div>
              <p className="text-gray-400 text-sm mt-1">{card.label}</p>
            </button>
          ))}
        </div>

        {/* Quick nav */}
        <div className="bg-white rounded-sm shadow-sm p-6 border-t-2 border-[#c8a96e]">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Quick Access</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "View Enquiries", href: "/admin/enquiries" },
              { label: "Manage Portfolio", href: "/admin/portfolio" },
              { label: "Manage Testimonials", href: "/admin/testimonials" },
              { label: "Manage Blog", href: "/admin/blog" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => router.push(link.href)}
                className="px-4 py-2 border border-gray-200 hover:border-[#1a3a6b] hover:text-[#1a3a6b] text-gray-500 text-sm font-medium rounded-sm transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
