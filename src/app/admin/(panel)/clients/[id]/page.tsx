import { notFound } from "next/navigation";
import ClientForm from "@/components/admin/ClientForm";
import { getClientById } from "@/lib/db/clients";

export const dynamic = "force-dynamic";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text">Edit Client Logo</h2>
        <p className="mt-1 text-sm text-text/60">Update client logo details or visibility.</p>
      </div>
      <ClientForm initialClient={client} />
    </div>
  );
}
