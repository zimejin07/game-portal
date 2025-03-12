# Use official Node.js image with a compatible version
FROM node:20-alpine AS builder

WORKDIR /app

# Install PNPM
RUN npm install -g pnpm@9.14.3

# Copy package manager files for better caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies (including dev)
RUN pnpm install --frozen-lockfile

# Copy the entire monorepo
COPY . .

# Build the project (handles all apps)
RUN pnpm run build

# Runner stage (uses only the built files)
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built apps & packages
COPY --from=builder /app/packages /app/packages
COPY --from=builder /app/apps /app/apps


# Expose port for Next.js
EXPOSE 3000

# Run the app (use "start" for production)
CMD ["pnpm", "run", "start"]
