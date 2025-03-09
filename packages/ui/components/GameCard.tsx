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
      className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer"
      onClick={() => router.push(`/casino/${game.slug}`)}
    >
      <img
        src={game.meta.thumbnail.src}
        alt={game.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{game.name}</h2>
      <p className="text-sm text-gray-500">{game.provider.name}</p>

      <Button label={isLoggedIn ? "Play for Real" : "Play for Free"} />
    </div>
  );
}
