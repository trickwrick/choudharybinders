import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = await verifyAdminSession();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
