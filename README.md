#  Game Portal Monorepo

A Next.js 15 monorepo for a casino game portal, built with Turborepo, TypeScript, and PNPM workspaces.

## 🚀 Getting Started

1. Clone this repository
2. Install dependencies with `pnpm install`
3. Start the development server with `pnpm dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## To start specific applications, use: `pnpm dev:casino_a` or `pnpm dev:casino_b`

## To execute tests, use: `pnpm test`

### Notes
Make sure you have Node.js version 18 or higher and PNPM installed. Then, execute the following command:


### 📂 Monorepo Structure

/apps            # Next.js applications
├── casino-a   # Casino A app
├── casino-b   # Casino B app
/packages        # Shared libraries
├── ui        # Shared UI components (React)
├── store     # Global state (Redux Toolkit)
├── types     # TypeScript types
├── constants # Shared constants
├── middleware # Next.js middleware
├── eslint-config # Centralized ESLint rules


#### 🛠 Key Technologies
* Next.js 15 (App Router)
* React 19 
* TypeScript 
* Turborepo (Monorepo management)
* Redux Toolkit 
* Jest & React Testing Library (Testing)
* TailwindCSS 
* ESLint & Prettier (Code quality)

##### 🛠 Features Implemented
* ✅ Next.js 15 with App Router 
* ✅ React 19 support 
* ✅ Turborepo for monorepo management 
* ✅ TypeScript for type safety 
* ✅ Shared UI Components (@repo/ui)
* ✅ Global State Management (Redux Toolkit) (@repo/store)
* ✅ Dynamic Middleware for Market-Based Redirection (@repo/middleware)
* ✅ Fully Typed APIs with Zod validation 
* ✅ Authentication Handling with Middleware 
* ✅ GameCard & Button Components with Theming 
* ✅ Unit & Integration Tests (Jest, React Testing Library)
* ✅ Mocking Next.js Router in Tests 
* ✅ Custom ESLint & Prettier Configurations (@repo/eslint-config)
* ✅ TailwindCSS for UI Styling 
* ✅ Optimized Builds with Turborepo Caching

##### 🛠 Bonus Features
* ✅ IndexedDB for handling large datasets (e.g., games list)
* ✅ Build Command: Enable building different casino brands using an npm CLI command.
* ✅ Show a "Play for Free" button for logged-out users. 
* ✅ Show a "Play for Real" button for logged-in users.

##### 📜 License
This project is private and not for public distribution.

