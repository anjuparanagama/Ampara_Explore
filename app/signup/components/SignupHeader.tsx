import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SignupHeaderProps } from "@/interface";

export default function SignupHeader({
  homeLinkText = "Back to Home",
}: SignupHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <Link
        href="/"
        className="text-xl font-bold tracking-tight text-sky-600"
      >
        Ampara<span className="text-slate-800"> Explore</span>
      </Link>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600"
      >
        <ArrowLeft className="h-4 w-4" />
        {homeLinkText}
      </Link>
    </header>
  );
}
