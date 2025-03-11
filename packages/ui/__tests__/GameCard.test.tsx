import { render, screen, fireEvent } from "@testing-library/react";
import { GameCard } from "../components/GameCard";
import { Game } from "@repo/types";

// Mock Next.js router properly
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({  push: mockPush, }),
    useParams: () => ({ market: "casino-a" }), // Provide a mock value
}));

const mockGame: Game = {
    id: 1,
    name: "Bonanza",
    slug: "bonanza",
    meta: { thumbnail: { src: "https://casinodays2.imgix.net/games/bonanza-relax.jpg" } },
    provider: { name: "Big Time Gaming" },
};

test("renders GameCard with correct info", () => {
    render(<GameCard game={mockGame} isLoggedIn={true} />);

    expect(screen.getByText("Bonanza")).toBeInTheDocument();
    expect(screen.getByText("Big Time Gaming")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play for Real" })).toBeInTheDocument();
});
