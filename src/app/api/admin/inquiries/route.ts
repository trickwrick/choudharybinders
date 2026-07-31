import dns from "node:dns";
import { NextResponse } from "next/server";
import type { InquiryStatus } from "@/lib/types/cms";
import { adminGuard } from "@/lib/api-utils";
import {
  deleteInquiry,
  listInquiries,
  updateInquiryStatus,
} from "@/lib/db/inquiries";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as InquiryStatus | null;
    const inquiries = await listInquiries(status ?? undefined);
    return NextResponse.json({
      inquiries: inquiries.map((item) => ({
        ...item,
        _id: item._id?.toString(),
      })),
    });
  } catch {
    return NextResponse.json({ error: "Failed to load inquiries" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    if (!body._id || !body.status) {
      return NextResponse.json({ error: "Missing inquiry id or status" }, { status: 400 });
    }
    await updateInquiryStatus(body._id, body.status);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing inquiry id" }, { status: 400 });
    }
    await deleteInquiry(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
