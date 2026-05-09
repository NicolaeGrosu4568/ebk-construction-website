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
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          EBK Construction LTD · Admin Access Only
        </p>
      </div>
    </main>
  );
}
