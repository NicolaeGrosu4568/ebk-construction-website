"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  read: boolean;
  archived: boolean;
  created_at: string;
};

export default function EnquiriesPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");

  const fetchSubmissions = useCallback(async () => {
    const res = await fetch("/api/admin/enquiries");
    if (!res.ok) {
      console.error("Failed to fetch enquiries");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setSubmissions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const markRead = async (id: string) => {
    await fetch("/api/admin/enquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, read: true }) });
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, read: true } : s));
  };

  const markArchived = async (id: string, archived: boolean) => {
    await fetch("/api/admin/enquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, archived }) });
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, archived } : s));
    if (archived) setSelected(null);
  };

  const handleSelect = async (id: string) => {
    setSelected(selected === id ? null : id);
    const sub = submissions.find((s) => s.id === id);
    if (sub && !sub.read) await markRead(id);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const filtered = submissions.filter((s) => {
    if (filter === "unread") return !s.read && !s.archived;
    if (filter === "archived") return s.archived;
    return !s.archived;
  });

  const unreadCount = submissions.filter((s) => !s.read && !s.archived).length;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
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
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Admin Panel</p>
        </div>
        <div className="flex-1 flex items-center justify-end gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white/20 hover:border-white text-white text-sm font-medium transition-all rounded-sm"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back + Title */}
        <button onClick={() => router.push("/admin/dashboard")} className="text-gray-400 hover:text-[#1a3a6b] text-sm mb-6 flex items-center gap-2 transition-colors">
          ← Back to Dashboard
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-1">Inbox</p>
            <h2 className="font-barlow font-bold text-3xl text-[#1a3a6b]">
              Enquiries
              {unreadCount > 0 && (
                <span className="ml-3 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-[#c8a96e] text-white rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h2>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {(["all", "unread", "archived"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all ${
                  filter === f
                    ? "bg-[#1a3a6b] text-white"
                    : "bg-white text-gray-400 hover:text-[#1a3a6b] border border-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-sm shadow-sm p-12 text-center border-t-2 border-[#c8a96e]">
            <p className="text-gray-400 text-sm uppercase tracking-widest">No enquiries found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((sub) => (
              <div key={sub.id} className={`bg-white rounded-sm shadow-sm border-l-4 transition-all ${!sub.read ? "border-[#c8a96e]" : "border-transparent"}`}>
                {/* Row */}
                <button
                  onClick={() => handleSelect(sub.id)}
                  className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {!sub.read && <span className="w-2 h-2 rounded-full bg-[#c8a96e] flex-shrink-0" />}
                      <p className={`text-sm ${!sub.read ? "font-bold text-[#1a3a6b]" : "font-medium text-gray-700"}`}>{sub.name}</p>
                      {sub.service && (
                        <span className="text-xs bg-[#1a3a6b]/10 text-[#1a3a6b] px-2 py-0.5 rounded-sm font-medium">{sub.service}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{sub.message}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">{formatDate(sub.created_at)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{sub.email}</p>
                  </div>
                  <span className="text-gray-300 text-sm">{selected === sub.id ? "▲" : "▼"}</span>
                </button>

                {/* Expanded */}
                {selected === sub.id && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Name</p>
                        <p className="text-sm text-gray-800 font-medium">{sub.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                        <a href={`mailto:${sub.email}`} className="text-sm text-[#1a3a6b] hover:underline font-medium">{sub.email}</a>
                      </div>
                      {sub.phone && (
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                          <a href={`tel:${sub.phone}`} className="text-sm text-[#1a3a6b] hover:underline font-medium">{sub.phone}</a>
                        </div>
                      )}
                      {sub.service && (
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Service</p>
                          <p className="text-sm text-gray-800 font-medium">{sub.service}</p>
                        </div>
                      )}
                    </div>
                    <div className="mb-5">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Message</p>
                      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-sm p-4">{sub.message}</p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={`mailto:${sub.email}?subject=Re: Your enquiry — EBK Construction`}
                        className="px-4 py-2 bg-[#1a3a6b] hover:bg-[#142d54] text-white text-sm font-semibold rounded-sm transition-all"
                      >
                        Reply by Email
                      </a>
                      {sub.phone && (
                        <a
                          href={`tel:${sub.phone}`}
                          className="px-4 py-2 bg-white border border-[#1a3a6b] text-[#1a3a6b] text-sm font-semibold rounded-sm hover:bg-[#1a3a6b] hover:text-white transition-all"
                        >
                          Call
                        </a>
                      )}
                      {!sub.archived ? (
                        <button
                          onClick={() => markArchived(sub.id, true)}
                          className="ml-auto px-4 py-2 border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400 text-sm font-semibold rounded-sm transition-all"
                        >
                          Archive
                        </button>
                      ) : (
                        <button
                          onClick={() => markArchived(sub.id, false)}
                          className="ml-auto px-4 py-2 border border-gray-200 text-gray-400 hover:border-[#1a3a6b] hover:text-[#1a3a6b] text-sm font-semibold rounded-sm transition-all"
                        >
                          Unarchive
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
