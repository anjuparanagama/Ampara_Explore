"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  FileCheck2,
  Shield,
  MapPin,
  AlertTriangle,
  FileText,
  Scale,
  Compass as CompassIcon,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function TermsOfServicePage() {
  const lastUpdated = "October 2024 (Version 1.8)";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: <FileCheck2 className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            By accessing or using the <strong className="text-slate-800">Ampara Explore (25 KM Radial Horizon)</strong> tourism portal and mobile web app, you agree to comply with and be bound by these Terms of Service, all applicable laws of Sri Lanka, and local municipal bylaws of the Ampara District Secretariat.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            If you disagree with any part of these terms, you should immediately cease use of the portal and its itinerary planning tools.
          </p>
        </>
      ),
    },
    {
      id: "accounts",
      title: "2. Explorer Accounts & Pass ID Eligibility",
      icon: <Shield className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            When you register for an official Ampara Explorer ID:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            <li>You agree to provide true, accurate, and up-to-date personal information.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>Your issued Explorer Pass Code is non-transferable and represents your verified digital profile for local tourism discounts and ranger alerts.</li>
            <li>Accounts engaging in fraudulent bookings or defamatory content will be revoked without notice.</li>
          </ul>
        </>
      ),
    },
    {
      id: "radial-tools",
      title: "3. 25 KM Radial Horizon & Navigation Disclaimer",
      icon: <CompassIcon className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            The Ampara Explore platform provides a curated radial mapping system centered on the Ampara Clock Tower:
          </p>
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed mb-3 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Notice:</strong> Radial distances represent straight-line geographic distances. Actual road navigation distances, terrain variations, gravel bund roads, and seasonal reservoir water levels may impact actual travel duration. Always check local trail markers.
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Wildlife movement, irrigation reservoir discharge, and weather conditions in the Eastern Province are unpredictable. Travelers are advised to consult designated wildlife rangers at the Inginiyagala Wildlife Jetty before boat journeys.
          </p>
        </>
      ),
    },
    {
      id: "heritage-laws",
      title: "4. Cultural Preservation & Sri Lanka Antiquities Law",
      icon: <Scale className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            All historical sites indexed on this platform (including Deegawapi Stupa, Buddhangala Monastery, Rajagala Forest Hermitage, and Magul Maha Viharaya) are legally protected under the <strong className="text-slate-800">Antiquities Ordinance No. 9 of 1940</strong> of Sri Lanka:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            <li>Vandalism, graffiti, or unauthorized removal of archaeological artifacts, bricks, or rocks is a criminal offense punishable by federal law.</li>
            <li>Visitors must strictly adhere to our <Link href="/cultural-guidelines" className="text-[#0084d1] font-bold underline">Cultural Guidelines</Link> regarding temple dress codes and photography protocols.</li>
          </ul>
        </>
      ),
    },
    {
      id: "liability",
      title: "5. Limitation of Liability",
      icon: <FileText className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Ampara Explore functions as an informative regional discovery tool. Under no circumstances shall the platform administrators or regional discovery project contributors be liable for:
          </p>
          <ul className="space-y-1.5 text-sm text-slate-600 list-disc list-inside">
            <li>Injuries or incidents occurring during independent trekking, safari excursions, or reservoir swimming.</li>
            <li>Direct, indirect, or incidental delays arising from seasonal wildlife road blockages or weather events.</li>
            <li>Discrepancies in third-party boat safari service rates or accommodation bookings.</li>
          </ul>
        </>
      ),
    },
  ];

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
          <span className="text-slate-800 font-bold">Terms of Service</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-900/5 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Regional Portal Agreement</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Terms of Service
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Rules and responsibilities governing use of the Ampara Explore radial discovery platform.
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-500 shrink-0">
              <span className="font-bold text-slate-700 block">Jurisdiction: Sri Lanka</span>
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Table of Contents Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Jump to:</span>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#0084d1] text-slate-700 transition-colors"
              >
                {s.title.split(".")[1]?.trim()}
              </a>
            ))}
          </div>
        </div>

        {/* Section Cards */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm scroll-mt-24 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 border border-sky-100">
                  {section.icon}
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {section.title}
                </h2>
              </div>

              <div className="pt-2">{section.content}</div>
            </div>
          ))}
        </div>

        {/* Quick Link Footer Navigator */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-sm font-bold text-slate-900">Explore Additional Policies</div>
            <div className="text-xs text-slate-500">Read our privacy protocols and cultural conservation guidelines.</div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy-policy"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cultural-guidelines"
              className="px-4 py-2 rounded-xl bg-[#0084d1] hover:bg-[#0070b3] text-xs font-bold text-white transition-colors"
            >
              Cultural Guidelines
            </Link>
          </div>
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
            <Link href="/terms-of-service" className="text-[#0084d1]">
              Terms of Service
            </Link>
            <Link href="/cultural-guidelines" className="hover:text-[#0084d1] transition-colors">
              Cultural Guidelines
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
