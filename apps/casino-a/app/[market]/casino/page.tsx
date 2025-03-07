"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getGamesFromDB, saveGamesToDB } from "@/utils/indexedDB";
import { useParams } from "next/navigation";

interface Game {
  id: number;
  name: string;
  slug: string;
  meta: { thumbnail: { src: string } };
  provider: { name: string; aggregator: string };
}

export default function CasinoLobby() {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const { market } = useParams();

  const fetchGames = async (page: number) => {
    console.log(`🔄 Starting fetchGames for page: ${page}`);

    let localGames = await getGamesFromDB();
    console.log(`🗄️ Retrieved ${localGames.length} games from IndexedDB`);

    if (localGames.length === 0) {
      console.log("⚡ No local games found. Fetching games from API...");

      try {
        const res = await fetch(`/api/games?page=${page}&limit=20`);
        console.log("raw response from api", res)
        const data = await res.json();

        localGames = data.games;
        console.log(`🌐 Fetched ${localGames.length} games from API`);

        await saveGamesToDB(localGames);
        console.log("💾 Saved fetched games to IndexedDB");
      } catch (error) {
        console.error("❌ Error fetching games from API:", error);
        setLoading(false);
        return;
      }
    } else {
      console.log("✅ Games loaded from IndexedDB");
    }

    setGames((prev) => [...prev, ...localGames]);
    console.log("📚 Updated games state with new entries");

    setLoading(false);
    console.log("⏳ Loading state set to false");

    const hasMore = localGames.length > 0;
    setHasMore(hasMore);
    console.log(`🚦 Set 'hasMore' to ${hasMore}`);
  };

  useEffect(() => {
    fetchGames(page);
  }, [page]);

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
      <h1 className="text-2xl font-bold">Casino Lobby - {market}</h1>
      <div className="grid grid-cols-2 gap-4">
        {games.map((game, index) => (
          <div
            key={game.id}
            ref={index === games.length - 1 ? lastGameRef : null}
            className="border p-4"
          >
            <img
              src={game.meta.thumbnail.src}
              alt={game.name}
              className="w-full h-32 object-cover"
            />
            <h2>{game.name}</h2>
          </div>
        ))}
      </div>
      {loading && <p>Loading more games...</p>}
    </div>
  );
}
