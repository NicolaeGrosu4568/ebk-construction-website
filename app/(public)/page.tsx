import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PortfolioPreview from "@/components/PortfolioPreview";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";

export default function HomePage() {
  return (
    <main>
      <JsonLd />
      <Hero />
      <StatsBar />
      <ServicesSection />
      <WhyChooseUs />
      <PortfolioPreview />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
