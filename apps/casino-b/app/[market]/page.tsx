"use client"

import Link from "next/link";
import { BRAND_CONFIG } from "@repo/constants/brandConfig";
import { useParams } from "next/navigation";

const MarketHome = () => {
  const { market } = useParams();
  const brand =
    BRAND_CONFIG[market as keyof typeof BRAND_CONFIG] ||
    BRAND_CONFIG["casino-b"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <img src={brand.logo} alt={brand.name} className="h-16 mb-4" />
      <h2 className="text-3xl font-bold text-[var(--brand-color)]">
        Welcome to {brand.name} - {JSON.stringify(market).toUpperCase()} Market
      </h2>
      <p className="text-gray-600 mt-2">
        The best casino experience tailored for you.
      </p>

      <Link
        href={`/${market}/login`}
        className="mt-6 px-6 py-3 bg-[var(--brand-color)] text-white font-semibold rounded-md shadow-md hover:bg-opacity-90 transition"
      >
        Login to Continue
      </Link>
    </div>
  );
};

export default MarketHome;
