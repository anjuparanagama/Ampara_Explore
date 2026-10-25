"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PlanHeaderProps {
  userName?: string | null;
  onCreatePlan?: () => void;
}

export default function PlanHeader({
  userName,
  onCreatePlan,
}: PlanHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          {t("navHome")}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{t("myPlansTitle")}</span>
      </div>

      {/* Main Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {userName ? `${t("welcomeExplorer")}, ${userName}` : t("myPlansTitle")}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {t("myPlansSubtitle")}
          </p>
        </div>

        {onCreatePlan ? (
          <button
            type="button"
            onClick={onCreatePlan}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold text-sm shadow-sm shadow-sky-600/20 hover:shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{t("createNewPlan")}</span>
          </button>
        ) : (
          <Link
            href="/plan"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold text-sm shadow-sm shadow-sky-600/20 hover:shadow-md transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{t("createNewPlan")}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
