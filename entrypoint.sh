#!/bin/sh
set -e

# Use /app/data for persistent database storage
export DATABASE_URL="file:/app/data/petral.db"

# Copy prisma schema into data directory for db push
cp /app/prisma-assets/schema.prisma /app/data/schema.prisma

# Run database migrations
node node_modules/prisma/build/index.js db push --skip-generate --schema=/app/data/schema.prisma

# Seed database (idempotent — skips if data exists)
node /app/prisma-assets/seed.js

# Start Next.js
exec node server.js
