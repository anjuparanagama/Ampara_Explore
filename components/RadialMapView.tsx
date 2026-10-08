"use client";

import React, { useState } from "react";
import { amparaAttractions, Attraction } from "@/data/amparaData";
import { Target, Compass, Sparkles } from "lucide-react";

interface RadialMapViewProps {
  onSelectAttraction: (attraction: Attraction) => void;
}

export default function RadialMapView({ onSelectAttraction }: RadialMapViewProps) {
  const [activePin, setActivePin] = useState<Attraction | null>(amparaAttractions[0]);
  const [filterRadius, setFilterRadius] = useState<number>(25);

  const calculateRadarPos = (distanceKm: number, angleDeg: number) => {
    const scale = 210 / 25;
    const r = Math.min(distanceKm * scale, 215);
    const rad = (angleDeg - 90) * (Math.PI / 180);
    const cx = 250;
    const cy = 250;
    const x = Math.round((cx + r * Math.cos(rad)) * 10) / 10;
    const y = Math.round((cy + r * Math.sin(rad)) * 10) / 10;
    return { x, y };
  };

  const angleMapping: Record<string, number> = {
    "senanayake-samudraya": 235,
    "kondawattuwan-lake": 340,
    "panama-kudumbigala": 150,
    "gal-oya-national-park": 255,
    "lahugala-kitulana-national-park": 205,
    "kumana-national-park": 175,
    "deegawapi-stupa": 115,
    "buddhangala-monastery": 35,
    "ampara-peace-pagoda": 185,
    "okanda-devalaya": 165,
    "rajagala-archaeological-site": 310,
    "muhudu-maha-viharaya": 110,
    "neelagiriseya-archaeological-site": 195,
    "arugam-bay-beach": 135,
    "panama-beach-lagoon": 155,
    "whisky-point-beach": 125,
    "rambakan-oya-cascade": 295,
    "karangawa-waterfalls": 20,
    "kanchikudiaru-waterfalls": 225,
    "magul-maha-viharaya": 215,
    "ampara-handloom-village": 65,
    "oluvil-lighthouse-harbour": 90,
  };

  return (
    <section id="map" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-extrabold tracking-widest text-[#0084d1] uppercase block mb-1.5">
          SPATIAL INTELLIGENCE
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          25 km Radial Horizon Map
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Visualizing all attractions originating from Ampara Town Clock Tower (0 km) across 5km concentric discovery zones.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col items-center relative">
          <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center bg-slate-950 rounded-3xl p-4 shadow-2xl overflow-hidden border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/40 via-transparent to-slate-900" />
            
            <svg viewBox="0 0 500 500" className="w-full h-full relative z-10">
              {/* 5 km */}
              <circle cx="250" cy="250" r="42" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <text x="255" y="215" fill="#38bdf8" fontSize="10" fontWeight="bold" opacity="0.8">5 km</text>

              {/* 10 km */}
              <circle cx="250" cy="250" r="84" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <text x="255" y="173" fill="#38bdf8" fontSize="10" fontWeight="bold" opacity="0.8">10 km</text>

              {/* 15 km */}
              <circle cx="250" cy="250" r="126" fill="none" stroke="#0284c7" strokeWidth="1.5" opacity="0.5" />
              <text x="255" y="131" fill="#38bdf8" fontSize="10" fontWeight="bold" opacity="0.8">15 km</text>

              {/* 20 km */}
              <circle cx="250" cy="250" r="168" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <text x="255" y="89" fill="#38bdf8" fontSize="10" fontWeight="bold" opacity="0.8">20 km</text>

              {/* 25 km Outer Bound */}
              <circle cx="250" cy="250" r="210" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
              <text x="255" y="47" fill="#7dd3fc" fontSize="11" fontWeight="bold">25 km Max Horizon</text>

              {/* Crosshairs */}
              <line x1="250" y1="35" x2="250" y2="465" stroke="#0369a1" strokeWidth="1" opacity="0.3" />
              <line x1="35" y1="250" x2="465" y2="250" stroke="#0369a1" strokeWidth="1" opacity="0.3" />

              {/* Center Origin: Ampara Town */}
              <circle cx="250" cy="250" r="8" fill="#38bdf8" />
              <circle cx="250" cy="250" r="16" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
              <text x="250" y="275" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                Ampara Hub (0 km)
              </text>

              {/* Attraction Pin Markers */}
              {amparaAttractions.map((attraction) => {
                const angle = angleMapping[attraction.id] || 45;
                const { x, y } = calculateRadarPos(attraction.distanceKm, angle);
                const isSelected = activePin?.id === attraction.id;
                const isVisible = attraction.distanceKm <= filterRadius;

                if (!isVisible) return null;

                return (
                  <g
                    key={attraction.id}
                    onClick={() => setActivePin(attraction)}
                    className="cursor-pointer transition-all duration-300"
                  >
                    {isSelected && (
                      <circle cx={x} cy={y} r="14" fill="#38bdf8" opacity="0.3" />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 7 : 5}
                      fill={isSelected ? "#38bdf8" : "#f59e0b"}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      fill={isSelected ? "#ffffff" : "#cbd5e1"}
                      fontSize="9"
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="pointer-events-none"
                    >
                      {attraction.name.split(" ")[0]} ({attraction.distanceKm}k)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 w-full max-w-sm flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-full px-4 py-2">
            <span className="text-xs font-bold text-slate-700">Filter Radius:</span>
            <input
              type="range"
              min="5"
              max="25"
              step="5"
              value={filterRadius}
              onChange={(e) => setFilterRadius(Number(e.target.value))}
              className="w-32 accent-[#0284c7] cursor-pointer"
            />
            <span className="text-xs font-extrabold text-[#0284c7] bg-sky-100 px-2.5 py-0.5 rounded-full">
              {filterRadius} km
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center">
          {activePin ? (
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-inner flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="bg-sky-100 text-[#0284c7] text-xs font-extrabold px-3 py-1 rounded-full">
                  {activePin.category}
                </span>
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-[#0284c7]" />
                  {activePin.distanceKm} km from Clock Tower
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1.5">
                  {activePin.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activePin.description}
                </p>
              </div>

              <div className="space-y-1.5 bg-white p-3 rounded-2xl border border-slate-200/80">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Highlights</div>
                {activePin.highlights.map((h, i) => (
                  <div key={i} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-600">
                  Recommended duration: <strong className="text-slate-900">{activePin.duration}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectAttraction(activePin)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    Quick Preview
                  </button>
                  <a
                    href={`/attraction/${activePin.id}`}
                    className="bg-[#006699] hover:bg-[#0284c7] text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors"
                  >
                    Full Details →
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-slate-500">
              Click on any pin on the radar map to inspect distance and details.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

