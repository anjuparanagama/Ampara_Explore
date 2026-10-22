import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import PublicLayout from "@/components/PublicLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ampara Explore",
  description:
    "Explore pristine reservoirs, sacred centuries-old stupas, and roaming wild elephant herds nestled within a 25 km radial horizon in Ampara, Sri Lanka.",
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-[#0284c7] selection:text-white"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Suspense fallback={<div className="min-h-screen">{children}</div>}>
            <PublicLayout>{children}</PublicLayout>
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  );
}
