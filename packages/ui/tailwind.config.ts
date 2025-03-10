import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../apps/casino-a/app/**/*.{js,ts,jsx,tsx}", // ✅ Scan Casino A pages
    "../../apps/casino-b/app/**/*.{js,ts,jsx,tsx}", // ✅ Scan Casino B pages
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Scan shared UI components
    "../../packages/ui/**/*.{js,ts,jsx,tsx}", // ✅ Scan everything inside @repo/ui
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config; // ✅ Use ES module export
