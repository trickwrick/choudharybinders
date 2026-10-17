import TestimonialForm from "@/components/admin/TestimonialForm";

export default async function NewTestimonialPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  return <TestimonialForm defaultOrder={order ? Number(order) : 0} />;
}
