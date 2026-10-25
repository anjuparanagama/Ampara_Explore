"use client";

import { AdminAlertsProps } from "@/interface";

export default function AdminAlerts({
  loading,
  error,
  message,
}: AdminAlertsProps) {
  return (
    <>
      {loading && (
        <p className="rounded-xl border border-sky-100 bg-white p-4 text-sm text-slate-600 shadow-sm">
          Loading admin data...
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-700"
        >
          {error}
        </p>
      )}
      {message && (
        <p
          role="status"
          className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700"
        >
          {message}
        </p>
      )}
    </>
  );
}
