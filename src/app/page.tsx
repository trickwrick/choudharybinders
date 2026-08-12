import AboutSection from "@/components/AboutSection";
import CenterBannerSection from "@/components/CenterBannerSection";
import ClientsSection from "@/components/ClientsSection";
import ProductsSection from "@/components/ProductsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ContactSectionWrapper from "@/components/ContactSectionWrapper";
import FloatingActions from "@/components/FloatingActions";
import ProcessSection from "@/components/ProcessSection";
import SolutionsSection from "@/components/SolutionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideosSection from "@/components/VideosSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import { getHeroSlidesFromDb } from "@/lib/db/hero-slides";
import { seedDatabaseIfEmpty } from "@/lib/db/seed";

export const dynamic = "force-dynamic";

export default async function Home() {
  await seedDatabaseIfEmpty();
  const slides = await getHeroSlidesFromDb();

  return (
    <>
      <Navbar />
      <main>
        <Hero slides={slides} />
        <ClientsSection />
        <ProductsSection />
        <SolutionsSection />
        <WhyChooseUsSection />
        <CenterBannerSection />
        <ProcessSection />
        <AboutSection />
        <GallerySection />
        <VideosSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSectionWrapper />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
