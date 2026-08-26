"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ImageIcon,
  LayoutGrid,
  Mail,
  Package,
  Sparkles,
} from "lucide-react";

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
      tone: "bg-blue-50 text-blue-700 ring-blue-100",
    },
    {
      label: "Categories",
      value: stats?.categories ?? "—",
      href: "/admin/categories",
      icon: LayoutGrid,
      tone: "bg-violet-50 text-violet-700 ring-violet-100",
    },
    {
      label: "Products",
      value: stats?.products ?? "—",
      href: "/admin/products",
      icon: Package,
      tone: "bg-primary/10 text-primary ring-primary/15",
    },
    {
      label: "New Inquiries",
      value: stats?.newInquiries ?? "—",
      href: "/admin/inquiries",
      icon: Mail,
      tone: "bg-accent/10 text-accent ring-accent/15",
    },
    {
      label: "Total Inquiries",
      value: stats?.totalInquiries ?? "—",
      href: "/admin/inquiries",
      icon: Sparkles,
      tone: "bg-[#0f3d0f]/10 text-[#0f3d0f] ring-[#0f3d0f]/10",
    },
  ];

  const quickActions = [
    { label: "Update homepage slider", href: "/admin/slider" },
    { label: "Manage categories", href: "/admin/categories" },
    { label: "Add a new product", href: "/admin/products/new" },
    { label: "View quote inquiries", href: "/admin/inquiries" },
  ];

  return (
    <div className="space-y-6">
      <section className="admin-card overflow-hidden rounded-3xl">
        <div className="brand-tricolor-bar h-1.5 w-full" />
        <div className="bg-linear-to-r from-[#0f3d0f] via-[#138808] to-[#0f3d0f] px-6 py-7 text-white sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lime">
            Welcome back
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Choudhary Binders Admin
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
            Manage slider, categories, products, and customer inquiries from one
            place.
          </p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="admin-stat-card group rounded-2xl border border-border/70 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${card.tone}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-text/25 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-5 text-sm font-medium text-text/55">{card.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-text">
                {card.value}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4">
        <div className="admin-card rounded-3xl p-6">
          <h3 className="text-lg font-bold text-text">Quick Actions</h3>
          <p className="mt-1 text-sm text-text/55">
            Jump straight to common admin tasks.
          </p>
          <div className="mt-5 space-y-2.5">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center justify-between rounded-2xl border border-border/70 bg-light-bg/70 px-4 py-3.5 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-primary/5 hover:text-primary"
              >
                {action.label}
                <ArrowRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
