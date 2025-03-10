// Brand-specific casino configuration
export type CasinoConfig = {
  name: string;
  primaryColor: string;
  banner: string;
  menuPosition: "sidebar" | "header";
};

// Game data type
export type Game = {
  id: number;
  name: string;
  slug: string;
  meta: { thumbnail: { src: string } };
  provider: { name: string; aggregator?: string };
};

// User data type
export type User = {
  id: number;
  username: string;
  email: string;
  market: "en" | "ca";
};

// Props for GameCard component
export type GameCardProps = {
  game: Game;
  isLoggedIn: boolean;
};

// Button Component Props
export type ButtonProps = {
  label: string;
  onClick?: () => void;
};

// Profile Data Type (For ProfilePage)
export type UserProfile = {
  username: string;
  market: string;
};

// Login Data Type
export type LoginData = {
  username: string;
  password: string;
};

// Market Parameter Type (Used in MarketHome)
export type MarketParams = {
  market: string;
};

// Used in HomePage
export type Params = {
  market: string;
};
