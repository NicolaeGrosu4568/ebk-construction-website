"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  project_type: string | null;
  location: string | null;
  short_description: string | null;
  full_description: string | null;
  cover_image_url: string | null;
  images: string[];
  published: boolean;
  order_index: number;
};

const CATEGORIES = ["flooring", "joinery", "kitchens", "fit-out", "fire-doors", "carpentry"];
const PROJECT_TYPES = ["Private Residential", "Commercial Hospitality", "Luxury Retail", "Commercial Office", "HMO / Landlord", "Property Developer", "Other"];

const emptyForm = {
  title: "",
  slug: "",
  category: "fit-out",
  project_type: "",
  location: "",
  short_description: "",
  full_description: "",
  cover_image_url: "",
  published: false,
  order_index: 0,
  images: [] as string[],
};

export default function PortfolioAdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/admin/portfolio");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

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

  const openEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      category: p.category,
      project_type: p.project_type ?? "",
      location: p.location ?? "",
      short_description: p.short_description ?? "",
      full_description: p.full_description ?? "",
      cover_image_url: p.cover_image_url ?? "",
      published: p.published,
      order_index: p.order_index,
      images: p.images ?? [],
    });
    setNewImageUrl("");
    setShowForm(true);
  };

  const handleTitleChange = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setForm((f) => ({ ...f, title, slug: editingId ? f.slug : slug }));
  };

  const handleSave = async () => {
    setSaving(true);
    const cover = form.cover_image_url || (form.images.length > 0 ? form.images[0] : "");
    const payload = { ...form, cover_image_url: cover };
    if (editingId) {
      await fetch("/api/admin/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...payload }),
      });
    } else {
      await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    await fetchProjects();
    setShowForm(false);
    setSaving(false);
  };

  const togglePublished = async (p: Project) => {
    await fetch("/api/admin/portfolio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, published: !p.published }),
    });
    setProjects((prev) => prev.map((x) => x.id === p.id ? { ...x, published: !x.published } : x));
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProjects((prev) => prev.filter((x) => x.id !== id));
    setDeleteConfirm(null);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">
      <div className="w-8 h-8 border-2 border-[#1a3a6b] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
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
        <div className="flex-1 flex items-center justify-end gap-4">
          <button onClick={handleLogout} className="px-4 py-2 border border-white/20 hover:border-white text-white text-sm font-medium transition-all rounded-sm">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => router.push("/admin/dashboard")} className="text-gray-400 hover:text-[#1a3a6b] text-sm mb-6 flex items-center gap-2 transition-colors">
          ← Back to Dashboard
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-1">Manage</p>
            <h2 className="font-barlow font-bold text-3xl text-[#1a3a6b]">Portfolio Projects</h2>
          </div>
          <button
            onClick={openNew}
            className="px-5 py-2.5 bg-[#1a3a6b] hover:bg-[#142d54] text-white text-sm font-semibold rounded-sm transition-all"
          >
            + Add Project
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-sm shadow-sm border-t-2 border-[#c8a96e] p-6 mb-8">
            <h3 className="font-barlow font-bold text-xl text-[#1a3a6b] mb-6">
              {editingId ? "Edit Project" : "New Project"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b]"
                  placeholder="Rosewood Hotel London"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Slug *</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] font-mono"
                  placeholder="rosewood-hotel-london"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] bg-white"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Project Type</label>
                <select
                  value={form.project_type}
                  onChange={(e) => setForm((f) => ({ ...f, project_type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] bg-white"
                >
                  <option value="">— Select type —</option>
                  {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b]"
                  placeholder="London, UK"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  Cover Image URL
                  <span className="ml-2 text-gray-300 normal-case font-normal tracking-normal">(leave empty — auto-set from first gallery image)</span>
                </label>
                <input
                  value={form.cover_image_url}
                  onChange={(e) => setForm((f) => ({ ...f, cover_image_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b]"
                  placeholder="Auto from first gallery image"
                />
              </div>
              {/* Gallery Images */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Gallery Images</label>
                <div className="bg-[#f8f8f8] border border-gray-200 rounded-sm px-4 py-3 mb-3 text-xs text-gray-500 space-y-2">
                  <p className="font-semibold text-[#1a3a6b] uppercase tracking-wider mb-2">Image Guidelines</p>
                  <div className="flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-[#c8a96e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"/></svg>
                    <p><strong>Size:</strong> Minimum 1200×800px — landscape format preferred (wider than tall)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-[#c8a96e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <p><strong>Format:</strong> JPG or PNG — max 5MB per image</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-[#c8a96e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    <p><strong>Content:</strong> Finished work only — good lighting, no clutter, no people in frame</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-[#c8a96e] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <p><strong>First image</strong> becomes the project cover shown on the Portfolio page</p>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-gray-200">
                    <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    <p className="text-gray-400">Need image editing or resizing? Contact the site creator — <strong className="text-[#1a3a6b]">Nicolae Grosu</strong></p>
                  </div>
                </div>
                {form.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {form.images.map((url, i) => (
                      <div
                        key={i}
                        className={`relative group aspect-video cursor-pointer rounded-sm overflow-hidden ring-2 transition-all ${form.cover_image_url === url ? "ring-[#c8a96e]" : "ring-transparent"}`}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setForm((f) => ({ ...f, cover_image_url: url }));
                        }}
                      >
                        <img src={url} alt="" className="w-full h-full object-cover bg-gray-100" />
                        <button
                          onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, j) => j !== i), cover_image_url: f.cover_image_url === url ? (f.images[0] ?? "") : f.cover_image_url }))}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
                        >
                          ×
                        </button>
                        {form.cover_image_url === url && (
                          <span className="absolute bottom-1 left-1 text-xs bg-[#c8a96e] text-white px-1.5 py-0.5 rounded-sm font-semibold">Cover</span>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                          <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity text-center px-1 leading-tight">Right-click<br/>set cover</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    value={pendingFiles.length > 0 ? (pendingFiles.length === 1 ? pendingFiles[0].name : `${pendingFiles.length} files selected`) : newImageUrl}
                    readOnly={pendingFiles.length > 0}
                    onChange={(e) => { if (!pendingFiles.length) setNewImageUrl(e.target.value); }}
                    className={`flex-1 px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] ${pendingFiles.length > 0 ? "bg-gray-50 text-gray-500" : ""}`}
                    placeholder="Select images or paste URL"
                  />
                  {pendingFiles.length > 0 ? (
                    <>
                      <button
                        onClick={async () => {
                          setUploading(true);
                          const folder = editingId ?? "new";
                          for (const file of pendingFiles) {
                            const fd = new FormData();
                            fd.append("file", file);
                            fd.append("folder", folder);
                            const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                            const data = await res.json();
                            if (data.url) setForm((f) => ({ ...f, images: [...f.images, data.url], cover_image_url: f.cover_image_url || data.url }));
                          }
                          setPendingFiles([]);
                          setUploading(false);
                        }}
                        disabled={uploading}
                        className="px-3 py-2 bg-[#1a3a6b] hover:bg-[#142d54] disabled:opacity-50 text-white text-sm rounded-sm transition-all"
                      >
                        {uploading ? "Uploading..." : "Upload"}
                      </button>
                      <button onClick={() => setPendingFiles([])} className="px-3 py-2 border border-gray-200 text-gray-400 hover:text-red-400 text-sm rounded-sm transition-all">✕</button>
                    </>
                  ) : (
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1a3a6b] hover:bg-[#142d54] text-white text-sm rounded-sm cursor-pointer transition-all">
                      + Add
                      <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden"
                        onChange={(e) => { const files = Array.from(e.target.files ?? []); if (files.length) setPendingFiles(files); e.target.value = ""; }}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">Prima imagine devine cover. Hover pe imagine → × pentru a șterge.</p>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Short Description</label>
                <textarea
                  value={form.short_description}
                  onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Full Description</label>
                <textarea
                  value={form.full_description}
                  onChange={(e) => setForm((f) => ({ ...f, full_description: e.target.value }))}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] resize-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400">Order Index</label>
                <input
                  type="number"
                  value={form.order_index}
                  onChange={(e) => setForm((f) => ({ ...f, order_index: parseInt(e.target.value) || 0 }))}
                  className="w-20 px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b]"
                />
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
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.slug}
                className="px-5 py-2.5 bg-[#1a3a6b] hover:bg-[#142d54] disabled:opacity-50 text-white text-sm font-semibold rounded-sm transition-all"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Project"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border border-gray-200 text-gray-500 hover:text-[#1a3a6b] text-sm font-semibold rounded-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Projects list */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-sm shadow-sm p-12 text-center border-t-2 border-[#c8a96e]">
            <p className="text-gray-400 text-sm uppercase tracking-widest">No projects yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="bg-white rounded-sm shadow-sm flex items-center gap-4 px-5 py-4">
                {p.cover_image_url ? (
                  <div className="w-16 h-12 rounded-sm overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={p.cover_image_url} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-12 rounded-sm bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-300 text-xs">No img</div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-[#1a3a6b] text-sm">{p.title}</p>
                    <span className="text-xs bg-[#1a3a6b]/10 text-[#1a3a6b] px-2 py-0.5 rounded-sm">{p.category}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{p.location ?? "—"}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => togglePublished(p)}
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                      p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {p.published ? "Live" : "Draft"}
                  </button>
                  <button
                    onClick={() => openEdit(p)}
                    className="text-xs text-gray-400 hover:text-[#1a3a6b] font-medium transition-colors px-2 py-1"
                  >
                    Edit
                  </button>
                  {deleteConfirm === p.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-500">Delete?</span>
                      <button onClick={() => handleDelete(p.id)} className="text-xs text-red-500 font-bold hover:text-red-700">Yes</button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-400 hover:text-gray-600">No</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(p.id)}
                      className="text-xs text-gray-300 hover:text-red-400 font-medium transition-colors px-2 py-1"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
