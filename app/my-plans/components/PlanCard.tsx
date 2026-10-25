"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Bookmark,
  Trash2,
  Copy,
  ChevronRight,
  CheckCircle2,
  Route,
  Check,
} from "lucide-react";
import { SavedPlan } from "@/interface/myPlans.types";

interface PlanCardProps {
  plan: SavedPlan;
  onSelect: (plan: SavedPlan) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onDuplicate: (plan: SavedPlan, e: React.MouseEvent) => void;
  onDelete: (id: string, title: string, e: React.MouseEvent) => void;
}

export default function PlanCard({
  plan,
  onSelect,
  onToggleBookmark,
  onDuplicate,
  onDelete,
}: PlanCardProps) {
  const visitedStopsCount = plan.stops.filter((s) => s.visited).length;
  const totalStopsCount = plan.stops.length;
  const progressPct =
    totalStopsCount > 0
      ? Math.round((visitedStopsCount / totalStopsCount) * 100)
      : 0;

  const statusBadge =
    plan.status === "in-progress" ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-300 text-[11px] font-bold shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
        Trip In Progress
      </span>
    ) : plan.status === "upcoming" ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[11px] font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Upcoming
      </span>
    ) : plan.status === "draft" ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/70 text-[11px] font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Draft
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        Completed
      </span>
    );

  return (
    <div
      onClick={() => onSelect(plan)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      {/* Top Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={plan.coverImage}
          alt={plan.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

        {/* Status Tag on Image */}
        <div className="absolute top-3 left-3">{statusBadge}</div>

        {/* Bookmark Toggle */}
        <button
          type="button"
          onClick={(e) => onToggleBookmark(plan.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
            plan.isBookmarked
              ? "bg-sky-600 text-white"
              : "bg-white/80 text-slate-700 hover:bg-white"
          }`}
          title={plan.isBookmarked ? "Remove Bookmark" : "Bookmark Plan"}
        >
          <Bookmark
            className={`w-4 h-4 ${plan.isBookmarked ? "fill-white" : ""}`}
          />
        </button>

        {/* Date Tag on Image Bottom */}
        <div className="absolute bottom-3 left-3 text-white text-[11px] font-medium flex items-center gap-1.5 drop-shadow-sm">
          <Calendar className="w-3.5 h-3.5 opacity-90" />
          <span>{plan.date}</span>
        </div>

        {/* Progress pill on bottom-right if in progress or completed */}
        {(plan.status === "in-progress" || plan.status === "completed") && (
          <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>
              {visitedStopsCount}/{totalStopsCount} Visited
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
            {plan.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* Stops List Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Places ({totalStopsCount})</span>
            <span className="text-slate-500 normal-case font-medium">
              {visitedStopsCount > 0 && `${visitedStopsCount} visited`}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {plan.stops.map((stop) => (
              <span
                key={stop.id}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                  stop.visited
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-slate-50 border border-slate-200 text-slate-600"
                }`}
              >
                {stop.visited ? (
                  <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                ) : (
                  <MapPin className="w-2.5 h-2.5 text-sky-600" />
                )}
                <span className="truncate max-w-[130px]">{stop.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Progress Bar for active plans */}
        {totalStopsCount > 0 &&
          (plan.status === "in-progress" || plan.status === "completed") && (
            <div className="space-y-1">
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

        {/* Metrics Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Route className="w-3.5 h-3.5 text-slate-400" />
            <span>{plan.totalDistance}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{plan.allocatedTime}</span>
          </span>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => onDelete(plan.id, plan.title, e)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Delete itinerary"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/map?planStops=${encodeURIComponent(
              plan.stops.map((s) => s.id).join(","),
            )}&planStopNames=${encodeURIComponent(
              plan.stops.map((s) => s.name).join("|"),
            )}&planTitle=${encodeURIComponent(plan.title)}`}
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1"
          >
            <Route className="w-3 h-3" />
            <span>Map Route</span>
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(plan);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shadow-2xs cursor-pointer ${
              plan.status === "in-progress"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-sky-600 hover:bg-sky-700 text-white"
            }`}
          >
            <span>
              {plan.status === "in-progress"
                ? "Continue Tour"
                : plan.status === "completed"
                  ? "View Tour"
                  : "View Plan"}
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
