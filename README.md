# Game Portal Monorepo

A Next.js 15 monorepo for a casino game portal, built with Turborepo, TypeScript, and PNPM workspaces.

## 🚀 Getting Started

1. Clone this repository
2. Install dependencies with `pnpm install`
3. Start the development server with `pnpm dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To start specific applications, 
use: `pnpm dev:casino_a` or `pnpm dev:casino_b`

## To execute tests, 
use: `pnpm test`

### Notes

Make sure you have Node.js version 18 or higher and PNPM installed. Then, execute the following command:

### 📂 Monorepo Structure

1. [ ] /apps # Next.js applications
2. [ ] ├── casino-a # Casino A app
3. [ ] ├── casino-b # Casino B app
4. [ ] /packages # Shared libraries
5. [ ] ├── ui # Shared UI components (React)
6. [ ] ├── store # Global state (Redux Toolkit)
7. [ ] ├── types # TypeScript types
8. [ ] ├── constants # Shared constants
9. [ ] ├── middleware # Next.js middleware
10. [ ] ├── eslint-config # Centralized ESLint rules

#### 🛠 Key Technologies

- Next.js 15 (App Router)
- React 19
- TypeScript
- Turborepo (Monorepo management)
- Redux Toolkit
- Jest & React Testing Library (Testing)
- TailwindCSS
- ESLint & Prettier (Code quality)

##### 🛠 Features Implemented

- ✅ Next.js 15 with App Router
- ✅ React 19 support
- ✅ Turborepo for monorepo management
- ✅ TypeScript for type safety
- ✅ Shared UI Components (@repo/ui)
- ✅ Global State Management (Redux Toolkit) (@repo/store)
- ✅ Dynamic Middleware for Market-Based Redirection (@repo/middleware)
- ✅ Fully Typed APIs with Zod validation
- ✅ Authentication Handling with Middleware
- ✅ GameCard & Button Components with Theming
- ✅ Unit & Integration Tests (Jest, React Testing Library)
- ✅ Mocking Next.js Router in Tests
- ✅ Custom ESLint & Prettier Configurations (@repo/eslint-config)
- ✅ TailwindCSS for UI Styling
- ✅ Optimized Builds with Turborepo Caching

##### 🛠 Bonus Features

- ✅ IndexedDB for handling large datasets (e.g., games list)
- ✅ Dockerizing the project
- ✅ Build Command: Enable building different casino brands using an npm CLI command.
- ✅ Show a "Play for Free" button for logged-out users.
- ✅ Show a "Play for Real" button for logged-in users.

##### 🔑 Authentication

`"users": 
{ "id": 1, "username": "john_doe", "password": "password123", "market": "en", "name": "John", "surname": "Doe" },
{ "id": 2, "username": "jane_smith", "password": "securepass", "market": "ca", "name": "Jane", "surname": "Smith" }
`
##### 🔐 Login Behavior
Users must log in using their credentials.
After login, users cannot switch markets (/en users stay in /en, /ca users stay in /ca).
If a Canadian user (/ca) tries to access /en, they are automatically redirected.

##### 🖥️ API & State Management
Redux Toolkit (RTK) is used for state management.
Authentication data is stored locally in JSON for simplicity.
Games are fetched from a mock API.
IndexedDB is used for storing a large game dataset.

##### 🐳 Docker Support
#### #️⃣ Build & Run with Docker

docker-compose up --build
Casino A runs on http://localhost:3000
Casino B runs on http://localhost:3001

![docker build success.png](docker%20build%20success.png)

#### 🛡️ Testing Strategy
✅ Unit Tests
Jest & React Testing Library used for testing UI components.

✅ Integration Tests
Middleware is tested to ensure users can't switch markets after login.
Mocked API calls are used to simulate real-world data.

#### 🌍 Supported Routes
Route	Description
* /market	Welcome page
* /market/login	User authentication
* /market/casino	Game lobby
* /market/my-profile	User profile
* /casino/{slug}	Individual game page // Routing only

🔮 Future Improvements
* Add WebSockets for real-time game updates 
* Implement Feature Flags for market-based toggles 
* Individual game page
* Ability to edit user profile

#### 📞 Contact
For any issues, feel free to reach out. 🚀

##### 📜 License

This project is private and not for public distribution.
