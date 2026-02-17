#!/bin/sh
set -e

# Use /app/data for persistent database storage
export DATABASE_URL="file:/app/data/petral.db"

# Run database migrations
node node_modules/prisma/build/index.js db push --skip-generate

# Seed database (idempotent — skips if data exists)
node prisma/seed.js

# Start Next.js
exec node server.js
