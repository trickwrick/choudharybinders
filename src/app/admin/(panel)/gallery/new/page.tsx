import GalleryForm from "@/components/admin/GalleryForm";

export const dynamic = "force-dynamic";

export default function NewGalleryImagePage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  const defaultOrder = searchParams.order ? Number(searchParams.order) : 0;

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
