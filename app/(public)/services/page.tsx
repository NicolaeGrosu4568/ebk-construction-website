"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    slug: "flooring",
    title: "Flooring",
    subtitle: "Wood, Laminate & Vinyl Installation",
    image: "/services/flooring.jpg",
    short: "Premium flooring solutions installed to the highest standard — from classic hardwood to modern vinyl, we transform any space from the ground up.",
    full: "The right floor sets the tone for an entire space. At EBK Construction, we supply and install a full range of flooring solutions to suit every style, budget, and requirement. Whether you're updating a family home, refitting a rental property, or completing a commercial fit-out, our team delivers a finish that's built to last.\n\nWe work with engineered hardwood, solid wood, laminate, LVT (luxury vinyl tile), and sheet vinyl — advising you on the best option for your subfloor condition, foot traffic levels, and aesthetic goals. Every installation begins with thorough subfloor preparation to ensure a perfectly level, stable surface — because the best flooring starts before a single plank is laid.",
    bullets: [
      "Supply and installation of engineered wood, laminate, and vinyl flooring",
      "Subfloor preparation, levelling, and screeding",
      "Underfloor heating compatibility assessment",
      "Threshold strips, beading, and finishing details",
      "Removal and disposal of existing flooring",
    ],
  },
  {
    slug: "bespoke-joinery",
    title: "Bespoke Joinery",
    subtitle: "Supply & Installation",
    image: "/services/joinery.jpg",
    short: "Handcrafted joinery designed around your space — built to measure, finished to perfection, and made to last a lifetime.",
    full: "Off-the-shelf solutions rarely fit perfectly. That's why we offer fully bespoke joinery — designed and built to your exact specifications, tailored to your space, and finished to complement your interior perfectly.\n\nFrom alcove shelving and floating shelves to staircases, window seats, and architectural panelling, our joiners bring precision craftsmanship to every commission. We work closely with clients from initial concept through to final installation, ensuring the finished piece is exactly what was envisioned — and often better.",
    bullets: [
      "Alcove units, shelving, and storage solutions",
      "Staircase construction and refurbishment",
      "Skirting boards, architraves, and door linings",
      "Window seats and bay window joinery",
      "Feature wall panelling and decorative mouldings",
      "Made-to-measure furniture and cabinetry",
    ],
  },
  {
    slug: "kitchens-wardrobes",
    title: "Kitchens & Wardrobes",
    subtitle: "Supply & Installation",
    image: "/services/kitchen.jpg",
    short: "From full kitchen installations to fitted wardrobes — precise, professional, and built around the way you live.",
    full: "A kitchen or wardrobe installation is only as good as the team fitting it. At EBK Construction, we handle every aspect of your kitchen or fitted wardrobe project — from removing the old units to fitting the final handle — with the care and accuracy that furniture of this quality demands.\n\nWe work with units supplied by you or can advise on quality suppliers to suit your budget. Our team manages the full installation process including worktops, plinth and cornice work, internal fittings, and all the finishing details that make the difference between a good result and a great one.",
    bullets: [
      "Full kitchen installation (supply-only or supply and fit)",
      "Worktop templating, cutting, and fitting (stone, laminate, solid wood)",
      "Fitted and sliding wardrobe installation",
      "Walk-in wardrobe design and build",
      "Kitchen and wardrobe modifications and upgrades",
    ],
  },
  {
    slug: "interior-fit-out",
    title: "Interior Fit-Out",
    subtitle: "Residential & Commercial",
    image: "/services/fitout.jpg",
    short: "Complete interior fit-out for residential and commercial spaces — transforming empty shells into finished, functional environments.",
    full: "Whether you're fitting out a new build, converting a commercial space, or completely refurbishing an existing property, EBK Construction delivers interior fit-out solutions that are efficient, high-quality, and coordinated from start to finish.\n\nWe work with developers, landlords, business owners, and homeowners on projects of all scales — from a single office refurbishment to a multi-unit residential development. Our team manages the full fit-out package, including partitioning, suspended ceilings, flooring, joinery, and all associated finishing work.",
    bullets: [
      "First and second fix carpentry",
      "Stud partitioning and drylining",
      "Suspended ceiling systems",
      "Door and hardware installation",
      "Commercial and office fit-out",
      "Full residential refurbishment packages",
    ],
  },
  {
    slug: "fire-doors",
    title: "Fire Doors",
    subtitle: "Supply & Installation",
    image: "/services/firedoor.jpg",
    short: "Certified fire door supply and installation — protecting lives, meeting regulations, and built to last.",
    full: "Fire doors are one of the most critical safety features in any building. Incorrectly fitted or non-compliant fire doors can put lives at risk and expose property owners to serious legal liability. At EBK Construction, we take fire door installation seriously — supplying certified products and fitting them to the exacting standards required by UK building regulations.\n\nWe work on residential, HMO, and commercial properties, providing fire door solutions that are compliant with BS 8214, BS EN 1634, and the Fire Safety Order 2005. Every installation is carried out by experienced fitters who understand exactly what correct installation looks like — and why it matters.",
    bullets: [
      "Supply and installation of FD30 and FD60 certified fire doors",
      "Fire door inspections and compliance assessments",
      "Replacement of non-compliant fire doors",
      "Intumescent seals, smoke seals, and ironmongery fitting",
      "Fire door surveys for HMO landlords and commercial properties",
      "Documentation and record-keeping for compliance purposes",
    ],
  },
  {
    slug: "carpentry",
    title: "Carpentry & Construction",
    subtitle: "General Works",
    image: "/services/carpentry.jpg",
    short: "Skilled carpentry and general construction works for residential and commercial clients — no job too small, no challenge too complex.",
    full: "Not every project fits neatly into a single category. At EBK Construction, we offer a full range of general carpentry and construction services to complement our specialist work — or to stand alone as individual projects.\n\nFrom stud wall construction and door hanging to loft conversions and structural timber work, our team has the skills and experience to tackle a wide variety of building tasks with the same level of care and precision we bring to every job.",
    bullets: [
      "Stud wall and partition construction",
      "Door hanging, fitting, and adjustment",
      "Loft hatch installation",
      "Timber frame structures and outbuildings",
      "Decking and external timber works",
      "Repairs and modifications to existing structures",
      "Snagging and remedial works",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-28">

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <Image src="/services/fitout.jpg" alt="EBK Construction Services" fill className="object-cover scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a6b]/80 via-[#1a3a6b]/65 to-[#1a3a6b]/75" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="block h-px w-12 bg-[#c8a96e] origin-right" />
            <span className="text-[#c8a96e] font-semibold tracking-[0.25em] uppercase text-sm">What We Do</span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="block h-px w-12 bg-[#c8a96e] origin-left" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-barlow font-bold text-4xl sm:text-5xl lg:text-6xl"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/70 text-lg mt-4 max-w-xl mx-auto"
          >
            From bespoke joinery to full commercial fit-outs — delivered to the highest standard.
          </motion.p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-8 bg-white">
        {services.map((service, i) => (
          <div
            key={service.slug}
            id={service.slug}
            className={`py-20 ${i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -120 : 120 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={i % 2 !== 0 ? "lg:order-2" : ""}
                >
                  <div className={`group relative h-[420px] rounded-sm overflow-hidden shadow-xl`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover scale-150 group-hover:scale-100 transition-transform duration-[1500ms] ease-in-out"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[#c8a96e] text-xs font-semibold tracking-widest uppercase">{service.subtitle}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 120 : -120 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={i % 2 !== 0 ? "lg:order-1" : ""}
                >
                  <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-2">
                    0{i + 1}
                  </p>
                  <h2 className="font-barlow font-bold text-3xl sm:text-4xl text-[#1a3a6b] mb-4">
                    {service.title}
                  </h2>
                  <div className="w-12 h-0.5 bg-[#c8a96e] mb-6" />
                  <div className="text-gray-600 leading-relaxed space-y-4 mb-8">
                    {service.full.split("\n\n").map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                  <ul className="space-y-2 mb-8">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] mt-1.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-block px-7 py-3 bg-[#c8a96e] hover:bg-[#b8943a] text-white font-semibold text-sm tracking-wide transition-all duration-200 rounded-sm"
                  >
                    Request a Quote
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1a3a6b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#c8a96e] font-semibold tracking-[0.15em] uppercase text-sm mb-4">Get Started</p>
            <h2 className="font-barlow font-bold text-4xl sm:text-5xl text-white mb-6">
              Ready to Discuss Your Project?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Get in touch for a free, no-obligation quote. We'll assess your requirements and provide a clear, transparent proposal.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-[#c8a96e] hover:bg-[#b8943a] text-white font-semibold tracking-wide transition-all duration-200 rounded-sm shadow-lg"
            >
              Get a Free Quote
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
