import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/admin-auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage() {
  if (await verifyAdminSession()) {
    redirect("/admin");
  }

  return <AdminLoginForm />;
}
