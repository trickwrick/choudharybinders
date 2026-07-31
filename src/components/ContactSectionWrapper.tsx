import { Suspense } from "react";
import ContactSection from "@/components/ContactSection";

export default function ContactSectionWrapper() {
  return (
    <Suspense fallback={null}>
      <ContactSection />
    </Suspense>
  );
}
