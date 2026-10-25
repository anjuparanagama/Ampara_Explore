import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, Clock, MapPin, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { PlanStopCardProps } from "@/interface";

export default function PlanStopCard({
  stop,
  index,
  totalStops,
  onMoveStop,
  onDeleteStop,
}: PlanStopCardProps) {
  return (
    <div className="space-y-4">
      {/* Transit Connector */}
      {stop.transitBefore && (
        <div className="relative pl-6 sm:pl-7 my-2">
          <div className="absolute left-5 sm:left-5.5 top-0 bottom-0 w-0.5 bg-slate-300" />

          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-2xs">
            <Car className="w-3.5 h-3.5 text-[#0084d1]" />
            <span>
              <strong className="text-slate-900">
                {stop.transitBefore.duration}
              </strong>{" "}
              ({stop.transitBefore.distance}) {stop.transitBefore.route} •{" "}
              <span className="text-slate-500">
                {stop.transitBefore.traffic}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Stop Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Left Thumbnail Image */}
          <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
            <Image
              src={stop.image}
              alt={stop.name}
              fill
              className="object-cover"
            />
            <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              {stop.categoryTag}
            </span>
          </div>

          {/* Right Details */}
          <div className="flex-1 min-w-0 space-y-1.5">
            {/* Top Time Pill & Actions */}
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0084d1] border border-sky-200 text-xs font-bold">
                <span className="w-4 h-4 rounded-full bg-[#0084d1] text-white text-[10px] flex items-center justify-center font-black">
                  {stop.order}
                </span>
                <span>
                  {stop.timeRange} ({stop.duration})
                </span>
              </span>

              <div className="flex items-center gap-1 text-slate-400">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => onMoveStop(index, "up")}
                    className="p-1 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                )}
                {index < totalStops - 1 && (
                  <button
                    type="button"
                    onClick={() => onMoveStop(index, "down")}
                    className="p-1 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDeleteStop(stop.id)}
                  className="p-1 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer ml-1"
                  title="Delete Stop"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stop Title */}
            <Link
              href={`/attraction/${stop.id}`}
              className="text-base font-black text-slate-900 hover:text-[#0084d1] transition-colors leading-snug block"
            >
              {stop.name}
            </Link>

            {/* Location Subtitle */}
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#0084d1]" />
              <span>{stop.distanceFromTown}</span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 pt-1">
              {stop.description}
            </p>

            {/* Tip Bottom Row */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span
                className={`inline-flex items-center gap-1 font-semibold ${
                  stop.tipType === "green"
                    ? "text-emerald-700"
                    : "text-slate-600"
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>{stop.tip}</span>
              </span>

              <button
                type="button"
                onClick={() => alert(`Duration edit for ${stop.name}`)}
                className="text-[#0084d1] font-bold hover:underline text-[11px] cursor-pointer"
              >
                Edit Duration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
