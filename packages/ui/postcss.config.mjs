/** @type {import('tailwindcss').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    ],
  },
};
export default config;
