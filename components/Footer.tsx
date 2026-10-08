"use client";

import React from "react";
import { MapPin, Mail, Phone, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2">
            <div className="flex flex-col mb-4">
              <span className="text-xl font-extrabold text-white tracking-tight">
                {t("brandTitle")}
              </span>
              <span className="text-[10px] font-bold tracking-wider text-sky-400 uppercase mt-0.5">
                {t("radialHorizon")}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mb-6">
              {t("footerBio")}
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-300">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>Ampara District Secretariat Zone • Eastern Province</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#map" className="hover:text-sky-300 transition-colors">0 - 5 km Town Hub & Lake Promenade</a></li>
              <li><a href="#map" className="hover:text-sky-300 transition-colors">5 - 15 km Mid Forest Sanctuaries</a></li>
              <li><a href="#map" className="hover:text-sky-300 transition-colors">15 - 25 km Gal Oya Safari Frontier</a></li>
              <li><a href="#explore" className="hover:text-sky-300 transition-colors">Archaeological Heritage Sites</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              {t("heritageWildlife")}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Tourist Police: +94 63 222 2222</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>info@amparaexplore.lk</span>
              </li>
              <li className="pt-2">
                <span className="inline-block bg-sky-950 text-sky-300 text-[11px] font-bold px-3 py-1 rounded-full border border-sky-800">
                  Safe & Verified Travel Zone
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>{t("copyright")}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold text-slate-400 text-xs">
            <a href="/privacy-policy" className="hover:text-sky-300 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-sky-300 transition-colors">Terms of Service</a>
            <a href="/cultural-guidelines" className="hover:text-sky-300 transition-colors">Cultural Guidelines</a>
          </div>
          <p className="flex items-center gap-1 text-slate-400">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for explorers in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}


