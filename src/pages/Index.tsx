import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ClientsSection from "@/components/ClientsSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BranchesMapSection from "@/components/BranchesMapSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ClientsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <BranchesMapSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
