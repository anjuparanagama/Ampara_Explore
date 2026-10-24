import React from "react";
import Link from "next/link";

export default function TermsFooterNavigator() {
  return (
    <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-center sm:text-left">
        <div className="text-sm font-bold text-slate-900">
          Explore Additional Policies
        </div>
        <div className="text-xs text-slate-500">
          Read our privacy protocols and cultural conservation guidelines.
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/privacy-policy"
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          href="/cultural-guidelines"
          className="px-4 py-2 rounded-xl bg-[#0084d1] hover:bg-[#0070b3] text-xs font-bold text-white transition-colors"
        >
          Cultural Guidelines
        </Link>
      </div>
    </div>
  );
}
