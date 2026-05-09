"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    // Fire GA pageview if GA loaded
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1a3a6b] border-t-2 border-[#c8a96e] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
          We use cookies to understand how visitors use our website and to improve your experience.
          By clicking <strong className="text-white">Accept</strong>, you consent to our use of analytics cookies.
          See our{" "}
          <a href="/privacy-policy" className="text-[#c8a96e] hover:underline font-medium">Privacy Policy</a>{" "}
          for details.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 border border-white/20 hover:border-white text-white/70 hover:text-white text-sm font-medium rounded-sm transition-all"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 bg-[#c8a96e] hover:bg-[#b8943a] text-white text-sm font-semibold rounded-sm transition-all"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
