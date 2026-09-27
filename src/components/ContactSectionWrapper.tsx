import { Suspense } from "react";
import ContactSection from "@/components/ContactSection";

export default function ContactSectionWrapper({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <Suspense fallback={null}>
      <ContactSection hideHeader={hideHeader} />
    </Suspense>
  );
}
