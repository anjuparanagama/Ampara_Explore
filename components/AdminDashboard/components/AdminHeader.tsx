"use client";

import { Plus } from "lucide-react";
import { AdminHeaderProps } from "@/interface";

export default function AdminHeader({
  activeSection,
  onAddPlaceClick,
}: AdminHeaderProps) {
  const titles = {
    dashboard: "Dashboard",
    places: "Places",
    categories: "Categories",
  };

  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
          Ampara Explore / ADMIN
        </p>
        <h1 className="mt-1 text-3xl font-bold">{titles[activeSection]}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your tourism content from one place.
        </p>
      </div>

      {activeSection === "places" && (
        <button
          onClick={onAddPlaceClick}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0e7490] px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-cyan-900/10 transition hover:bg-[#155e75]"
        >
          <Plus className="h-4 w-4" /> Add place
        </button>
      )}
    </header>
  );
}
