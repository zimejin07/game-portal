"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getGamesFromDB, saveGamesToDB } from "@/utils/indexedDB";
import { GameCard } from "@repo/ui";
import { Game } from "@repo/types";

export default function CasinoLobby() {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const isLoggedIn =
    typeof window !== "undefined" ? document.cookie.includes("user") : false;

  const fetchGames = async (page: number) => {
    let localGames = await getGamesFromDB();
    if (localGames.length === 0) {
      try {
        const res = await fetch(`/api/games?page=${page}&limit=20`);
        const data = await res.json();
        localGames = data.games;
        await saveGamesToDB(localGames);
      } catch (error) {
        console.error("Error fetching games:", error);
        setLoading(false);
        return;
      }
    }

    setGames((prev) => [...prev, ...localGames]);
    setLoading(false);
    setHasMore(localGames.length > 0);
  };

  useEffect(() => {
    fetchGames(page);
  }, [page]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastGameRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Casino Lobby</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 justify-center">
        {games.map((game, index) => (
          <div
            key={`${game.id}-${index}`}
            ref={index === games.length - 1 ? lastGameRef : null}
          >
            <GameCard game={game} isLoggedIn={isLoggedIn} />
          </div>
        ))}
      </div>
    </div>
  );
}
