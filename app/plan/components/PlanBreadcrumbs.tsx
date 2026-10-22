import React from "react";
import Link from "next/link";
import { PlanBreadcrumbsProps } from "@/interface";

export default function PlanBreadcrumbs({
  viewState,
  setViewState,
  stopsCount,
}: PlanBreadcrumbsProps) {
  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-2">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Link
            href="/"
            className="hover:text-[#0084d1] flex items-center gap-1"
          >
            <span>⌂ Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#0084d1] font-bold">My Visit Plan</span>
        </div>

        {/* State Switcher Pill */}
        <div className="inline-flex items-center bg-white/90 backdrop-blur-md p-1 rounded-full border border-slate-200/90 shadow-2xs">
          <button
            type="button"
            onClick={() => setViewState("active")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewState === "active"
                ? "bg-[#0084d1] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                viewState === "active" ? "bg-emerald-300" : "bg-slate-400"
              }`}
            />
            <span>Active Plan ({stopsCount} Stops)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewState("empty")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewState === "empty"
                ? "bg-slate-800 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Empty State</span>
          </button>
        </div>
      </div>
    </div>
  );
}
