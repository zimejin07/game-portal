"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getGamesFromDB, saveGamesToDB } from "@/utils/indexedDB";
import { useParams, useRouter } from "next/navigation";

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
  const { market } = useParams();
  const router = useRouter();

  // Simulated user session check (Replace with real session handling)
  const isLoggedIn =
    typeof window !== "undefined" ? document.cookie.includes("user") : false;

  const fetchGames = async (page: number) => {
    console.log(`🔄 Fetching games for page: ${page}`);

    let localGames = await getGamesFromDB();
    if (localGames.length === 0) {
      try {
        const res = await fetch(`/api/games?page=${page}&limit=20`);
        const data = await res.json();
        localGames = data.games;
        await saveGamesToDB(localGames);
      } catch (error) {
        console.error("❌ Error fetching games:", error);
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

  // Infinite scrolling
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Casino Lobby - {market}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <div
            key={game.id}
            ref={index === games.length - 1 ? lastGameRef : null}
            className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer"
            onClick={() => router.push(`/${market}/casino/${game.slug}`)} // ✅ Navigate to game page
          >
            <img
              src={game.meta.thumbnail.src}
              alt={game.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{game.name}</h2>
            <p className="text-sm text-gray-500">{game.provider.name}</p>

            {/* ✅ Show correct button based on login state */}
            {isLoggedIn ? (
              <button className="mt-2 bg-green-500 text-white px-4 py-2 w-full rounded hover:bg-green-600">
                Play for Real
              </button>
            ) : (
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600">
                Play for Free
              </button>
            )}
          </div>
        ))}
      </div>
      {loading && <p className="mt-4 text-center">Loading more games...</p>}
    </div>
  );
}
