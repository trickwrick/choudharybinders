"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  ExternalLink,
  ImageIcon,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Mail,
  Menu,
  Package,
  Settings,
  Shield,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/slider", label: "Hero Slider", icon: ImageIcon },
  { href: "/admin/categories", label: "Categories", icon: LayoutGrid },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/slider": "Hero Slider",
  "/admin/categories": "Categories",
  "/admin/products": "Products",
  "/admin/inquiries": "Inquiries",
  "/admin/settings": "Settings",
};

function resolvePageTitle(pathname: string) {
  if (pageTitles[pathname]) return pageTitles[pathname];

  if (pathname.startsWith("/admin/products")) return "Products";
  if (pathname.startsWith("/admin/categories")) return "Categories";
  if (pathname.startsWith("/admin/slider")) return "Hero Slider";
  if (pathname.startsWith("/admin/inquiries")) return "Inquiries";
  if (pathname.startsWith("/admin/settings")) return "Settings";

  return "Admin";
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle = useMemo(() => resolvePageTitle(pathname), [pathname]);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
      active
        ? "admin-nav-active text-white"
        : "text-white/72 hover:bg-white/10 hover:text-white"
    }`;

  const sidebar = (
    <>
      <div className="brand-tricolor-bar h-1 w-full shrink-0" />

      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/admin" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo-brand.png"
            alt="Choudhary Binders"
            width={120}
            height={46}
            className="h-10 w-auto brightness-0 invert"
          />
        </Link>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
          <Shield className="h-3 w-3 text-brand-lime" />
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/35">
          Manage
        </p>
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={navLinkClass(active)}
            >
              <Icon className={`h-4 w-4 ${active ? "text-brand-lime" : ""}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <div className="mb-1 flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lime text-xs font-bold text-[#0f172a]">
            AD
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Administrator</p>
            <p className="text-xs text-white/45">Content Manager</p>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/72 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View Website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/72 transition-colors hover:bg-red-500/15 hover:text-red-200"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="admin-shell-bg min-h-screen">
      <aside className="admin-sidebar fixed inset-y-0 left-0 z-40 hidden w-[17.5rem] flex-col border-r border-white/10 text-white lg:flex">
        {sidebar}
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/45"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="admin-sidebar absolute inset-y-0 left-0 flex w-[17.5rem] flex-col shadow-2xl">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-2 text-white/70 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-[17.5rem]">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-white/92 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="rounded-xl border border-border bg-white p-2.5 text-text/70 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-medium text-text/45">
                  <span>Admin</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="text-primary">{pageTitle}</span>
                </div>
                <h1 className="truncate text-xl font-bold text-text">{pageTitle}</h1>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-semibold text-text/70 transition-colors hover:border-primary/30 hover:text-primary"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Website
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f3d0f] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#138808]"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
