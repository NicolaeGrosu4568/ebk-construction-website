"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Testimonial = {
  id: string;
  client_name: string;
  client_role: string | null;
  content: string;
  rating: number | null;
  published: boolean;
  submitted_by_client: boolean;
  created_at: string;
};

const emptyForm = {
  client_name: "",
  client_role: "",
  content: "",
  rating: 5,
  published: false,
};

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-xl transition-colors ${star <= value ? "text-[#c8a96e]" : "text-gray-200"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsAdminPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "live">("all");

  const fetchTestimonials = useCallback(async () => {
    const res = await fetch("/api/admin/testimonials");
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

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

  const openEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      client_name: t.client_name,
      client_role: t.client_role ?? "",
      content: t.content,
      rating: t.rating ?? 5,
      published: t.published,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editingId) {
      await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    await fetchTestimonials();
    setShowForm(false);
    setSaving(false);
  };

  const togglePublished = async (t: Testimonial) => {
    await fetch("/api/admin/testimonials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: t.id, published: !t.published }),
    });
    setTestimonials((prev) => prev.map((x) => x.id === t.id ? { ...x, published: !x.published } : x));
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTestimonials((prev) => prev.filter((x) => x.id !== id));
    setDeleteConfirm(null);
  };

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => router.push("/admin/dashboard")} className="text-gray-400 hover:text-[#1a3a6b] text-sm mb-6 flex items-center gap-2 transition-colors">
          ← Back to Dashboard
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-1">Manage</p>
            <h2 className="font-barlow font-bold text-3xl text-[#1a3a6b]">Testimonials</h2>
          </div>
          <button onClick={openNew} className="px-5 py-2.5 bg-[#1a3a6b] hover:bg-[#142d54] text-white text-sm font-semibold rounded-sm transition-all">
            + Add Testimonial
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-sm shadow-sm p-1 w-fit">
          {([
            { key: "all", label: "All", count: testimonials.length },
            { key: "pending", label: "Pending Approval", count: testimonials.filter(t => t.submitted_by_client && !t.published).length },
            { key: "live", label: "Live", count: testimonials.filter(t => t.published).length },
          ] as const).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === key ? "bg-[#1a3a6b] text-white" : "text-gray-400 hover:text-[#1a3a6b]"}`}
            >
              {label}
              {key === "pending" && count > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeTab === key ? "bg-[#c8a96e] text-white" : "bg-amber-100 text-amber-600"}`}>{count}</span>
              )}
              {key !== "pending" && <span className="opacity-60">{count}</span>}
            </button>
          ))}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-sm shadow-sm border-t-2 border-[#c8a96e] p-6 mb-8">
            <h3 className="font-barlow font-bold text-xl text-[#1a3a6b] mb-6">{editingId ? "Edit Testimonial" : "New Testimonial"}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Client Name *</label>
                  <input
                    value={form.client_name}
                    onChange={(e) => setForm((f) => ({ ...f, client_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b]"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Role / Company</label>
                  <input
                    value={form.client_role}
                    onChange={(e) => setForm((f) => ({ ...f, client_role: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b]"
                    placeholder="Homeowner, London"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Testimonial *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#1a3a6b] resize-none"
                  placeholder="What the client said about EBK Construction..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Rating</label>
                  <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
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
            </div>
            <div className="flex gap-3 pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={saving || !form.client_name || !form.content}
                className="px-5 py-2.5 bg-[#1a3a6b] hover:bg-[#142d54] disabled:opacity-50 text-white text-sm font-semibold rounded-sm transition-all"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add Testimonial"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-gray-200 text-gray-500 hover:text-[#1a3a6b] text-sm font-semibold rounded-sm transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* List */}
        {(() => {
          const filtered = testimonials.filter((t) => {
            if (activeTab === "pending") return t.submitted_by_client && !t.published;
            if (activeTab === "live") return t.published;
            return true;
          });
          return filtered.length === 0 ? (
            <div className="bg-white rounded-sm shadow-sm p-12 text-center border-t-2 border-[#c8a96e]">
              <p className="text-gray-400 text-sm uppercase tracking-widest">No testimonials yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((t) => (
                <div key={t.id} className={`bg-white rounded-sm shadow-sm p-5 ${t.submitted_by_client && !t.published ? "border-l-4 border-amber-400" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-semibold text-[#1a3a6b] text-sm">{t.client_name}</p>
                        {t.client_role && <span className="text-xs text-gray-400">{t.client_role}</span>}
                        {t.rating && (
                          <span className="text-[#c8a96e] text-xs tracking-tight">{"★".repeat(t.rating)}</span>
                        )}
                        {t.submitted_by_client && !t.published && (
                          <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full">Pending Approval</span>
                        )}
                        {t.submitted_by_client && t.published && (
                          <span className="text-xs text-gray-300">via website</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">"{t.content}"</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button
                        onClick={() => togglePublished(t)}
                        className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${t.published ? "bg-green-100 text-green-700" : t.submitted_by_client ? "bg-amber-500 text-white hover:bg-amber-600" : "bg-gray-100 text-gray-400"}`}
                      >
                        {t.published ? "Live" : t.submitted_by_client ? "Approve" : "Draft"}
                      </button>
                      <button onClick={() => openEdit(t)} className="text-xs text-gray-400 hover:text-[#1a3a6b] font-medium transition-colors px-2 py-1">Edit</button>
                      {deleteConfirm === t.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-red-500">Delete?</span>
                          <button onClick={() => handleDelete(t.id)} className="text-xs text-red-500 font-bold hover:text-red-700">Yes</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-400">No</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(t.id)} className="text-xs text-gray-300 hover:text-red-400 font-medium transition-colors px-2 py-1">Delete</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </main>
  );
}
