"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  Check,
  LogOut,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id?: string;
    name?: string;
    email?: string;
    role?: string;
  } | null>(null);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const syncAuthState = async () => {
    try {
      const response = await fetch("/api/auth/me", { cache: "no-store" });
      const result = await response.json();
      if (result?.user) {
        setIsAuthenticated(true);
        setCurrentUser(result.user);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    syncAuthState();
    window.addEventListener("ampara-auth-change", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(target)
      ) {
        setShowLangDropdown(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("ampara-auth-change", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setCurrentUser(null);
      setUserDropdownOpen(false);
      window.dispatchEvent(new Event("ampara-auth-change"));
      if (pathname.startsWith("/admin")) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { id: "home", label: t("navHome") },
    { id: "explore", label: t("navExplore") },
    { id: "map", label: t("navMap") },
  ];

  const handleNavClick = (id: string) => {
    if (id === "map") {
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

  const currentLangObj =
    languages.find((l) => l.code === language) || languages[0];

  return (
    <header
      className={`${
        pathname === "/" ? "absolute" : "relative"
      } top-0 left-0 z-50 w-full px-4 pt-3 pb-2 transition-all duration-300 sm:px-6 lg:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white backdrop-blur-md border border-slate-200/80 shadow-sm rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all hover:shadow-md">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center text-left group cursor-pointer focus:outline-none"
            aria-label={t("brandTitle")}
          >
            <Image
              src="/logo.png"
              alt={t("brandTitle")}
              width={217}
              height={72}
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <span className="sr-only">{t("brandTitle")}</span>
          </button>

          {/* Desktop Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1  p-1 rounded-full ">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
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
                </button>
              );
            })}
          </nav>

          {/* User Section & Language Selector */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
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
                        language === l.code
                          ? "bg-sky-50 text-[#0284c7]"
                          : "text-slate-700 hover:bg-slate-100"
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

            {/* Desktop User Section */}
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="relative block h-9 w-9 cursor-pointer overflow-hidden rounded-full border-2 border-white shadow-sm ring-2 ring-sky-100 transition-all hover:ring-sky-300 focus:outline-none sm:h-10 sm:w-10"
                  title={currentUser?.name || "User Account"}
                  aria-label="User profile menu"
                >
                  <Image
                    src="/images/avatar.jpg"
                    alt="User Avatar"
                    fill
                    className="object-cover"
                    priority
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {currentUser?.name || t("explorer")}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {currentUser?.email || ""}
                      </p>
                    </div>

                    <div className="py-1">
                      {currentUser?.role === "admin" && (
                        <a
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0284c7] rounded-xl transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-sky-600" />
                          <span>{t("navAdmin")}</span>
                        </a>
                      )}
                      <a
                        href="/my-plans"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0284c7] rounded-xl transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-sky-600" />
                        <span>{t("navMyPlans")}</span>
                      </a>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>{t("navLogout")}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="hidden sm:inline-block text-sm font-semibold text-[#0284c7] hover:text-[#0369a1] hover:underline cursor-pointer transition-colors px-2 py-1"
              >
                {t("navLogin")}
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
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
                  activeTab === item.id
                    ? "bg-[#0284c7] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
            <div className="pt-2 border-t border-slate-150 mt-1 px-2">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2.5 py-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                      <Image
                        src="/images/avatar.jpg"
                        alt="User Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-bold text-slate-800 truncate">
                        {currentUser?.name || t("explorer")}
                      </span>
                      <span className="text-xs text-slate-500 truncate">
                        {currentUser?.email || ""}
                      </span>
                    </div>
                  </div>

                  {currentUser?.role === "admin" && (
                    <a
                      href="/admin"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-sky-50 rounded-xl"
                    >
                      <ShieldCheck className="w-4 h-4 text-sky-600" />
                      <span>{t("navAdmin")}</span>
                    </a>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t("navLogout")}</span>
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className="block text-sm font-bold text-[#0284c7] py-2"
                >
                  {t("navLogin")}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
