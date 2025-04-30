# 🎰 Game Portal Monorepo

A **Next.js 15** monorepo for a multi-brand casino game portal. Built with **Turborepo**, **TypeScript**, and **PNPM workspaces**, this project supports multiple applications with shared packages for UI, state, and logic.

---

## 🚀 Getting Started

1. **Clone this repository**
2. **Install dependencies**  
   ```bash
   pnpm install
   ```
3. **Start the dev server**
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the app.

### Start a specific casino app:
```bash
pnpm dev:casino_a   # or
pnpm dev:casino_b
```

### Run tests:
```bash
pnpm test
```

> ✅ Requires **Node.js v18+** and **PNPM**

---

## 📂 Monorepo Structure

```
/apps           → Next.js applications
  ├── casino-a  → Casino A app
  └── casino-b  → Casino B app

/packages       → Shared libraries
  ├── ui            → Shared UI components
  ├── store         → Global state (Redux Toolkit)
  ├── types         → Shared TypeScript types
  ├── constants     → Common constants
  ├── middleware    → Middleware for auth & redirects
  └── eslint-config → Shared ESLint rules
```

---

## 🛠️ Key Technologies

- **Next.js 15** (App Router)
- **React 19**
- **Redux Toolkit**
- **TypeScript**
- **Turborepo**
- **TailwindCSS**
- **Jest + React Testing Library**
- **Zod** for schema validation
- **Docker + Docker Compose**
- **IndexedDB** for large datasets

---

## ✅ Implemented Features

- App Router-based routing and dynamic segments
- Multi-app setup (Casino A & B)
- Market-based redirection via middleware
- Local JSON-based mock authentication
- Shared UI and logic via packages
- IndexedDB for large game lists
- Unit and integration testing with mocked APIs
- Docker support for local development
- "Play for Free" and "Play for Real" logic based on login status

---

## 🔐 Authentication

Sample user JSON structure:
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "password": "password123",
    "market": "en"
  },
  {
    "id": 2,
    "username": "jane_smith",
    "password": "securepass",
    "market": "ca"
  }
]
```

### Login Behavior

- Users are restricted to their market (`/en`, `/ca`)
- Redirects are enforced on route mismatch after login

---

## 🌐 API & State

- Global state with Redux Toolkit
- Game data fetched from a mock API
- IndexedDB used for client-side caching

---

## 🧪 Testing Strategy

- ✅ **Unit Tests** (Jest + RTL)
- ✅ **Integration Tests** for middleware and auth flows
- ✅ **Mocked APIs** and router for isolated testing

---

## 🐳 Docker Support

```bash
docker-compose up --build
```

- Casino A: [http://localhost:3000](http://localhost:3000)
- Casino B: [http://localhost:3001](http://localhost:3001)

![Docker Build](docker%20build%20success.png)

---

## 🌍 Supported Routes

| Route               | Description             |
|---------------------|-------------------------|
| `/market`           | Welcome page            |
| `/market/login`     | User authentication     |
| `/market/casino`    | Game lobby              |
| `/market/my-profile`| User profile page       |
| `/casino/{slug}`    | Individual game route   |

---

## 🔮 Future Improvements

- WebSocket integration for real-time updates
- Feature flags for market-based toggles
- Editable user profile functionality
- Enhanced user permissions and roles

---

## ❓ Troubleshooting

If you get an error like:
```bash
Error: Cannot find module '@reduxjs/toolkit'
```

Try:
```bash
pnpm install <missing-package>
docker-compose up --build --force-recreate
```

---

## 📞 Contact

For internal use only. Reach out via GitHub or LinkedIn.

---

## 📜 License

**Private Repository** — Not for public distribution.
