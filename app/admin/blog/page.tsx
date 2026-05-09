"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  published: false,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function BlogAdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft">("all");
  const [uploadingCover, setUploadingCover] = useState(false);

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleLogout = async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      cover_image_url: post.cover_image_url ?? "",
      published: post.published,
    });
    setShowForm(true);
  };

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: editingId ? f.slug : slugify(title),
    }));
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) return;
    setSaving(true);
    if (editingId) {
      await fetch("/api/admin/blog", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    await fetchPosts();
    setShowForm(false);
    setSaving(false);
  };

  const togglePublished = async (post: BlogPost) => {
    await fetch("/api/admin/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    });
    setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, published: !p.published } : p));
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const handleCoverUpload = async (file: File) => {
    setUploadingCover(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "blog");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const { url } = await res.json();
    if (url) setForm((f) => ({ ...f, cover_image_url: url }));
    setUploadingCover(false);
  };

  const filtered = posts.filter((p) => {
    if (activeTab === "published") return p.published;
    if (activeTab === "draft") return !p.published;
    return true;
  });

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div className="w-8 h-8 border-2 border-[#1a3a6b] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <header className="bg-[#1a3a6b] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex-1">
          <button onClick={() => router.push("/admin/dashboard")}>
            <Image src="/logo-white.png" alt="EBK Construction" width={200} height={60} className="object-contain" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm tracking-[0.3em] uppercase font-bold" style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.6) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Admin Panel</p>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <button onClick={handleLogout} className="px-4 py-2 border border-white/20 hover:border-white text-white text-sm font-medium transition-all rounded-sm">Sign Out</button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => router.push("/admin/dashboard")} className="text-gray-400 hover:text-[#1a3a6b] text-sm mb-6 flex items-center gap-2 transition-colors">
          ← Back to Dashboard
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-1">Manage</p>
            <h2 className="font-barlow font-bold text-3xl text-[#1a3a6b]">News Posts</h2>
          </div>
          <button onClick={openNew} className="px-5 py-2.5 bg-[#1a3a6b] hover:bg-[#142d54] text-white text-sm font-semibold rounded-sm transition-all">
            + New Post
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-sm shadow-sm p-1 w-fit">
          {(["all", "published", "draft"] as const).map((tab) => {
            const count = tab === "all" ? posts.length : tab === "published" ? posts.filter(p => p.published).length : posts.filter(p => !p.published).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${activeTab === tab ? "bg-[#1a3a6b] text-white" : "text-gray-400 hover:text-[#1a3a6b]"}`}
              >
                {tab} <span className="ml-1 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-sm shadow-sm border-t-2 border-[#c8a96e] p-6 mb-8">
            <h3 className="font-barlow font-bold text-xl text-[#1a3a6b] mb-6">{editingId ? "Edit Post" : "New Post"}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Title *</label>
                  <input
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b]"
                    placeholder="My Blog Post Title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Slug *</label>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] font-mono"
                    placeholder="my-blog-post-title"
                  />
                  <p className="text-xs text-gray-300 mt-1">URL: /news/{form.slug || "..."}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Excerpt</label>
                <input
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b]"
                  placeholder="Short description shown in news listing..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Content (Markdown)</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] resize-y font-mono"
                  placeholder={`## Introduction\n\nWrite your post content here using **Markdown**.\n\n- Bullet points work\n- As do **bold** and *italic*`}
                />
                <p className="text-xs text-gray-300 mt-1">Supports Markdown: **bold**, *italic*, ## headings, - lists</p>
              </div>

              {/* Cover image */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Cover Image</label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      value={form.cover_image_url}
                      onChange={(e) => setForm((f) => ({ ...f, cover_image_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b]"
                      placeholder="https://... or upload below"
                    />
                  </div>
                  <label className={`px-4 py-2 border border-gray-200 text-gray-500 hover:border-[#1a3a6b] hover:text-[#1a3a6b] text-sm font-medium rounded-sm transition-all cursor-pointer whitespace-nowrap ${uploadingCover ? "opacity-50" : ""}`}>
                    {uploadingCover ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingCover}
                      onChange={(e) => { const file = e.target.files?.[0]; if (file) handleCoverUpload(file); }}
                    />
                  </label>
                </div>
                {form.cover_image_url && (
                  <div className="mt-2 relative w-full aspect-video max-w-sm rounded-sm overflow-hidden border border-gray-100">
                    <Image src={form.cover_image_url} alt="Cover preview" fill className="object-cover" unoptimized />
                    <button
                      onClick={() => setForm((f) => ({ ...f, cover_image_url: "" }))}
                      className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black/80"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Published</label>
                <button
                  onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${form.published ? "bg-[#1a3a6b]" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.published ? "left-6" : "left-1"}`} />
                </button>
                <span className="text-sm text-gray-500">{form.published ? "Live" : "Draft"}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.slug}
                className="px-5 py-2.5 bg-[#1a3a6b] hover:bg-[#142d54] disabled:opacity-50 text-white text-sm font-semibold rounded-sm transition-all"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Publish Post"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-gray-200 text-gray-500 hover:text-[#1a3a6b] text-sm font-semibold rounded-sm transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-sm shadow-sm p-12 text-center border-t-2 border-[#c8a96e]">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">No posts yet</p>
            <p className="text-gray-300 text-xs">Click "+ New Post" to write your first blog post</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((post) => (
              <div key={post.id} className="bg-white rounded-sm shadow-sm p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1 min-w-0">
                    {post.cover_image_url && (
                      <div className="relative w-20 h-14 flex-shrink-0 rounded-sm overflow-hidden border border-gray-100">
                        <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" unoptimized />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1a3a6b] text-sm mb-0.5">{post.title}</p>
                      <p className="text-xs text-gray-300 font-mono mb-1">/news/{post.slug}</p>
                      {post.excerpt && <p className="text-xs text-gray-400 line-clamp-1">{post.excerpt}</p>}
                      <p className="text-xs text-gray-300 mt-1">{formatDate(post.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => togglePublished(post)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}
                    >
                      {post.published ? "Live" : "Draft"}
                    </button>
                    <button onClick={() => openEdit(post)} className="text-xs text-gray-400 hover:text-[#1a3a6b] font-medium transition-colors px-2 py-1">Edit</button>
                    {deleteConfirm === post.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-500">Delete?</span>
                        <button onClick={() => handleDelete(post.id)} className="text-xs text-red-500 font-bold hover:text-red-700">Yes</button>
                        <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-400">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(post.id)} className="text-xs text-gray-300 hover:text-red-400 font-medium transition-colors px-2 py-1">Delete</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
