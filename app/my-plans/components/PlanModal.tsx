"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Route,
  X,
  Play,
  Check,
  RotateCcw,
  Navigation,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { SavedPlan } from "@/interface/myPlans.types";

interface PlanModalProps {
  plan: SavedPlan | null;
  onClose: () => void;
  onStartTrip: (planId: string) => void;
  onToggleStopVisited: (planId: string, stopId: string) => void;
  onFinishTrip: (planId: string) => void;
  onRestartTrip: (planId: string) => void;
}

export default function PlanModal({
  plan,
  onClose,
  onStartTrip,
  onToggleStopVisited,
  onFinishTrip,
  onRestartTrip,
}: PlanModalProps) {
  if (!plan) return null;

  const visitedCount = plan.stops.filter((s) => s.visited).length;
  const totalCount = plan.stops.length;
  const progressPct =
    totalCount > 0 ? Math.round((visitedCount / totalCount) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className="relative h-44 sm:h-52 w-full shrink-0 overflow-hidden bg-slate-900">
          <Image
            src={plan.coverImage}
            alt={plan.title}
            fill
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition-all cursor-pointer z-10"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Status & Date */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {plan.status === "in-progress" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/90 text-white text-xs font-bold backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Trip In Progress
              </span>
            ) : plan.status === "completed" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold backdrop-blur-md shadow-sm">
                <Trophy className="w-3.5 h-3.5" />
                Completed Tour
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-slate-800 text-xs font-bold backdrop-blur-md shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                {plan.date}
              </span>
            )}
          </div>

          {/* Title & Stats inside banner bottom */}
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-md">
              {plan.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
              <span className="flex items-center gap-1">
                <Route className="w-3.5 h-3.5 text-sky-400" />
                <span>{plan.totalDistance}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>{plan.allocatedTime}</span>
              </span>
              <span>•</span>
              <span>
                {visitedCount} of {totalCount} places visited
              </span>
            </div>
          </div>
        </div>

        {/* Trip Control Header Strip */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span>Progress:</span>
            <div className="w-28 sm:w-36 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              {progressPct}%
            </span>
          </div>

          {/* Status Action Buttons */}
          <div className="flex items-center gap-2">
            {plan.status === "completed" ? (
              <button
                type="button"
                onClick={() => onRestartTrip(plan.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Tour</span>
              </button>
            ) : plan.status === "in-progress" || progressPct === 100 ? (
              <button
                type="button"
                onClick={() => onFinishTrip(plan.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Tour as Finished</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onStartTrip(plan.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start This Trip</span>
              </button>
            )}
          </div>

        </div>

        {/* Scrollable Places / Stops List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Itinerary Stops &amp; Attractions
            </h3>
            <span className="text-xs text-slate-500">
              Click checkmark to update visited status
            </span>
          </div>

          {plan.stops.map((stop, index) => {
            const isVisited = stop.visited;

            return (
              <div
                key={stop.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isVisited
                    ? "bg-emerald-50/60 border-emerald-200"
                    : "bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs"
                }`}
              >
                {/* Left: Check button & details */}
                <div className="flex items-start gap-3.5 flex-1">
                  {/* Interactive Toggle Checkbox */}
                  <button
                    type="button"
                    onClick={() => onToggleStopVisited(plan.id, stop.id)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs transition-all cursor-pointer mt-0.5 ${
                      isVisited
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "border-2 border-slate-300 hover:border-emerald-500 text-slate-400 hover:text-emerald-600 bg-white"
                    }`}
                    title={
                      isVisited ? "Click to unmark" : "Click to mark as visited"
                    }
                  >
                    {isVisited ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    )}
                  </button>

                  {/* Thumbnail Image */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={stop.image}
                      alt={stop.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Stop Info */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-sm font-bold truncate ${
                          isVisited
                            ? "text-slate-800 line-through opacity-80"
                            : "text-slate-900"
                        }`}
                      >
                        {stop.name}
                      </h4>
                    </div>

                    {stop.notes && (
                      <p className="text-xs text-slate-500 leading-snug line-clamp-1">
                        {stop.notes}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      {stop.location && (
                        <span className="flex items-center gap-0.5 text-slate-600 font-medium">
                          <MapPin className="w-3 h-3 text-sky-600" />
                          <span>{stop.location}</span>
                        </span>
                      )}
                      {stop.distance && (
                        <>
                          <span>•</span>
                          <span>{stop.distance}</span>
                        </>
                      )}
                      {stop.duration && (
                        <>
                          <span>•</span>
                          <span>{stop.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleStopVisited(plan.id, stop.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isVisited
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        : "bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {isVisited ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                        <span>Visited</span>
                      </>
                    ) : (
                      <span>Mark Visited</span>
                    )}
                  </button>

                  <Link
                    href={`/map?place=${encodeURIComponent(stop.name)}`}
                    className="p-2 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                    title="View location on radial map"
                  >
                    <Navigation className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <Link
            href="/map"
            className="text-xs font-semibold text-slate-600 hover:text-sky-600 flex items-center gap-1.5"
          >
            <Route className="w-3.5 h-3.5" />
            <span>Open Full Map Route</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>

            {(plan.status === "in-progress" || (progressPct === 100 && plan.status !== "completed")) && (
              <button
                type="button"
                onClick={() => onFinishTrip(plan.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Finish Trip</span>
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
