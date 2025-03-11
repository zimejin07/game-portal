import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/ui/tailwind.config"; // Import Tailwind from UI package

const config: Config = {
  presets: [sharedConfig], // Inherit Tailwind settings from UI package
};

export default config;
