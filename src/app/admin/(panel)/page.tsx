"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImageIcon, LayoutGrid, Mail, Package, Sparkles } from "lucide-react";

type Stats = {
  slides: number;
  categories: number;
  products: number;
  newInquiries: number;
  totalInquiries: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((response) => response.json())
      .then((data) => setStats(data.stats))
      .catch(() => setStats(null));
  }, []);

  const cards = [
    {
      label: "Hero Slides",
      value: stats?.slides ?? "—",
      href: "/admin/slider",
      icon: ImageIcon,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Categories",
      value: stats?.categories ?? "—",
      href: "/admin/categories",
      icon: LayoutGrid,
      color: "from-violet-500 to-violet-600",
    },
    {
      label: "Products",
      value: stats?.products ?? "—",
      href: "/admin/products",
      icon: Package,
      color: "from-primary to-[#0ADB0A]",
    },
    {
      label: "New Inquiries",
      value: stats?.newInquiries ?? "—",
      href: "/admin/inquiries",
      icon: Mail,
      color: "from-accent to-[#ff9933]",
    },
    {
      label: "Total Inquiries",
      value: stats?.totalInquiries ?? "—",
      href: "/admin/inquiries",
      icon: Sparkles,
      color: "from-[#0f172a] to-[#334155]",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text">Dashboard</h2>
        <p className="mt-1 text-sm text-text/60">
          Welcome back. Manage your website content from here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className={`bg-gradient-to-r ${card.color} px-5 py-4 text-white`}>
                <Icon className="h-5 w-5 opacity-90" />
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-text/55">{card.label}</p>
                <p className="mt-1 text-3xl font-bold text-text">{card.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text">Quick Actions</h3>
          <div className="mt-4 space-y-3">
            <Link href="/admin/slider" className="block rounded-xl bg-light-bg px-4 py-3 text-sm font-semibold text-text hover:bg-primary/10 hover:text-primary">
              Update homepage slider
            </Link>
            <Link href="/admin/categories" className="block rounded-xl bg-light-bg px-4 py-3 text-sm font-semibold text-text hover:bg-primary/10 hover:text-primary">
              Manage categories
            </Link>
            <Link href="/admin/products" className="block rounded-xl bg-light-bg px-4 py-3 text-sm font-semibold text-text hover:bg-primary/10 hover:text-primary">
              Add a new product
            </Link>
            <Link href="/admin/inquiries" className="block rounded-xl bg-light-bg px-4 py-3 text-sm font-semibold text-text hover:bg-primary/10 hover:text-primary">
              View quote inquiries
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/15 bg-section-mint p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text">Tips</h3>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text/70">
            <li>• Image paths should start with `/` — e.g. `/hero/slide-1.jpg`</li>
            <li>• Product slug is used in the URL — use lowercase with hyphens</li>
            <li>• Contact form submissions appear automatically in Inquiries</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
