# ==============================================================================
# Multi-stage Dockerfile for TOEIC PRO Portal (Next.js 14 + Prisma + Alpine)
# ==============================================================================

# --- Stage 1: Base Environment ---
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# --- Stage 2: Dependencies ---
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma/
# Install dependencies and pre-generate Prisma client
RUN npm ci
RUN npx prisma generate

# --- Stage 3: Builder ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Dummy DATABASE_URL during build phase (Prisma schema validation requires a valid URL format)
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public"
ENV JWT_SECRET="build-secret-build-secret-build-secret-32"
ENV JWT_REFRESH_SECRET="build-secret-build-secret-build-secret-32"

RUN npm run build

# --- Stage 4: Production Runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create secure non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets and standalone server bundle
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma schema & seed script for runtime migration / seeding commands
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
