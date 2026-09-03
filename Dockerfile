FROM node:20-alpine AS base

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Build ---
FROM base AS builder
WORKDIR /app
# Prisma needs DATABASE_URL set at generate time, but the value is only used at runtime.
# The real DATABASE_URL is set by entrypoint.sh; this dummy is never read.
ENV DATABASE_URL=file:./build-dummy.db
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client (no DB connection needed)
RUN npx prisma generate

# Create an empty schema-only SQLite DB for `next build`: statically prerendered
# pages (home, /_not-found, catalog) query Prisma at build time and fail with
# P2021 ("table does not exist") without it. The file never leaves this stage;
# the runtime DB is created by entrypoint.sh in /app/data.
RUN npx prisma db push --skip-generate

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

# Copy Prisma schema, generated client, compiled seed, and one-shot migration scripts
# Note: schema and seed go to /app/prisma-assets/ to avoid being hidden by the db-data volume on /app/prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma/schema.prisma ./prisma-assets/schema.prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma/seed.js ./prisma-assets/seed.js
COPY --from=builder --chown=nextjs:nodejs /app/prisma/migrate-uploads.js ./prisma-assets/migrate-uploads.js
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# Copy entrypoint
COPY --chown=nextjs:nodejs entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Ensure directories exist and are writable
# /app/data is mounted as a persistent volume; uploads now live there so
# newly uploaded files don't depend on Next.js's build-time public manifest.
RUN mkdir -p /app/data/uploads && chown -R nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000

CMD ["./entrypoint.sh"]
