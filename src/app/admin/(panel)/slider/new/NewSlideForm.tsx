"use client";

import { useSearchParams } from "next/navigation";
import SlideForm from "@/components/admin/SlideForm";

export default function NewSlideForm() {
  const searchParams = useSearchParams();
  const defaultOrder = Number(searchParams.get("order") ?? 0);

  return <SlideForm defaultOrder={Number.isFinite(defaultOrder) ? defaultOrder : 0} />;
}
