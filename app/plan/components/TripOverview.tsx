import React from "react";
import {
  CheckCircle2,
  MapPin,
  Car,
  Clock,
  Compass,
  Check,
  Sun,
  Navigation,
} from "lucide-react";
import { TripOverviewProps } from "@/interface";

export default function TripOverview({ stops }: TripOverviewProps) {
  const handleLaunchGps = () => {
    if (typeof window !== "undefined") {
      window.open(
        "https://maps.google.com/?q=Ampara+Clocktower+to+Senanayake+Samudraya",
        "_blank"
      );
    }
  };

  return (
    <div className="lg:col-span-5 space-y-5 sticky top-20">
      {/* Trip Overview Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              ITINERARY INTELLIGENCE
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Trip Overview
            </h2>
          </div>

          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Feasible &amp; Optimal</span>
          </span>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Metric 1 */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
            <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3 text-[#0084d1]" />
              <span>DESTINATIONS</span>
            </div>
            <div className="text-2xl font-black text-slate-900 leading-none">
              {stops.length} Stops
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">
              + 1 Planned Rest
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
            <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Car className="w-3 h-3 text-[#0084d1]" />
              <span>TOTAL TRAVEL</span>
            </div>
            <div className="text-2xl font-black text-slate-900 leading-none">
              43.4 km
            </div>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">
              Safe inside 25 km max
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
            <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-[#0084d1]" />
              <span>SPAN OF DAY</span>
            </div>
            <div className="text-2xl font-black text-slate-900 leading-none">
              9.5 hrs
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">
              08:00 AM – 05:30 PM
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
            <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Compass className="w-3 h-3 text-[#0084d1]" />
              <span>PACE RATING</span>
            </div>
            <div className="text-2xl font-black text-emerald-600 leading-none">
              Ideal
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">
              6.5h sights / 1.1h road
            </div>
          </div>
        </div>

        {/* Planned Sequence Horizontal Stepper */}
        <div className="pt-2 border-t border-slate-150 space-y-2">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
            PLANNED SEQUENCE
          </div>

          <div className="flex items-center justify-between text-center gap-1 overflow-x-auto py-1">
            {/* Waypoint A */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#0084d1] text-white text-xs font-black flex items-center justify-center shadow-xs">
                A
              </div>
              <span className="text-[9px] font-bold text-slate-700 mt-1">
                Ampara
              </span>
            </div>

            <div className="h-0.5 flex-1 bg-slate-200 mx-1" />

            {/* Dynamic Stops Stepper */}
            {stops.map((stop) => (
              <React.Fragment key={stop.id}>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-black flex items-center justify-center shadow-xs">
                    {stop.order}
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 mt-1 truncate max-w-[50px]">
                    {stop.name.split(" ")[0]}
                  </span>
                </div>
                <div className="h-0.5 flex-1 bg-slate-200 mx-1" />
              </React.Fragment>
            ))}

            {/* Return */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-[9px] font-bold text-slate-700 mt-1">
                Return
              </span>
            </div>
          </div>
        </div>

        {/* Weather & Climate Warning Box */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>29°C Partly Sunny</span>
            </span>
            <span className="text-[10px] font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
              Dry Season
            </span>
          </div>
          <p className="text-amber-800/90 text-[11px] leading-relaxed">
            Gentle eastern breezes. High UV between 11:30 AM and 01:30 PM during
            Buddhangala walk. Carry at least 1.5L drinking water.
          </p>
        </div>

        {/* Big Launch GPS CTA */}
        <button
          type="button"
          onClick={handleLaunchGps}
          className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 hover:shadow-xl transition-all cursor-pointer transform active:scale-[0.99]"
        >
          <Navigation className="w-4 h-4 fill-white" />
          <span>Launch Turn-by-Turn GPS</span>
        </button>
      </div>
    </div>
  );
}
