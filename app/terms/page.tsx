"use client";

import React from "react";
import Link from "next/link";
import {
  FileCheck2,
  Shield,
  AlertTriangle,
  FileText,
  Scale,
  Compass,
} from "lucide-react";
import { TermsSection } from "@/interface";
import {
  TermsHeader,
  TermsBreadcrumbs,
  TermsHero,
  TermsSectionCard,
  TermsFooterNavigator,
} from "./components";

export default function TermsPage() {
  const lastUpdated = "October 2024 (Version 1.8)";

  const sections: TermsSection[] = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: <FileCheck2 className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            By accessing or using the{" "}
            <strong className="text-slate-800">
              Ampara Explore (25 KM Radial Horizon)
            </strong>{" "}
            tourism portal and mobile web app, you agree to comply with and be
            bound by these Terms of Service, all applicable laws of Sri Lanka,
            and local municipal bylaws of the Ampara District Secretariat.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            If you disagree with any part of these terms, you should immediately
            cease use of the portal and its itinerary planning tools.
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
            <li>
              You agree to provide true, accurate, and up-to-date personal
              information.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              Your issued Explorer Pass Code is non-transferable and represents
              your verified digital profile for local tourism discounts and
              ranger alerts.
            </li>
            <li>
              Accounts engaging in fraudulent bookings or defamatory content
              will be revoked without notice.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "radial-tools",
      title: "3. 25 KM Radial Horizon & Navigation Disclaimer",
      icon: <Compass className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            The Ampara Explore platform provides a curated radial mapping system
            centered on the Ampara Clock Tower:
          </p>
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed mb-3 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Notice:</strong> Radial distances represent
              straight-line geographic distances. Actual road navigation
              distances, terrain variations, gravel bund roads, and seasonal
              reservoir water levels may impact actual travel duration. Always
              check local trail markers.
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Wildlife movement, irrigation reservoir discharge, and weather
            conditions in the Eastern Province are unpredictable. Travelers are
            advised to consult designated wildlife rangers at the Inginiyagala
            Wildlife Jetty before boat journeys.
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
            All historical sites indexed on this platform (including Deegawapi
            Stupa, Buddhangala Monastery, Rajagala Forest Hermitage, and Magul
            Maha Viharaya) are legally protected under the{" "}
            <strong className="text-slate-800">
              Antiquities Ordinance No. 9 of 1940
            </strong>{" "}
            of Sri Lanka:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            <li>
              Vandalism, graffiti, or unauthorized removal of archaeological
              artifacts, bricks, or rocks is a criminal offense punishable by
              federal law.
            </li>
            <li>
              Visitors must strictly adhere to our{" "}
              <Link
                href="/cultural-guidelines"
                className="text-[#0084d1] font-bold underline"
              >
                Cultural Guidelines
              </Link>{" "}
              regarding temple dress codes and photography protocols.
            </li>
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
            Ampara Explore functions as an informative regional discovery tool.
            Under no circumstances shall the platform administrators or regional
            discovery project contributors be liable for:
          </p>
          <ul className="space-y-1.5 text-sm text-slate-600 list-disc list-inside">
            <li>
              Injuries or incidents occurring during independent trekking,
              safari excursions, or reservoir swimming.
            </li>
            <li>
              Direct, indirect, or incidental delays arising from seasonal
              wildlife road blockages or weather events.
            </li>
            <li>
              Discrepancies in third-party boat safari service rates or
              accommodation bookings.
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f6fa] flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-[#0284c7] selection:text-white">
      {/* 1. Header Bar */}
      <TermsHeader />

      {/* 2. Main Body Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <TermsBreadcrumbs />

        {/* Hero Card */}
        <TermsHero lastUpdated={lastUpdated} sections={sections} />

        {/* Section Cards */}
        <div className="space-y-6">
          {sections.map((section) => (
            <TermsSectionCard key={section.id} section={section} />
          ))}
        </div>

        {/* Quick Link Footer Navigator */}
        <TermsFooterNavigator />
      </main>
    </div>
  );
}
