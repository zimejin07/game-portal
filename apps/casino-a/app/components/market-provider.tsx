"use client";

import { useParams } from "next/navigation";
import { BRAND_CONFIG } from "@repo/constants/brandConfig";

export default function MarketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { market } = useParams();
  const brand =
    BRAND_CONFIG[market as keyof typeof BRAND_CONFIG] ||
    BRAND_CONFIG["casino-a"];

  return (
    <div style={{ "--brand-color": brand.primaryColor } as React.CSSProperties}>
      <header className="p-4 bg-[var(--brand-color)] text-blue-50 text-center">
        <img src={brand.logo} alt={brand.name} className="h-12 mx-auto" />
        <h1 className="text-2xl font-bold">{brand.name}</h1>
      </header>
      <div className="flex">
        {brand.menuPosition === "sidebar" && (
          <aside className="min-h-screen w-32 bg-gray-900 text-white p-4">
            <ul>
              <li>
                <a href={`/${market}/casino`} className="block p-2">
                  Casino
                </a>
              </li>
              <li>
                <a href={`/${market}/my-profile`} className="block p-2">
                  Profile
                </a>
              </li>
            </ul>
          </aside>
        )}
        <main className="bg-black flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
