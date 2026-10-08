"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  Sparkles,
  Heart,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Camera,
  Shirt,
  VolumeX,
  Footprints,
  Trees,
  Shield,
  ChevronRight,
  Info,
} from "lucide-react";

export default function CulturalGuidelinesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "temples" | "wildlife" | "eco">("all");

  const dosAndDonts = [
    {
      category: "temples",
      dos: [
        "Dress respectfully: Wear clothing covering shoulders and knees (white or light colors preferred).",
        "Remove all footwear, caps, and sunglasses before entering temple sand courtyards (Malhuwa).",
        "Maintain quiet reverence around meditation caves and monastic walking corridors.",
        "Seek permission before photographing resident venerable monks.",
      ],
      donts: [
        "Never pose with your back turned to the Buddha statue for selfies or group photos.",
        "Do not lean on ancient stupa brickwork or sit on sacred moonstones (Sandakada Pahana).",
        "Avoid loud phone conversations, music, or shouting inside hermitages like Buddhangala & Rajagala.",
        "Do not bring alcoholic beverages, meat products, or tobacco onto temple grounds.",
      ],
    },
    {
      category: "wildlife",
      dos: [
        "Maintain a safe distance of at least 50 meters from wild elephants at all times.",
        "Follow wildlife ranger instructions strictly when taking boat safaris from Inginiyagala Jetty.",
        "Always wear fastened life jackets throughout lake excursions on Senanayake Samudraya.",
        "Remain silent and seated when observing elephants swimming between reservoir islands.",
      ],
      donts: [
        "Never feed wild elephants under any circumstance — it endangers both travelers and wildlife.",
        "Do not sound vehicle horns, rev engines, or illuminate high beams at wildlife crossings.",
        "Never use flash photography near nesting water birds or herd matriarchs.",
        "Do not alight from safari jeeps or vehicles inside protected Gal Oya National Park sectors.",
      ],
    },
    {
      category: "eco",
      dos: [
        "Practice 'Leave No Trace' — bring back all your water bottles, snack wrappers, and trash.",
        "Stick to designated walking trails to prevent soil erosion around ancient rock stairs.",
        "Use eco-friendly reef/water-safe sunscreen before swimming in designated reservoir pools.",
        "Support local Ampara village fruit vendors, clay craft artisans, and licensed eco-guides.",
      ],
      donts: [
        "Never pick, dislodge, or take ancient brick fragments, stupa plaster, or carved stones.",
        "Do not dispose of plastic bottles, polly-bags, or cans in reservoirs or waterways.",
        "Never light campfires or discard cigarette butts near dry zone grass or forest reserves.",
        "Do not carve names, graffiti, or markings on boulders, caves, or bark.",
      ],
    },
  ];

  const filteredCategories = activeTab === "all" ? dosAndDonts : dosAndDonts.filter((d) => d.category === activeTab);

  return (
    <div className="min-h-screen bg-[#f3f6fa] flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-[#0284c7] selection:text-white">
      {/* 1. Header Bar */}
      <header className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#0084d1] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
              Ampara <span className="text-[#0084d1] font-extrabold">Explore</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0084d1] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>Back to Explore</span>
            </Link>

            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0084d1] hover:text-[#006699] transition-colors px-2 py-1"
            >
              Explorer Login
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Body Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
          <Link href="/" className="hover:text-[#0084d1]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">Cultural Guidelines</span>
        </div>

        {/* Hero Banner Card */}
        <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-[28px] p-6 sm:p-10 text-white shadow-xl shadow-slate-900/10 mb-8 border border-sky-500/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Heritage & Eco-Preservation Protocol</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              Cultural & Environmental Guidelines
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Ampara is a land of sacred millennia-old Buddhist stupas, thriving elephant corridors, and delicate wetland ecosystems. As explorers, we travel with deep respect, humility, and care.
            </p>
          </div>
        </div>

        {/* Quick Icon Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <Shirt className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900">Modest Clothing</div>
            <div className="text-[11px] text-slate-500">Shoulders & knees covered</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0084d1] flex items-center justify-center mx-auto mb-2">
              <Footprints className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900">Remove Footwear</div>
            <div className="text-[11px] text-slate-500">Before sacred sand terraces</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <Trees className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900">Leave No Trace</div>
            <div className="text-[11px] text-slate-500">Zero plastic littering</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
              <VolumeX className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900">Maintain Silence</div>
            <div className="text-[11px] text-slate-500">Reverence in hermitages</div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#0084d1] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Guidelines
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("temples")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "temples"
                ? "bg-[#0084d1] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            🛕 Ancient Stupas & Monasteries
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("wildlife")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "wildlife"
                ? "bg-[#0084d1] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            🐘 Wild Elephant & Safari Protocol
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("eco")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "eco"
                ? "bg-[#0084d1] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            🌿 Eco & Reservoir Protection
          </button>
        </div>

        {/* Do's and Don'ts Visual Grid */}
        <div className="space-y-8">
          {filteredCategories.map((cat, i) => {
            const titles: Record<string, { label: string; desc: string }> = {
              temples: {
                label: "Ancient Stupas, Monasteries & Sacred Enclosures",
                desc: "Guidelines for Deegawapi Stupa, Buddhangala Hermitage, Rajagala & Magul Maha Viharaya.",
              },
              wildlife: {
                label: "Wild Elephant Corridors & Lake Safaris",
                desc: "Protection guidelines for Gal Oya National Park & Senanayake Samudraya waterways.",
              },
              eco: {
                label: "Environmental Conservation & Leave No Trace",
                desc: "Preserving wetlands, reservoirs, and archaeological rock ruins for future generations.",
              },
            };

            const info = titles[cat.category];

            return (
              <div key={cat.category} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
                <div className="mb-5 pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    {info?.label || cat.category}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {info?.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Do's Column */}
                  <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3.5 text-emerald-800 font-extrabold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>RECOMMENDED (DO)</span>
                    </div>
                    <ul className="space-y-2.5">
                      {cat.dos.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Don'ts Column */}
                  <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100">
                    <div className="flex items-center gap-2 mb-3.5 text-rose-800 font-extrabold text-sm">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>PROHIBITED (DON&apos;T)</span>
                    </div>
                    <ul className="space-y-2.5">
                      {cat.donts.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tourist Police Assistance Box */}
        <div className="mt-8 bg-sky-50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#0084d1] text-white flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Need Immediate Advice or Tourist Police Assistance?</div>
              <div className="text-[11px] text-slate-600">Tourist Police Post, Ampara: +94 63 222 2222 • Wildlife Department: 1992</div>
            </div>
          </div>

          <Link
            href="/my-plans"
            className="px-4 py-2 rounded-xl bg-[#0084d1] hover:bg-[#0070b3] text-xs font-bold text-white transition-colors shrink-0"
          >
            Open My Itinerary
          </Link>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white px-4 sm:px-8 py-4 text-slate-500 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2024 Ampara Regional Discovery Project. 25 km Radial Heritage & Wildlife Portal.
          </div>
          <div className="flex items-center gap-5 font-semibold text-slate-600">
            <Link href="/privacy-policy" className="hover:text-[#0084d1] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#0084d1] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cultural-guidelines" className="text-[#0084d1]">
              Cultural Guidelines
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
