"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE, SERVICES, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2d2d2d] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo-white.png"
              alt="EBK Construction LTD"
              width={150}
              height={56}
              className="h-14 w-auto object-contain mb-5"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium carpentry, joinery and interior fit-out specialists.
              Based in East London, operating UK-wide.
            </p>
            {/* Social icons — placeholder slots */}
            <div className="flex gap-3">
              {[
                { label: "Instagram", icon: "📷", url: SITE.social.instagram },
                { label: "Facebook", icon: "📘", url: SITE.social.facebook },
                { label: "LinkedIn", icon: "💼", url: SITE.social.linkedin },
                { label: "TikTok", icon: "🎵", url: SITE.social.tiktok },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url || "#"}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-[#c8a96e] rounded-sm text-sm transition-colors duration-200"
                  onClick={!s.url ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-barlow font-bold text-base tracking-wide uppercase text-[#c8a96e] mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-barlow font-bold text-base tracking-wide uppercase text-[#c8a96e] mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-barlow font-bold text-base tracking-wide uppercase text-[#c8a96e] mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="hover:text-white transition-colors"
                >
                  📞 {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  ✉️ {SITE.email}
                </a>
              </li>
              <li className="leading-relaxed">
                📍 {SITE.address}
              </li>
              <li className="text-white/40 text-xs mt-2">
                {SITE.area}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} EBK Construction LTD. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
