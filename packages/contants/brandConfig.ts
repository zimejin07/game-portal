type BrandConfig = {
  name: string;
  primaryColor: string;
  logo: string;
  menuPosition: "sidebar" | "topbar";
};

export const CONFIG = {
  BRAND_CONFIG: {
    "casino-a": {
      name: "Casino A",
      primaryColor: "#ff5733",
      logo: "/logos/casino-a.png",
      menuPosition: "sidebar",
    },
    "casino-b": {
      name: "Casino B",
      primaryColor: "#3377ff",
      logo: "/logos/casino-b.png",
      menuPosition: "topbar",
    },
  } as Record<string, BrandConfig>,

  GAME_NAME: "Casino Game Portal",

  BRANDS: {
    CASINO_A: "Casino A",
    CASINO_B: "Casino B",
  },
};
