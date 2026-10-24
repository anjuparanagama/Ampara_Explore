import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PrivacyBreadcrumbs() {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
      <Link href="/" className="hover:text-[#0084d1]">
        Home
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
      <span className="text-slate-800 font-bold">Privacy Policy</span>
    </div>
  );
}
