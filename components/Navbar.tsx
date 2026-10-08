"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenPlan: () => void;
  planCount: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenPlan,
  planCount,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: "home", label: t("navHome") },
    { id: "explore", label: t("navExplore") },
    { id: "map", label: t("navMap") },
    { id: "plan", label: t("navPlan"), hasBadge: true },
  ];

  const handleNavClick = (id: string) => {
    if (id === "plan") {
      window.location.href = "/my-plans";
    } else if (id === "map") {
      window.location.href = "/map";
    } else {
      setActiveTab(id);
      if (window.location.pathname !== "/") {
        window.location.href = id === "home" ? "/" : `/#${id}`;
      } else {
        const element = document.getElementById(id === "home" ? "hero" : id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English (EN)", flag: "🇬🇧" },
    { code: "si", label: "සිංහල (SI)", flag: "🇱🇰" },
    { code: "ta", label: "தமிழ் (TA)", flag: "🇱🇰" },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all hover:shadow-md">
          
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#0284c7] transition-colors">
                  {t("brandTitle")}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#0284c7] uppercase border border-sky-300/60 bg-sky-50/80 px-2 py-0.5 rounded-full w-fit mt-0.5">
                {t("radialHorizon")}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/60">
            {navItems.map((item) => {
              const isActive = activeTab === item.id && item.id !== "plan";
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#0284c7] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasBadge && planCount > 0 && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {planCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Section & Language Selector */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1.5 bg-slate-100/80 hover:bg-slate-200 text-slate-700 border border-slate-200/90 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#0284c7]" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 min-w-[150px] animate-fadeIn">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-1">
                    Language / භාෂාව
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLanguage(l.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                        language === l.code ? "bg-sky-50 text-[#0284c7]" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {language === l.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/login"
              className="hidden sm:inline-block text-sm font-semibold text-[#0284c7] hover:text-[#0369a1] hover:underline cursor-pointer transition-colors px-2 py-1"
            >
              {t("navLogin")}
            </a>

            {/* Profile Avatar */}
            <a
              href="/login"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white ring-2 ring-sky-100 shadow-sm cursor-pointer hover:ring-sky-300 transition-all block"
              title="User Account"
            >
              <Image
                src="/images/avatar.jpg"
                alt="User Avatar"
                fill
                className="object-cover"
                priority
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-lg border border-slate-200 rounded-3xl p-4 shadow-xl flex flex-col gap-2 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-between ${
                  activeTab === item.id && item.id !== "plan"
                    ? "bg-[#0284c7] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{item.label}</span>
                {item.hasBadge && planCount > 0 && (
                  <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {planCount} places
                  </span>
                )}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-150 mt-1 flex justify-between items-center px-2">
              <a
                href="/login"
                className="text-sm font-bold text-[#0284c7] py-2"
              >
                Login / Register
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

