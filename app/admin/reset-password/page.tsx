"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase sets the session from the URL hash automatically on mount
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError("Failed to update password. The link may have expired.");
      setLoading(false);
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/admin/login"), 3000);
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="EBK Construction" width={400} height={120} className="object-contain mx-auto w-full max-w-sm" />
          <p className="text-gray-400 text-sm mt-3 tracking-widest uppercase">Admin Panel</p>
        </div>

        <div className="bg-white rounded-sm shadow-lg p-8">
          <h1 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-2">New Password</h1>
          <p className="text-gray-400 text-sm mb-8">Choose a strong password for your account.</p>

          {done ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">Password updated successfully.</p>
              <p className="text-gray-400 text-xs mt-2">Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading || !ready}
                className="w-full py-3 bg-[#1a3a6b] hover:bg-[#142d54] disabled:opacity-60 text-white font-semibold tracking-wide transition-all rounded-sm text-sm"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>

              {!ready && (
                <p className="text-gray-400 text-xs text-center">Verifying reset link...</p>
              )}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
