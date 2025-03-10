"use client";

import { useParams } from "next/navigation";
import { BRAND_CONFIG } from "@repo/constants/brandConfig";

export function MarketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { market } = useParams();
  const brand =
    BRAND_CONFIG[market as keyof typeof BRAND_CONFIG] ||
    BRAND_CONFIG["casino-b"];

  return (
    <div style={{ "--brand-color": brand.primaryColor } as React.CSSProperties}>
      {/* Shared Brand Header */}
      <header className="p-4 bg-[var(--brand-color)] text-white text-center">
        <img src={brand.logo} alt={brand.name} className="h-12 mx-auto" />
        <h1 className="text-2xl font-bold">{brand.name}</h1>
      </header>

      {/* Dynamically render sidebar OR topbar based on brand config */}
      {brand.menuPosition === "sidebar" ? (
        <div className="flex">
          <aside className="min-h-screen w-48 bg-gray-900 text-white p-4">
            <ul>
              <li>
                <a
                  href={`/${market}/casino`}
                  className="block p-2 hover:bg-gray-700"
                >
                  Casino
                </a>
              </li>
              <li>
                <a
                  href={`/${market}/my-profile`}
                  className="block p-2 hover:bg-gray-700"
                >
                  Profile
                </a>
              </li>
            </ul>
          </aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      ) : (
        <div>
          <nav className="bg-gray-900 p-4 flex gap-4 justify-center">
            <a href={`/${market}/casino`} className="hover:text-gray-300 mr-5">
              Casino
            </a>
            <a href={`/${market}/my-profile`} className="hover:text-gray-300">
              Profile
            </a>
          </nav>
          <main className="p-6">{children}</main>
        </div>
      )}
    </div>
  );
}
