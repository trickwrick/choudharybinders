"use client";

import { useEffect, useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";

type AdminSettings = {
  username: string;
  passwordSource: "database" | "environment";
  updatedAt: string | null;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((response) => response.json())
      .then((data) => setSettings(data.settings ?? null))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });

    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setError(data.error || "Failed to update password.");
      return;
    }

    setSuccess(data.message || "Password updated successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    const refreshed = await fetch("/api/admin/settings");
    const refreshedData = await refreshed.json();
    setSettings(refreshedData.settings ?? null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text">Settings</h2>
        <p className="mt-1 text-sm text-text/60">
          Manage admin account security and password.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text">Change Password</h3>
              <p className="text-sm text-text/60">
                Update your admin login password securely.
              </p>
            </div>
          </div>

          {error ? (
            <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="mb-4 rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
              {success}
            </p>
          ) : null}

          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-text">
                Current Password
              </span>
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-text">
                New Password
              </span>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                minLength={6}
                className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-text">
                Confirm New Password
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                minLength={6}
                className="w-full rounded-xl border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f172a]/10 text-[#0f172a]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-text">Account Info</p>
              <p className="text-xs text-text/55">Current admin details</p>
            </div>
          </div>

          {loading ? (
            <p className="mt-4 text-sm text-text/60">Loading...</p>
          ) : (
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl bg-light-bg px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-text/45">
                  Username
                </p>
                <p className="mt-1 font-semibold text-text">{settings?.username}</p>
              </div>

              <div className="rounded-xl bg-light-bg px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-text/45">
                  Password Source
                </p>
                <p className="mt-1 font-semibold capitalize text-text">
                  {settings?.passwordSource ?? "environment"}
                </p>
              </div>

              {settings?.updatedAt ? (
                <div className="rounded-xl bg-light-bg px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-text/45">
                    Last Updated
                  </p>
                  <p className="mt-1 font-semibold text-text">
                    {new Date(settings.updatedAt).toLocaleString("en-IN")}
                  </p>
                </div>
              ) : null}

              <p className="text-xs leading-relaxed text-text/55">
                After changing password here, the new password is saved in MongoDB.
                Environment password is used only until the first change.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
