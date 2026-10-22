import React from "react";
import Image from "next/image";
import { RegisterHeroShowcaseProps } from "@/interface";

export default function RegisterHeroShowcase({
  tagline = "Ampara, Sri Lanka",
  heading = "Start your journey. Explore beautiful places.",
  description = "Discover reservoirs, wildlife, heritage and unforgettable experiences across the heart of Ampara.",
  imageSrc = "/images/login-bg.jpg",
  imageAlt = "A peaceful reservoir in Ampara",
}: RegisterHeroShowcaseProps) {
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-sky-600 lg:block">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="55vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-sky-600/75 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/70 via-cyan-500/35 to-sky-900/55" />
      <div className="relative z-10 flex min-h-dvh items-center px-10 py-16 xl:px-20">
        <div className="max-w-lg text-white">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-sky-100">
            {tagline}
          </p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight xl:text-6xl">
            {heading}
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-sky-50">
            {description}
          </p>
          <div className="mt-10 flex items-center gap-2">
            <span className="h-2.5 w-8 rounded-full bg-white" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </aside>
  );
}
