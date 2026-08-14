import { Suspense } from "react";
import NewCategoryForm from "./NewCategoryForm";

export default function NewCategoryPage() {
  return (
    <Suspense fallback={<p className="text-sm text-text/60">Loading form...</p>}>
      <NewCategoryForm />
    </Suspense>
  );
}
