export const BRAND_CONFIG = {
  "casino-a": {
    name: "Casino A",
    primaryColor: "#ff5733",
    logo: "",
    menuPosition: "sidebar",
    banner: "https://i.imgur.com/JxNOwFy.png",
  },
  "casino-b": {
    name: "Casino B",
    primaryColor: "#3377ff",
    logo: "",
    menuPosition: "topbar",
    banner: "https://i.imgur.com/xsoH8Kp.png",
  },
};

export const MARKET_TO_BRAND: Record<string, string> = {
  en: "casino-a",
  ca: "casino-b",
};

export const CASINO_MARKET_RULES: Record<string, string> = {
  "casino-a": "en",
  "casino-b": "ca",
};

/*
 * The decision to maintain the BRAND_CONFIG as a centralized global configuration
 * rather than splitting it into per-brand configurations is intentional.
 * Having all configurations in one place simplifies management.
 * If the brands grow, then we can split them into individual files.
 */
