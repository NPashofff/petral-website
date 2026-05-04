// One-shot migration: move public/uploads -> data/uploads and rewrite DB
// references from "/uploads/foo.jpg" to "/api/uploads/foo.jpg".
// Idempotent: safe to run on every container start.

const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const OLD_PREFIX = "/uploads/";
const NEW_PREFIX = "/api/uploads/";

// Only rewrite "/uploads/" when it's a same-origin path (start of string,
// after a quote, whitespace, or "(" — i.e. not part of a larger URL like
// "https://example.com/wp-content/uploads/..."). The negative lookbehind
// for word/path chars protects external URLs.
const REWRITE_RE = /(^|[\s"'(=,>])\/uploads\//g;
const REWRITE_REPLACEMENT = `$1${NEW_PREFIX}`;

function rewrite(value) {
  if (typeof value !== "string" || !value.includes(OLD_PREFIX)) return value;
  return value.replace(REWRITE_RE, REWRITE_REPLACEMENT);
}

async function main() {
  const cwd = process.cwd();
  const oldDir = path.join(cwd, "public", "uploads");
  const newDir = path.join(cwd, "data", "uploads");

  // 1. Recursively copy files from old dir to new dir (skip if already present).
  fs.mkdirSync(newDir, { recursive: true });
  let moved = 0;
  function copyRecursive(srcDir, dstDir) {
    let entries;
    try {
      entries = fs.readdirSync(srcDir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const src = path.join(srcDir, e.name);
      const dst = path.join(dstDir, e.name);
      if (e.isDirectory()) {
        fs.mkdirSync(dst, { recursive: true });
        copyRecursive(src, dst);
      } else if (e.isFile()) {
        if (fs.existsSync(dst)) continue;
        fs.copyFileSync(src, dst);
        moved++;
      }
    }
  }
  if (fs.existsSync(oldDir)) copyRecursive(oldDir, newDir);
  if (moved > 0) console.log(`[migrate-uploads] copied ${moved} file(s) to data/uploads`);

  // 2. Rewrite DB references.
  const prisma = new PrismaClient();
  try {
    let updatedProducts = 0;
    const products = await prisma.product.findMany({
      select: { id: true, images: true, description: true },
    });
    for (const p of products) {
      const newImages = rewrite(p.images);
      const newDescription = rewrite(p.description);
      if (newImages !== p.images || newDescription !== p.description) {
        await prisma.product.update({
          where: { id: p.id },
          data: { images: newImages, description: newDescription },
        });
        updatedProducts++;
      }
    }
    if (updatedProducts > 0) console.log(`[migrate-uploads] rewrote URLs in ${updatedProducts} product(s)`);

    let updatedContent = 0;
    const siteContent = await prisma.siteContent.findMany();
    for (const sc of siteContent) {
      const newValue = rewrite(sc.value);
      if (newValue !== sc.value) {
        await prisma.siteContent.update({
          where: { key: sc.key },
          data: { value: newValue },
        });
        updatedContent++;
      }
    }
    if (updatedContent > 0) console.log(`[migrate-uploads] rewrote URLs in ${updatedContent} site_content row(s)`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("[migrate-uploads] failed:", err);
  process.exit(1);
});
