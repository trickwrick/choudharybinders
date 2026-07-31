"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/slider", label: "Hero Slider", icon: ImageIcon },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0f172a] text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-5">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/logo-main.png"
              alt="Choudhary Binders"
              width={120}
              height={46}
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View Website
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-red-500/15 hover:text-red-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Choudhary Binders
              </p>
              <h1 className="text-lg font-bold text-text">Content Management</h1>
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/"
                className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text/70"
              >
                Website
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-[#0f172a] px-3 py-2 text-xs font-semibold text-white"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-border/60 px-4 py-2 lg:hidden">
            {navItems.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    active ? "bg-primary text-white" : "bg-light-bg text-text/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
