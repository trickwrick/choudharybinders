"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { ClientLogoDoc } from "@/lib/types/cms";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientLogoDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const loadClients = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/clients");
    const data = await response.json();
    setClients(data.clients ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this client?")) return;
    await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
    loadClients();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-text">Trusted Clients</h2>
          <p className="mt-1 text-sm text-text/60">
            Manage client logos shown in the marquee.
          </p>
        </div>
        <Link
          href={`/admin/clients/new?order=${clients.length}`}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-text/60">Loading clients...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {clients.map((client) => (
            <article
              key={String(client._id)}
              className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm"
            >
              <div className="relative aspect-square w-full bg-light-bg p-4 flex items-center justify-center">
                {client.src ? (
                  <Image src={client.src} alt={client.name} width={120} height={120} className="object-contain" />
                ) : null}
                {!client.active ? (
                  <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold uppercase text-white">
                    Hidden
                  </span>
                ) : null}
              </div>
              <div className="p-4 border-t border-border/50">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Order {client.order}
                </p>
                <h3 className="mt-1 truncate text-sm font-bold text-text">{client.name}</h3>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/admin/clients/${client._id}`}
                    className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg border border-border py-1.5 text-xs font-semibold text-text/70 hover:border-primary/30 hover:text-primary"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(String(client._id))}
                    className="flex-1 inline-flex justify-center items-center gap-1 rounded-lg border border-red-200 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
