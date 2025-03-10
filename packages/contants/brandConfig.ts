export const BRAND_CONFIG = {
  "casino-a": {
    name: "Casino A",
    primaryColor: "#ff5733",
    logo: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg",
    menuPosition: "sidebar",
  },
  "casino-b": {
    name: "Casino B",
    primaryColor: "#3377ff",
    logo: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg",
    menuPosition: "topbar",
  },
};

/*
 * The decision to maintain the BRAND_CONFIG as a centralized global configuration 
 * rather than splitting it into per-brand configurations is intentional.
 * Having all configurations in one place simplifies management. 
 * If the brands grow, then we can split them into individual files.
 */

