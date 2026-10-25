"use client";

import { Plus } from "lucide-react";
import { AdminOverviewProps } from "@/interface";

export default function AdminOverview({
  attractionsCount,
  categoriesCount,
  onAddFirstPlace,
}: AdminOverviewProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Total places</p>
        <p className="mt-2 text-3xl font-bold text-[#082f49]">{attractionsCount}</p>
        <p className="mt-1 text-xs text-slate-400">Published destinations</p>
      </div>

      <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Categories</p>
        <p className="mt-2 text-3xl font-bold text-[#082f49]">{categoriesCount}</p>
        <p className="mt-1 text-xs text-slate-400">Organized destination groups</p>
      </div>

      <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:col-span-2">
        <h2 className="text-xl font-bold">Welcome to your admin dashboard</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Use the sidebar to manage places and categories. Add new destinations with
          photos, descriptions, location details, and visitor information.
        </p>
        <button
          onClick={onAddFirstPlace}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0e7490] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#155e75]"
        >
          <Plus className="h-4 w-4" /> Add your first place
        </button>
      </div>
    </section>
  );
}
