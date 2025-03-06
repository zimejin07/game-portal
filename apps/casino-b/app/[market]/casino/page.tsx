import { Game } from "@repo/types";

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/games.json`);
    const data = await res.json();
    return { props: { games: data.games } };
}

export default function CasinoLobby({ games }: { games: Game[] }) {
    return (
        <div>
            <h1 className="text-2xl font-bold">Casino Lobby</h1>
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
