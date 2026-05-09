import { SITE } from "@/lib/constants";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EBK Construction LTD",
    description: "London-based carpentry, joinery and interior fit-out specialists with over 20 years of experience.",
    url: "https://ebkconstruction.co.uk",
    logo: "https://ebkconstruction.co.uk/logo-full.png",
    image: "https://ebkconstruction.co.uk/logo-full.png",
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "8 Stanwyck Gardens",
      addressLocality: "Romford",
      postalCode: "RM3 7JU",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5935,
      longitude: 0.2088,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: [
      "Carpentry",
      "Joinery",
      "Interior Fit-Out",
      "Flooring Installation",
      "Fire Door Installation",
      "Kitchen Installation",
      "Wardrobe Installation",
    ],
    priceRange: "££",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
