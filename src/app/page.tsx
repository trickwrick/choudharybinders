import AboutSection from "@/components/AboutSection";
import CategorySection from "@/components/CategorySection";
import CenterBannerSection from "@/components/CenterBannerSection";
import ClientsSection from "@/components/ClientsSection";
import ProductsSection from "@/components/ProductsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FloatingActions from "@/components/FloatingActions";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideosSection from "@/components/VideosSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientsSection />
        <CategorySection />
        <ProductsSection />
        <WhyChooseUsSection />
        <CenterBannerSection />
        <ProcessSection />
        <AboutSection />
        <GallerySection />
        <VideosSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
