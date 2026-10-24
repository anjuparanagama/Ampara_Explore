import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function PrivacyHeader() {
  return (
    <header className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#0084d1] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
            Ampara <span className="text-[#0084d1] font-extrabold">Explore</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0084d1] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back to Explore</span>
          </Link>

          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0084d1] hover:text-[#006699] transition-colors px-2 py-1"
          >
            Explorer Login
          </Link>
        </div>
      </div>
    </header>
  );
}
