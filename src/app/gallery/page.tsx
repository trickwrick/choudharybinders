import type { Metadata } from "next";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import GalleryPageContent from "@/components/GalleryPageContent";
import Navbar from "@/components/Navbar";
import { getActiveGalleryImagesForPublic } from "@/lib/db/gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | Choudhary Binders & Printers",
  description:
    "Browse our complete gallery of printing, branding, signage, flex boards, LED signs, and outdoor advertising work in Jaipur.",
};

export default async function GalleryPage() {
  const images = await getActiveGalleryImagesForPublic();

  return (
    <>
      <Navbar />
      <main className="pt-29">
        <GalleryPageContent images={images} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
