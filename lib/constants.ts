export const SITE = {
  name: "EBK Construction LTD",
  tagline: "Building Spaces. Delivering Excellence.",
  phone: "+44 7975 797959",
  phoneDisplay: "+44 7975 797959",
  whatsapp: "447975797959",
  email: "info@ebkconstruction.co.uk",
  address: "8 Stanwyck Gardens, Romford, RM3 7JU",
  area: "Based in East London, operating UK-wide",
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    tiktok: "",
  },
} as const;

export const SERVICES = [
  {
    slug: "flooring",
    title: "Flooring",
    subtitle: "Wood, Laminate & Vinyl Installation",
    icon: "flooring",
    short: "Premium flooring solutions installed to the highest standard — from classic hardwood to modern vinyl, we transform any space from the ground up.",
    category: "flooring",
  },
  {
    slug: "bespoke-joinery",
    title: "Bespoke Joinery",
    subtitle: "Supply & Installation",
    icon: "joinery",
    short: "Handcrafted joinery designed around your space — built to measure, finished to perfection, and made to last a lifetime.",
    category: "joinery",
  },
  {
    slug: "kitchens-wardrobes",
    title: "Kitchens & Wardrobes",
    subtitle: "Supply & Installation",
    icon: "kitchen",
    short: "From full kitchen installations to fitted wardrobes — precise, professional, and built around the way you live.",
    category: "kitchens",
  },
  {
    slug: "interior-fit-out",
    title: "Interior Fit-Out",
    subtitle: "Residential & Commercial",
    icon: "fitout",
    short: "Complete interior fit-out for residential and commercial spaces — transforming empty shells into finished, functional environments.",
    category: "fit-out",
  },
  {
    slug: "fire-doors",
    title: "Fire Doors",
    subtitle: "Supply & Installation",
    icon: "firedoor",
    short: "Certified fire door supply and installation — protecting lives, meeting regulations, and built to last.",
    category: "fire-doors",
  },
  {
    slug: "carpentry",
    title: "Carpentry & Construction",
    subtitle: "General Works",
    icon: "carpentry",
    short: "Skilled carpentry and general construction works for residential and commercial clients — no job too small, no challenge too complex.",
    category: "carpentry",
  },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;
