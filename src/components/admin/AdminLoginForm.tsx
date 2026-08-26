"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LockKeyhole, Shield, User, Eye, EyeOff } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Invalid username or password. Please try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f3f6f3] lg:grid lg:grid-cols-2">
      <div className="admin-sidebar relative hidden overflow-hidden lg:flex lg:flex-col">
        <div className="brand-tricolor-bar h-1.5 w-full" />
        <div className="flex flex-1 flex-col justify-between px-10 py-12 text-white">
          <div>
            <Image
              src="/logo-brand.png"
              alt="Choudhary Binders"
              width={200}
              height={78}
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              <Shield className="h-3.5 w-3.5 text-brand-lime" />
              Secure Admin Access
            </p>
            <h1 className="mt-6 max-w-md text-4xl font-bold leading-tight">
              Manage your website content with ease
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
              Update slider, categories, products, and customer inquiries from
              one dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
            Since 1980 · Choudhary Binders & Printers, Jaipur
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="admin-card w-full max-w-md overflow-hidden rounded-3xl">
          <div className="border-b border-border/70 px-8 py-8 text-center lg:hidden">
            <Image
              src="/logo-brand.png"
              alt="Choudhary Binders"
              width={180}
              height={70}
              className="mx-auto h-14 w-auto"
            />
          </div>

          <div className="px-8 pb-8 pt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-text">Admin Login</h2>
              <p className="mt-1 text-sm text-text/60">
                Sign in to manage slider, products, and inquiries
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-text">
                  User ID
                </span>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40" />
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    autoComplete="username"
                    placeholder="Enter admin user ID"
                    className={["w-full rounded-xl border border-border bg-light-bg/40 py-3 pl-10 pr-4 text-sm", "outline-none transition-colors focus:border-primary focus:bg-white"].join(" ")}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-text">
                  Password
                </span>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="Enter admin password"
                    className={["w-full rounded-xl border border-border bg-light-bg/40 py-3 pl-10 pr-10 text-sm", "outline-none transition-colors focus:border-primary focus:bg-white"].join(" ")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text/40 hover:text-text/80 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </label>

              {error ? (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-linear-to-r from-[#0f3d0f] to-[#138808] py-3 text-sm font-bold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
