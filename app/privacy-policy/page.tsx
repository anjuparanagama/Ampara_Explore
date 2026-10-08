"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Eye,
  Database,
  MapPin,
  FileText,
  Mail,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2024 (Version 2.4)";

  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      icon: <Database className="w-5 h-5 text-[#0084d1]" />,
      content: (
        <>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Ampara Explore collects necessary information to offer you an authentic, safe, and personalized 25 km radial discovery experience in the Eastern Province of Sri Lanka. We collect:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            <li>
              <strong className="text-slate-800">Account Credentials:</strong> Full name, verified email address, contact/WhatsApp number, and encrypted password.
            </li>
            <li>
              <strong className="text-slate-800">Travel Preferences:</strong> Interests such as wildlife safaris, ancient stupas, reservoir boat trips, and eco-camping.
            </li>
            <li>
              <strong className="text-slate-800">Real-Time Radial Horizon Geolocation:</strong> Temporary GPS coordinates (used only when permitted to calculate radial distance from the Ampara town center or current location to indexed sites).
            </li>
            <li>
              <strong className="text-slate-800">Visit Plans & Custom Itineraries:</strong> Saved attractions, custom waypoints, notes, and visit route sequences.
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
            Your data is strictly utilized for the functional enhancement of your travel planning:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>25 KM Radial Filtering</span>
              </div>
              <p className="text-xs text-slate-500">
                To accurately measure radial distance to sanctuaries like Gal Oya and Senanayake Samudraya.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Wildlife & Safari Alerts</span>
              </div>
              <p className="text-xs text-slate-500">
                To alert registered explorers regarding seasonal elephant crossings and sunrise boat safari departures.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Synchronized Itineraries</span>
              </div>
              <p className="text-xs text-slate-500">
                Ensures your 1-day visit plan is preserved across devices and available offline.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-xs text-slate-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Safety Protocol Compliance</span>
              </div>
              <p className="text-xs text-slate-500">
                Connecting with local tourist police and ranger stations during emergencies.
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
            In compliance with the <strong className="text-slate-800">Sri Lanka Personal Data Protection Act No. 9 of 2022</strong>, we implement rigorous technical safeguards:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            <li>All transit data is encrypted via 256-bit Secure Socket Layer (SSL/TLS).</li>
            <li>Passwords are hashed with industry-standard one-way cryptography and never stored in plain text.</li>
            <li>We do not sell, rent, or monetize your personal travel data to commercial advertisers.</li>
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
            As a registered Ampara Explorer, you retain full sovereignty over your information:
          </p>
          <div className="space-y-2 text-sm text-slate-600">
            <p>• <strong className="text-slate-800">Access & Export:</strong> Request a digital export of your saved itineraries and profile history.</p>
            <p>• <strong className="text-slate-800">Rectification:</strong> Update or modify your email, phone, or travel interest tags at any time.</p>
            <p>• <strong className="text-slate-800">Account Erasure:</strong> Request permanent deletion of your Explorer ID and all associated itinerary records.</p>
            <p>• <strong className="text-slate-800">Notification Preferences:</strong> Opt out of seasonal ranger SMS alerts without losing core platform features.</p>
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
            Data Protection & Privacy Officer
          </p>
          <p className="text-xs text-slate-600 mb-3">
            Ampara Regional Tourism & Digital Discovery Project, District Secretariat, Ampara, Sri Lanka.
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
        {/* Breadcrumb & Pill */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
          <Link href="/" className="hover:text-[#0084d1]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">Privacy Policy</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-900/5 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#006699] text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Official Data Protection Document</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                How we protect and handle your personal data across the 25 KM Radial Horizon portal.
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-500 shrink-0">
              <span className="font-bold text-slate-700 block">Status: Verified</span>
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Table of Contents Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Sections:</span>
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
            <div className="text-sm font-bold text-slate-900">Explore Additional Legal & Cultural Policies</div>
            <div className="text-xs text-slate-500">Read our terms of service and sacred cultural preservation guidelines.</div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/terms-of-service"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
            >
              Terms of Service
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
            <Link href="/privacy-policy" className="text-[#0084d1]">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#0084d1] transition-colors">
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
