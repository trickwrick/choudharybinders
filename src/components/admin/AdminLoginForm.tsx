"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LockKeyhole, User } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-primary to-[#0ADB0A] px-8 py-8 text-center text-white">
          <Image
            src="/logo-main.png"
            alt="Choudhary Binders"
            width={180}
            height={70}
            className="mx-auto h-14 w-auto brightness-0 invert"
          />
          <h1 className="mt-4 text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-white/85">
            Manage slider, products, and quote inquiries
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-8 py-8">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-text">User ID</span>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40" />
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                autoComplete="username"
                placeholder="Enter admin user ID"
                className="w-full rounded-xl border border-border py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-text">Password</span>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-border py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
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
            className="w-full rounded-xl bg-[#0f172a] py-3 text-sm font-bold text-white transition-colors hover:bg-[#1e293b] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
