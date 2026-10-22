"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const standaloneRoutes = new Set(["/admin", "/login", "/signup"]);

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab =
    pathname === "/" ? "home" : pathname === "/map" ? "map" : "explore";

  if (standaloneRoutes.has(pathname)) {
    return children;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={() => undefined}
      />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
