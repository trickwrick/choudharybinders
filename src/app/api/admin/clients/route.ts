import dns from "node:dns";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminGuard } from "@/lib/api-utils";
import {
  createClient,
  deleteClient,
  getClientById,
  listAllClients,
  updateClient,
  seedClientsIfEmpty,
} from "@/lib/db/clients";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const client = await getClientById(id);
      if (!client) {
        return NextResponse.json({ error: "Client not found" }, { status: 404 });
      }
      return NextResponse.json({
        client: { ...client, _id: client._id?.toString() },
      });
    }

    const clientsList = await listAllClients();
    if (clientsList.length === 0) {
      await seedClientsIfEmpty();
      const newClients = await listAllClients();
      return NextResponse.json({
        clients: newClients.map((c) => ({
          ...c,
          _id: c._id?.toString(),
        })),
      });
    }

    return NextResponse.json({
      clients: clientsList.map((c) => ({
        ...c,
        _id: c._id?.toString(),
      })),
    });
  } catch {
    return NextResponse.json({ error: "Failed to load clients" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    const client = await createClient({
      src: body.src,
      name: body.name ?? "Client",
      order: Number(body.order ?? 0),
      active: body.active !== false,
    });
    revalidatePath("/");
    return NextResponse.json({ client });
  } catch {
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    if (!body._id) {
      return NextResponse.json({ error: "Missing client id" }, { status: 400 });
    }
    await updateClient(body._id, {
      src: body.src,
      name: body.name,
      order: Number(body.order),
      active: body.active,
    });
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing client id" }, { status: 400 });
    }
    await deleteClient(id);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete client" }, { status: 500 });
  }
}
