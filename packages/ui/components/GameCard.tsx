"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";

interface Game {
  id: number;
  name: string;
  slug: string;
  meta: { thumbnail: { src: string } };
  provider: { name: string };
}

interface GameCardProps {
  game: Game;
  isLoggedIn: boolean;
}

export function GameCard({ game, isLoggedIn }: GameCardProps) {
  const router = useRouter();

  return (
    <div
      className="relative flex flex-col bg-gray-800 text-white rounded-lg shadow-md overflow-hidden w-full max-w-xs transition-transform duration-200 hover:scale-105"
      onClick={() => router.push(`/casino/${game.slug}`)}
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
