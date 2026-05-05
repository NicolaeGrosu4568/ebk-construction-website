import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PortfolioPreview from "@/components/PortfolioPreview";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";

export default function HomePage() {
  return (
    <main>
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
