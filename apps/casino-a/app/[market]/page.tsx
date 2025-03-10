import Link from "next/link";
import { BRAND_CONFIG } from "@repo/constants/brandConfig";
import { Params } from "@repo/types";

const MarketHome = ({ params }: { params: Params }) => {
  const brand =
    BRAND_CONFIG[params.market as keyof typeof BRAND_CONFIG] ||
    BRAND_CONFIG["casino-a"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <img src={brand.logo} alt={brand.name} className="h-16 mb-4" />
      <h2 className="text-3xl font-bold text-[var(--brand-color)] tracking-wide">
        Welcome to{" "}
        <span className="text-[var(--accent-color)]">{brand.name}</span> -{" "}
        {params.market.toUpperCase()} Market
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">Your Next Adventure Awaits.</p>

      <Link
        href={`/${params.market}/login`}
        className="mt-6 px-8 py-4 bg-[var(--brand-color)] text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition duration-200"
      >
        Login to Continue
      </Link>
    </div>
  );
};

export default MarketHome;
