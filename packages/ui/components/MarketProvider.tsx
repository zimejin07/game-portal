"use client";

import { useParams } from "next/navigation";
import { BRAND_CONFIG } from "@repo/constants/brandConfig";

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const { market } = useParams();
  const brand =
    BRAND_CONFIG[market as keyof typeof BRAND_CONFIG] ||
    BRAND_CONFIG["casino-b"];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ "--brand-color": brand.primaryColor } as React.CSSProperties}
    >
      {/* Shared Brand Header */}
      <header className="w-full min-h-[30vh] md:min-h-[40vh] bg-[var(--brand-color)] flex flex-col justify-center items-center">
        <img
          src={brand.banner}
          alt={brand.name}
          className="mx-auto"
          loading="lazy"
        />
      </header>

      {/* Sidebar or Header Menu Based on Brand Config */}
      {brand.menuPosition === "sidebar" ? (
        <div className="flex flex-1">
          <aside className="min-h-screen w-48 bg-gray-900 text-white p-4">
            <ul className="space-y-4">
              <li>
                <a
                  href={`/${market}/casino`}
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Casino
                </a>
              </li>
              <li>
                <a
                  href={`/${market}/my-profile`}
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Profile
                </a>
              </li>
            </ul>
          </aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <nav className="flex gap-6 p-4 bg-[var(--brand-color)] w-full text-white">
            <a href={`/${market}/casino`} className="hover:text-gray-300">
              Casino
            </a>
            <a href={`/${market}/my-profile`} className="hover:text-gray-300">
              Profile
            </a>
          </nav>
          <main className="p-6 w-full">{children}</main>
        </div>
      )}
    </div>
  );
}
