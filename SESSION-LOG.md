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
- [ ] Pagina About
- [ ] Pagina Services
- [ ] Pagina Portfolio
- [ ] Pagina Contact + form
- [ ] Pagini legale Privacy Policy + T&C

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
