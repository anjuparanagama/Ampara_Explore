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
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon.ico" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
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
