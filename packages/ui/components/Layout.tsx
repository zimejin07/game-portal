"use client";

import { BRAND_CONFIG, MARKET_TO_BRAND } from "@repo/constants/brandConfig";
import { useParams } from "next/navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  const { market } = useParams();
  // Determine the correct brand based on the market
  const brandKey = MARKET_TO_BRAND[market as keyof typeof MARKET_TO_BRAND];
  const brand = BRAND_CONFIG[brandKey as keyof typeof BRAND_CONFIG];

  return (
    <div
      className="p-6"
      style={{ "--brand-color": brand.primaryColor } as React.CSSProperties}
    >
      <header className="p-4 bg-[var(--brand-color)] text-white text-center">
        <h1 className="text-2xl font-bold">{brand.name}</h1>
      </header>
      {children}
    </div>
  );
}
