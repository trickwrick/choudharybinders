import { Suspense } from "react";
import NewProductForm from "./NewProductForm";

export default function NewProductPage() {
  return (
    <Suspense fallback={<p className="text-sm text-text/60">Loading form...</p>}>
      <NewProductForm />
    </Suspense>
  );
}
