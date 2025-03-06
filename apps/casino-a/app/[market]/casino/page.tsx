"use client";

import { useEffect, useState } from "react";

interface Game {
    id: number;
    title: string;
    thumbnail: string;
}

export default function CasinoLobby({ params }: { params: { market: string } }) {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetch("/data/games.json")
            .then((res) => res.json())
            .then((data) => setGames(data.games));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Casino Lobby - {params.market.toUpperCase()}</h1>
            <div className="grid grid-cols-2 gap-4">
                {games.map((game) => (
                    <div key={game.id} className="border p-4">
                        <img src={game.thumbnail} alt={game.title} className="w-full h-32 object-cover" />
                        <h2>{game.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
