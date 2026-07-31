import { Suspense } from "react";
import NewSlideForm from "./NewSlideForm";

export default function NewSlidePage() {
  return (
    <Suspense fallback={<p className="text-sm text-text/60">Loading form...</p>}>
      <NewSlideForm />
    </Suspense>
  );
}
