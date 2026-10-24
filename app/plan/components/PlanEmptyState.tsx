import React from "react";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

interface PlanEmptyStateProps {
  onCreatePlan?: () => void;
}

export default function PlanEmptyState({ onCreatePlan }: PlanEmptyStateProps) {
  return (
    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-2xl mx-auto my-8 animate-fadeIn">
      <div className="w-16 h-16 rounded-full bg-sky-50 text-[#0084d1] flex items-center justify-center mx-auto shadow-inner">
        <Compass className="w-8 h-8 stroke-[2]" />
      </div>
      <h3 className="text-xl font-black text-slate-900">
        Your 1-Day Itinerary is Empty
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
        Select your desired destinations or browse attractions within the 25km radius around Ampara to create your customized sequence.
      </p>
      <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
        {onCreatePlan && (
          <button
            type="button"
            onClick={onCreatePlan}
            className="inline-flex items-center gap-2 bg-[#0084d1] hover:bg-[#0070b3] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Create New Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        <Link
          href="/#explore"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer"
        >
          <span>Browse Destinations</span>
        </Link>
      </div>
    </div>
  );
}
