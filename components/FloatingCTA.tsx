"use client";

import { useState } from "react";
import { SITE } from "@/lib/constants";

export default function FloatingCTA() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      {/* Expanded buttons */}
      {expanded && (
        <>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 text-sm font-semibold whitespace-nowrap"
          >
            <span className="text-lg">💬</span>
            WhatsApp Us
          </a>
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-3 bg-[#1a3a6b] hover:bg-[#122a50] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 text-sm font-semibold whitespace-nowrap"
          >
            <span className="text-lg">📞</span>
            Call Us
          </a>
        </>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label="Contact options"
        className="w-14 h-14 bg-[#c8a96e] hover:bg-[#b8943a] text-white rounded-full shadow-xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-105"
      >
        {expanded ? "✕" : "💬"}
      </button>
    </div>
  );
}
