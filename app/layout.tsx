import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "EBK Construction LTD — Building Spaces. Delivering Excellence.",
  description:
    "London-based carpentry, joinery and interior fit-out specialists. Over 20 years of experience delivering premium results for residential and commercial clients across the UK.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    title: "EBK Construction LTD",
    description:
      "Premium carpentry, joinery and interior fit-out. Based in London, operating UK-wide.",
    images: [{ url: "/logo-full.png", width: 800, alt: "EBK Construction LTD" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-inter">
        <Navbar />
        {children}
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
