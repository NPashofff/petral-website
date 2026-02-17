FROM node:20-alpine AS base

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create empty database with schema for Next.js build
RUN npx prisma db push

# Compile seed.ts to seed.js for runtime use
RUN ./node_modules/.bin/esbuild prisma/seed.ts \
    --bundle --platform=node --format=cjs \
    --outfile=prisma/seed.js \
    --external:@prisma/client --external:bcryptjs

# Build Next.js
RUN npm run build

# --- Production ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install only runtime dependencies for prisma and seed
RUN npm install --no-save prisma@6 @prisma/client@6 bcryptjs@3

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma schema, generated client, and compiled seed
COPY --from=builder --chown=nextjs:nodejs /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma/seed.js ./prisma/seed.js
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# Copy entrypoint
COPY --chown=nextjs:nodejs entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Ensure directories exist and are writable
RUN mkdir -p /app/public/uploads /app/data && chown -R nextjs:nodejs /app/public/uploads /app/data

USER nextjs

EXPOSE 3000

CMD ["./entrypoint.sh"]
