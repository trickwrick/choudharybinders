import { notFound } from "next/navigation";
import GalleryForm from "@/components/admin/GalleryForm";
import { getGalleryImageById } from "@/lib/db/gallery";

export const dynamic = "force-dynamic";

export default async function EditGalleryImagePage({
  params,
}: {
  params: { id: string };
}) {
  const image = await getGalleryImageById(params.id);

  if (!image) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text">Edit Gallery Image</h2>
        <p className="mt-1 text-sm text-text/60">Update image details or visibility.</p>
      </div>
      <GalleryForm initialImage={image} />
    </div>
  );
}
