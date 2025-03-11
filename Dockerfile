# Use official Node.js image with a compatible version
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and lockfile
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm without global install
RUN corepack enable && pnpm install --frozen-lockfile

# Copy the entire monorepo into the container
COPY . .

RUN pnpm --filter casino-a build && pnpm --filter casino-b build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/packages/ui /app/packages/ui
COPY --from=builder /app/packages/store /app/packages/store
COPY --from=builder /app/packages/types /app/packages/types
COPY --from=builder /app/packages/constants /app/packages/constants
COPY --from=builder /app/packages/middleware /app/packages/middleware
COPY --from=builder /app/apps/casino-a /app/apps/casino-a
COPY --from=builder /app/apps/casino-b /app/apps/casino-b

# Expose port for Next.js (default is 3000)
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "dev"]
