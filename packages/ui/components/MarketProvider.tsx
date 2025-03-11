"use client";

import { useParams } from "next/navigation";
import { BRAND_CONFIG, MARKET_TO_BRAND } from "@repo/constants/brandConfig";

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const { market } = useParams();

  // Determine the correct brand based on the market
  const brandKey = MARKET_TO_BRAND[market as keyof typeof MARKET_TO_BRAND];
  const brand = BRAND_CONFIG[brandKey as keyof typeof BRAND_CONFIG];

  return (
    <div
      className="flex flex-col"
      style={{ "--brand-color": brand?.primaryColor } as React.CSSProperties}
    >
      {/* Shared Brand Header */}
      <header
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <img
          src={brand?.banner}
          alt={brand?.name}
          style={{
            width: "auto",
            maxWidth: "100%",
            height: "auto",
            maxHeight: "40vh",
            objectFit: "contain",
          }}
          loading="lazy"
        />
      </header>
      {/* Using inline styles here because Tailwind's dynamic class processing
    does not fully support background images and object-contain 
    behavior as expected. This ensures full compatibility. */}

      {/* Sidebar or Header Menu Based on Brand Config */}
      {brand?.menuPosition === "sidebar" ? (
        <div className="flex flex-1">
          <aside className="min-h-screen w-48 bg-[var(--brand-color)] text-white p-4">
            <ul className="space-y-6">
              <li className="mb-4">
                <a
                  href={`/${market}/casino`}
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Casino
                </a>
              </li>
              <li className="mb-4">
                <a
                  href={`/${market}/my-profile`}
                  className="block p-2 hover:bg-gray-700 rounded mb-4"
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
