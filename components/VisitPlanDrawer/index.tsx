"use client";

import React from "react";
import Image from "next/image";
import { Attraction } from "@/data/amparaData";
import { X, Trash2, Calendar, ArrowRight, Compass } from "lucide-react";

interface VisitPlanDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  visitPlan: Attraction[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function VisitPlanDrawer({
  isOpen,
  onClose,
  visitPlan,
  onRemove,
  onClear,
}: VisitPlanDrawerProps) {
  if (!isOpen) return null;

  const totalDistance = visitPlan.reduce((sum, item) => sum + item.distanceKm, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">My 1-Day Visit Plan</h3>
              <span className="text-xs text-slate-500 font-medium">
                {visitPlan.length} {visitPlan.length === 1 ? "place" : "places"} selected
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Items */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {visitPlan.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <Compass className="w-12 h-12 text-slate-300 mb-3" />
              <h4 className="font-bold text-slate-800 text-base">Your itinerary is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                Browse through Ampara attractions and click Add to assemble your customized sequence.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visitPlan.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 relative group"
                >
                  <span className="w-6 h-6 rounded-full bg-[#0284c7] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>

                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-900 text-xs truncate">
                      {item.name}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{item.distanceKm} km</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {visitPlan.length > 0 && (
          <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
              <span>Estimated Circuit Distance:</span>
              <strong className="text-slate-900 font-bold text-sm">~{totalDistance} km radial travel</strong>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClear}
                className="w-1/3 py-2.5 rounded-full border border-slate-300 text-slate-700 font-bold text-xs hover:bg-white transition-colors cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  alert("Your customized Ampara travel route itinerary has been generated!");
                  onClose();
                }}
                className="w-2/3 py-2.5 rounded-full bg-[#006699] hover:bg-[#0284c7] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Generate Smart Route</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

