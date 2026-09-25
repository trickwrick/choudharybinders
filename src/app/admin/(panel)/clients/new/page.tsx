import ClientForm from "@/components/admin/ClientForm";

export default async function NewClientPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const order = Number(resolvedSearchParams.order) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text">Add Client Logo</h2>
        <p className="mt-1 text-sm text-text/60">Upload a new client logo to display in the marquee.</p>
      </div>
      <ClientForm defaultOrder={order} />
    </div>
  );
}
