import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../components/Button";
import { useParams } from 'next/navigation';
import {BRAND_CONFIG} from "@repo/constants";

// Mocking the useParams hook
jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
}));

describe('Button Component', () => {
    const mockOnClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders button with correct label", () => {
        (useParams as jest.Mock).mockReturnValue({ market: 'casino-b' });

        render(<Button label="Play Now" onClick={mockOnClick} />);
        expect(screen.getByText("Play Now")).toBeInTheDocument();

        const button = screen.getByRole('button', { name: /play now/i });

        expect(button).toHaveStyle({ backgroundColor: BRAND_CONFIG['casino-b'].primaryColor });
    });

    test("calls onClick handler when clicked", () => {
        const handleClick = jest.fn();
        render(<Button label="Click Me" onClick={handleClick} />);

        fireEvent.click(screen.getByText("Click Me"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders button with different labels', () => {
        (useParams as jest.Mock).mockReturnValue({ market: 'casino-b' });

        render(<Button label="Start Game" onClick={mockOnClick} />);
        expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();

        render(<Button label="Exit" onClick={mockOnClick} />);
        expect(screen.getByRole('button', { name: /exit/i })).toBeInTheDocument();
    });
})


