export type CasinoConfig = {
  name: string;
  menuPosition: "left" | "right";
};

export type Game = {
  id: string;
  thumbnail: string;
  title: string;
};

// TODO update casino config interface and game. and import to brand config file where config is used.
