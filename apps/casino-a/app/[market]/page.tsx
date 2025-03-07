import Link from "next/link";
import React from "react";

interface Params {
  market: string;
}

const MarketHome = ({ params }: { params: Params }) => (
  <div className="text-center">
    <h2 className="text-2xl font-bold">
      Welcome to Casino A's {params.market.toUpperCase()} Market
    </h2>
    <Link
      href={`/${params.market}/login`}
      className="text-blue-500 underline mt-4 block"
    >
      Login to Continue
    </Link>
  </div>
);

export default MarketHome;
