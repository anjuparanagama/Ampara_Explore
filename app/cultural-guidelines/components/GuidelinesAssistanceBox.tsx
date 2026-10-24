"use client";

import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function GuidelinesAssistanceBox() {
  return (
    <div className="mt-8 bg-sky-50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-center sm:text-left">
        <div className="w-10 h-10 rounded-xl bg-[#0084d1] text-white flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900">
            Need Immediate Advice or Tourist Police Assistance?
          </div>
          <div className="text-[11px] text-slate-600">
            Tourist Police Post, Ampara: +94 63 222 2222 • Wildlife Department:
            1992
          </div>
        </div>
      </div>

      <Link
        href="/my-plans"
        className="px-4 py-2 rounded-xl bg-[#0084d1] hover:bg-[#0070b3] text-xs font-bold text-white transition-colors shrink-0"
      >
        Open My Itinerary
      </Link>
    </div>
  );
}
