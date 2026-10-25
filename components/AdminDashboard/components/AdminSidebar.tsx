"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, MapPinned, Tags } from "lucide-react";
import { AdminSidebarProps, AdminSection } from "@/interface";

const NAV_ITEMS: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "places", label: "Places", icon: MapPinned },
  { id: "categories", label: "Categories", icon: Tags },
];

export default function AdminSidebar({
  activeSection,
  onSelectSection,
}: AdminSidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-[#082f49] px-4 py-6 text-white lg:flex">
      <div className="mb-10 px-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          Ampara Explore
        </p>
        <p className="mt-2 text-lg font-bold">Admin Portal</p>
      </div>

      <nav className="space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-cyan-400 text-[#082f49] shadow-lg shadow-cyan-950/20"
                  : "text-sky-100/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" /> {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5" /> Back to website
        </Link>
      </div>
    </aside>
  );
}
