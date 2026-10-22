import React from "react";
import { Flag, CheckCircle2 } from "lucide-react";
import { PlanTimelineProps } from "@/interface";
import PlanStopCard from "./PlanStopCard";

export default function PlanTimeline({
  stops,
  onMoveStop,
  onDeleteStop,
}: PlanTimelineProps) {
  return (
    <div className="lg:col-span-7 space-y-4">
      {/* Start Waypoint Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 text-[#0084d1] flex items-center justify-center font-black text-sm shrink-0">
            <span className="w-4 h-4 rounded-full border-3 border-[#0084d1]" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              START WAYPOINT • 08:00 AM DEPARTURE
            </div>
            <div className="text-base font-black text-slate-900 leading-tight">
              Ampara Town Center Clocktower
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">
              0.0 km radial benchmark • Fuel & Supplies
            </div>
          </div>
        </div>

        <Flag className="w-5 h-5 text-slate-300 shrink-0" />
      </div>

      {/* Stops Loop with Transit Connectors */}
      {stops.map((stop, index) => (
        <PlanStopCard
          key={stop.id}
          stop={stop}
          index={index}
          totalStops={stops.length}
          onMoveStop={onMoveStop}
          onDeleteStop={onDeleteStop}
        />
      ))}

      {/* Final Return to Ampara Indicator */}
      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">
            Return to Ampara Town Center by <strong>05:30 PM</strong>
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-bold uppercase">
          COMPLETE 1-DAY LOOP
        </span>
      </div>
    </div>
  );
}
