"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getGamesFromDB, saveGamesToDB } from "@/utils/indexedDB";

interface Game {
    id: number;
    name: string;
    slug: string;
    meta: { thumbnail: { src: string } };
    provider: { name: string; aggregator: string };
}

export default function CasinoLobby({ params }: { params: { market: string } }) {
    const [games, setGames] = useState<Game[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchGames = async (page: number) => {
        let localGames = await getGamesFromDB();
        if (localGames.length === 0) {
            console.log("Fetching games from API...");
            const res = await fetch(`/api/games?page=${page}&limit=20`);
            const data = await res.json();
            localGames = data.games;
            await saveGamesToDB(localGames);
        } else {
            console.log("Loading games from IndexedDB...");
        }
        setGames((prev) => [...prev, ...localGames]);
        setLoading(false);
        setHasMore(localGames.length > 0);
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
            <h1 className="text-2xl font-bold">Casino Lobby - {params.market.toUpperCase()}</h1>
            <div className="grid grid-cols-2 gap-4">
                {games.map((game, index) => (
                    <div key={game.id} ref={index === games.length - 1 ? lastGameRef : null} className="border p-4">
                        <img src={game.meta.thumbnail.src} alt={game.name} className="w-full h-32 object-cover" />
                        <h2>{game.name}</h2>
                    </div>
                ))}
            </div>
            {loading && <p>Loading more games...</p>}
        </div>
    );
}
