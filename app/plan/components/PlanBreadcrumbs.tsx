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
      </div>
    </div>
  );
}
