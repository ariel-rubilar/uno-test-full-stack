FROM node:20-alpine AS base
WORKDIR /app

# ------------------
# Dependencies
# ------------------
FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@10.29.3 --activate
RUN pnpm install --frozen-lockfile

# ------------------
# Build
# ------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm build

# ------------------
# Production
# ------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nestjs -G nodejs

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER nestjs

EXPOSE 3001

CMD ["node", "dist/main.js"]
