import { render, screen, fireEvent } from "@testing-library/react";
import { GameCard } from "../components/GameCard";
import type { Game } from "@repo/types";
import { useRouter } from "next/navigation";

// Mock Next.js router
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
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

test("clicking on GameCard triggers navigation", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<GameCard game={mockGame} isLoggedIn={true} />);
    fireEvent.click(screen.getByText("Bonanza"));

    expect(mockPush).toHaveBeenCalledWith("/casino/bonanza");
});
