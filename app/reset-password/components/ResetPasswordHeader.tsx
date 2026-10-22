import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Shield } from "lucide-react";

export default function ResetPasswordHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white px-4 py-3.5 sm:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0084d1] text-white shadow-xs transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5 stroke-[2.2]" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
            Ampara <span className="font-extrabold text-[#0084d1]">Explore</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 transition-colors hover:text-[#0084d1] sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 text-slate-600" />
            <span>Back to Explore</span>
          </Link>
          <Link
            href="/login"
            className="hidden px-2 py-1 text-xs font-bold text-[#0084d1] transition-colors hover:text-[#006699] sm:inline-flex sm:items-center sm:gap-1.5 sm:text-sm"
          >
            Sign In to Explorer ID
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#006699] text-white shadow-xs ring-2 ring-sky-100 sm:h-9 sm:w-9">
            <Shield className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
