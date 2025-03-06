import Link from "next/link";

export default function MarketHome({ params }: { params: { market: string } }) {
  return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to {params.market.toUpperCase()} Market</h2>
        <Link href={`/${params.market}/login`} className="text-blue-500 underline mt-4 block">
          Login to Continue
        </Link>
      </div>
  );
}
