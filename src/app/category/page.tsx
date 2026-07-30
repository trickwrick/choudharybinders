import CategorySection from "@/components/CategorySection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function CategoryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[7.25rem]">
        <CategorySection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
