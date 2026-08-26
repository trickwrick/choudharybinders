import GalleryForm from "@/components/admin/GalleryForm";

export const dynamic = "force-dynamic";

export default async function NewGalleryImagePage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const defaultOrder = order ? Number(order) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text">Add Gallery Image</h2>
        <p className="mt-1 text-sm text-text/60">Upload a new image to the gallery.</p>
      </div>
      <GalleryForm defaultOrder={Number.isFinite(defaultOrder) ? defaultOrder : 0} />
    </div>
  );
}
