"use client";

import React from "react";
import {
  Database,
  Eye,
  Lock,
  FileText,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { PrivacyPolicySection } from "@/interface";
import {
  PrivacyHeader,
  PrivacyBreadcrumbs,
  PrivacyHero,
  PrivacySectionCard,
  PrivacyFooterNavigator,
} from "./components";

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2024 (Version 2.4)";

  const sections: PrivacyPolicySection[] = [
    {
      id: "collection",
      title: "1. Information We Collect",
      icon: <Database className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Ampara Explore collects necessary information to offer you an
            authentic, safe, and personalized 25 km radial discovery experience
            in the Eastern Province of Sri Lanka. We collect:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            <li>
              <strong className="text-slate-800">Account Credentials:</strong>{" "}
              Full name, verified email address, contact/WhatsApp number, and
              encrypted password.
            </li>
            <li>
              <strong className="text-slate-800">Travel Preferences:</strong>{" "}
              Interests such as wildlife safaris, ancient stupas, reservoir boat
              trips, and eco-camping.
            </li>
            <li>
              <strong className="text-slate-800">
                Real-Time Radial Horizon Geolocation:
              </strong>{" "}
              Temporary GPS coordinates (used only when permitted to calculate
              radial distance from the Ampara town center or current location to
              indexed sites).
            </li>
            <li>
              <strong className="text-slate-800">
                Visit Plans &amp; Custom Itineraries:
              </strong>{" "}
              Saved attractions, custom waypoints, notes, and visit route
              sequences.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "usage",
      title: "2. How We Use Your Data",
      icon: <Eye className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Your data is strictly utilized for the functional enhancement of
            your travel planning:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>25 KM Radial Filtering</span>
              </div>
              <p className="text-xs text-slate-500">
                To accurately measure radial distance to sanctuaries like Gal
                Oya and Senanayake Samudraya.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Wildlife &amp; Safari Alerts</span>
              </div>
              <p className="text-xs text-slate-500">
                To alert registered explorers regarding seasonal elephant
                crossings and sunrise boat safari departures.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Synchronized Itineraries</span>
              </div>
              <p className="text-xs text-slate-500">
                Ensures your 1-day visit plan is preserved across devices and
                available offline.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Safety Protocol Compliance</span>
              </div>
              <p className="text-xs text-slate-500">
                Connecting with local tourist police and ranger stations during
                emergencies.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "protection",
      title: "3. Data Protection & 256-Bit Security",
      icon: <Lock className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            In compliance with the{" "}
            <strong className="text-slate-800">
              Sri Lanka Personal Data Protection Act No. 9 of 2022
            </strong>
            , we implement rigorous technical safeguards:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            <li>
              All transit data is encrypted via 256-bit Secure Socket Layer
              (SSL/TLS).
            </li>
            <li>
              Passwords are hashed with industry-standard one-way cryptography
              and never stored in plain text.
            </li>
            <li>
              We do not sell, rent, or monetize your personal travel data to
              commercial advertisers.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "rights",
      title: "4. Your Privacy Rights",
      icon: <FileText className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            As a registered Ampara Explorer, you retain full sovereignty over
            your information:
          </p>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              • <strong className="text-slate-800">Access &amp; Export:</strong>{" "}
              Request a digital export of your saved itineraries and profile
              history.
            </p>
            <p>
              • <strong className="text-slate-800">Rectification:</strong>{" "}
              Update or modify your email, phone, or travel interest tags at any
              time.
            </p>
            <p>
              • <strong className="text-slate-800">Account Erasure:</strong>{" "}
              Request permanent deletion of your Explorer ID and all associated
              itinerary records.
            </p>
            <p>
              •{" "}
              <strong className="text-slate-800">
                Notification Preferences:
              </strong>{" "}
              Opt out of seasonal ranger SMS alerts without losing core platform
              features.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "contact",
      title: "5. Contact Our Privacy Office",
      icon: <Mail className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900 mb-1">
            Data Protection &amp; Privacy Officer
          </p>
          <p className="text-xs text-slate-600 mb-3">
            Ampara Regional Tourism &amp; Digital Discovery Project, District
            Secretariat, Ampara, Sri Lanka.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#006699]">
            <span>Email: privacy@amparaexplore.lk</span>
            <span>Hotline: +94 63 222 2222</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f6fa] flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-[#0284c7] selection:text-white">
      {/* 1. Header Bar */}
      <PrivacyHeader />

      {/* 2. Main Body Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb & Pill */}
        <PrivacyBreadcrumbs />

        {/* Hero Card */}
        <PrivacyHero lastUpdated={lastUpdated} sections={sections} />

        {/* Section Cards */}
        <div className="space-y-6">
          {sections.map((section) => (
            <PrivacySectionCard key={section.id} section={section} />
          ))}
        </div>

        {/* Quick Link Footer Navigator */}
        <PrivacyFooterNavigator />
      </main>
    </div>
  );
}
