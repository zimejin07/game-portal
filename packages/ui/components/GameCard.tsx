"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "./Button";
import { GameCardProps } from "@repo/types";

export function GameCard({ game, isLoggedIn }: GameCardProps) {
  const router = useRouter();
  const { market } = useParams();

  return (
    <div
      className="relative flex flex-col bg-gray-800 text-white rounded-lg shadow-md overflow-hidden w-full max-w-xs transition-transform duration-200 hover:scale-105"
      onClick={() => router.push(`/${market}/casino/${game.slug}`)}
    >
      {/* Game Image */}
      <img
        src={game.meta.thumbnail.src}
        alt={game.name}
        className="w-full h-40 object-cover"
      />

      {/* Game Info */}
      <div className="p-4 flex flex-col items-center text-center">
        <h2 className="text-lg font-bold text-gray-600">{game.name}</h2>
        <p className="text-sm text-gray-600">{game.provider.name}</p>
        <Button label={isLoggedIn ? "Play for Real" : "Play for Free"} />
      </div>
    </div>
  );
}
