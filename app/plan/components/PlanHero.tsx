import React from "react";
import { Compass } from "lucide-react";

export default function PlanHero() {
  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-[#0084d1] text-[11px] font-extrabold tracking-wider uppercase">
        <Compass className="w-3.5 h-3.5 text-[#0084d1]" />
        <span>25 KM RADIAL TRIP ARCHITECT</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
        Plan Your Day in Ampara
      </h1>

      <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-3xl leading-relaxed">
        Curate your single-day expedition around Ampara. Organize sequential
        waypoints, track drive times through wild reserves, and ensure your
        entire route remains safely inside the 25 km regional horizon.
      </p>
    </div>
  );
}
