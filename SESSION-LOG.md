## 2026-05-09 - Faza 8 completă: Admin panel toate modulele

LUCRAT:
- Admin header: logo alb + "Admin Panel" cu gradient shimmer effect
- `/admin/enquiries`: inbox mesaje, filtre All/Unread/Archived, mark-as-read la deschidere
- `/admin/portfolio`: manager proiecte + upload imagini Supabase Storage + right-click cover
- `/admin/testimonials`: manager cu star rating + toggle live/draft
- `/admin/blog`: manager posts cu Markdown editor, upload cover, filtre, slugify auto
- Dashboard stats conectate la API routes (nu direct Supabase client) — fix pentru RLS
- 5 testimoniale placeholder inserate în DB (James Whitfield, Sarah Mitchell, David Okafor, Natalie Brewer, Nicolae Grosu)
- Fix: `SUPABASE_SERVICE_ROLE_KEY` corectat (JWT legacy format din Supabase Legacy API Keys tab)

DECIZII:
- Toate citirile admin merg prin `/api/admin/*` cu `createServiceClient()` (bypass RLS)
- Testimonials component pe site arată fallback hardcodat dacă nu sunt publicate în DB

DE FĂCUT:
- [ ] Faza 9: Privacy Policy + Terms & Conditions pages
- [ ] Faza 10: SEO (sitemap.xml, robots.txt, JSON-LD LocalBusiness), GA4, Cookie Banner
- [ ] Faza 11: Deploy Vercel + domeniu ebkconstruction.co.uk
- [ ] Blog public page `/blog` + `/blog/[slug]` (citire din DB, render Markdown)

---

## 2026-05-06 - Portfolio, Contact, Resend setup, audit PRD

LUCRAT:
- Pagina Portfolio completă: 3 proiecte reale, lightbox cu navigare, zoom-out hover
- Imagini reale Rosewood (5 poze noi) și Loro Piana (5 poze) copiate și optimizate
- Pagina Contact completă: formular, detalii contact, WhatsApp CTA, API route
- Setup Resend început: domeniu ebkconstruction.co.uk adăugat, DNS la 123 Reg (Eduard)
- Audit PRD vs review arhitect — toate punctele arhitectului sunt în PRD

DECIZII:
- Resend folosește contul lui Nicolae, nu cont separat Eduard
- Domeniu la 123 Reg — Eduard trebuie să dea acces DNS sau credențiale

DE FĂCUT:
- [ ] Faza 4: Supabase setup — tabele contact_submissions, testimonials, blog_posts + RLS
- [ ] Faza 5: Portofoliu dinamic din Supabase + Blog pagini publice
- [ ] Faza 6: Resend integrat în route.ts + validare Zod + rate limiting (după DNS Eduard)
- [ ] Faza 7: Autentificare admin (Supabase Auth)
- [ ] Faza 8: Admin dashboard — portofoliu, contact inbox, testimoniale, blog
- [ ] Faza 9: Privacy Policy + Terms & Conditions
- [ ] Faza 10: sitemap.xml + robots.txt + JSON-LD LocalBusiness + OG image 1200×630 + Cookie banner + GA4
- [ ] Faza 11: Deploy Vercel + domeniu ebkconstruction.co.uk
- [ ] Testimoniale: decizie — eliminate sau "Coming Soon" (nu sunt reale)

---

## 2026-05-05 - Hero slideshow + logo fix + culori

LUCRAT:
- Hero înlocuit cu slideshow Ken Burns (5 poze reale Rosewood Hotel)
- Zoom in/out alternativ + crossfade 1.2s între tranziții + slide indicators
- Logo fix: logo-white.png înlocuit cu varianta cu alpha channel real
- Testat și revenit la culoarea accent auriu #c8a96e (albastrul nu s-a potrivit)
- Push pe GitHub — repo la zi

DECIZII:
- Culoarea accent rămâne auriu #c8a96e (albastrul a fost testat și respins)
- Hero slideshow din poze reale în loc de stock photo/video

DE FĂCUT:
- [ ] Services cards — înlocuiește iconițele cu imagini de fundal (ca Featured Projects)
- [ ] Revizuire culori site — schema de culori nu se combină bine, de rafinat
- [ ] Pagina About
- [ ] Pagina Services
- [ ] Pagina Portfolio
- [ ] Pagina Contact + form
- [ ] Pagini legale Privacy Policy + T&C
- [ ] Faza 4: Supabase setup (tabele, RLS, Storage)

---

## 2026-05-05 - Faza 2 setup proiect completat

LUCRAT:
- Creat proiect Next.js 16 + TypeScript + Tailwind CSS 4
- Instalat dependinte: framer-motion, zod, @supabase/ssr, resend, react-hook-form
- Copiat 4 variante logo EBK în /public (optimizate ~82-459KB)
- Configurat fonturi: Barlow Condensed (headings) + Inter (body)
- Configurat culori brand: #1a3a6b, #2d2d2d, #c8a96e
- Creat .env.local template cu toate variabilele necesare
- Build OK, commit initial făcut

DECIZII:
- Next.js 16 (a apărut versiunea nouă față de 15 planificat) — folosim cea mai nouă
- Logo-urile originale (0.6-2.2MB) optimizate cu sips la 82-459KB

DE FĂCUT:
- [ ] Faza 3: UI public static (Navbar, Hero, Services, Portfolio preview, Footer)
- [ ] FloatingCTA (WhatsApp + Call button)
- [ ] Creare repository GitHub + push

---
