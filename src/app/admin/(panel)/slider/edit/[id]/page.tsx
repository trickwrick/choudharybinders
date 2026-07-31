"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SlideForm from "@/components/admin/SlideForm";
import type { HeroSlideDoc } from "@/lib/types/cms";

export default function EditSlidePage() {
  const params = useParams<{ id: string }>();
  const [slide, setSlide] = useState<HeroSlideDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSlide = async () => {
      setLoading(true);
      const response = await fetch(`/api/admin/hero-slides?id=${params.id}`);
      if (!response.ok) {
        setError("Slide not found.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setSlide(data.slide);
      setLoading(false);
    };

    void loadSlide();
  }, [params.id]);

  if (loading) {
    return <p className="text-sm text-text/60">Loading slide...</p>;
  }

  if (error || !slide) {
    return <p className="text-sm text-red-600">{error || "Slide not found."}</p>;
  }

  return <SlideForm initialSlide={slide} />;
}
