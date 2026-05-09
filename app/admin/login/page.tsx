"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    setResetSent(true);
    setResetLoading(false);
  };

  if (resetMode) {
    return (
      <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image src="/logo.png" alt="EBK Construction" width={400} height={120} className="object-contain mx-auto w-full max-w-sm" />
            <p className="text-gray-400 text-sm mt-3 tracking-widest uppercase">Admin Panel</p>
          </div>

          <div className="bg-white rounded-sm shadow-lg p-8">
            <h1 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-2">Reset Password</h1>
            <p className="text-gray-400 text-sm mb-8">
              {resetSent
                ? "Check your email for the reset link."
                : "Enter your email and we'll send you a reset link."}
            </p>

            {!resetSent ? (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="info@ebkconstruction.co.uk"
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full py-3 bg-[#1a3a6b] hover:bg-[#142d54] disabled:opacity-60 text-white font-semibold tracking-wide transition-all rounded-sm text-sm"
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">Reset link sent to <strong>{resetEmail}</strong></p>
              </div>
            )}

            <button
              onClick={() => { setResetMode(false); setResetSent(false); setResetEmail(""); }}
              className="mt-6 w-full text-center text-sm text-gray-400 hover:text-[#1a3a6b] transition-colors"
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="EBK Construction" width={400} height={120} className="object-contain mx-auto w-full max-w-sm" />
          <p className="text-gray-400 text-sm mt-3 tracking-widest uppercase">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-sm shadow-lg p-8">
          <h1 className="font-barlow font-bold text-2xl text-[#1a3a6b] mb-2">Sign In</h1>
          <p className="text-gray-400 text-sm mb-8">Access the EBK Construction dashboard</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@ebkconstruction.co.uk"
                className="w-full px-4 py-3 border border-gray-200 rounded-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a3a6b] transition-colors text-sm"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1a3a6b] hover:bg-[#142d54] disabled:opacity-60 text-white font-semibold tracking-wide transition-all rounded-sm text-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <button
            onClick={() => setResetMode(true)}
            className="mt-5 w-full text-center text-sm text-gray-400 hover:text-[#1a3a6b] transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          EBK Construction LTD · Admin Access Only
        </p>
      </div>
    </main>
  );
}
