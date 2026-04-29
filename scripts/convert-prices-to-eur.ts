/**
 * One-shot migration: divide every Product.price by 1.95583 to convert BGN → EUR.
 * Idempotency guard: refuses to run if .price-converted-to-eur file already exists.
 *
 * Run: npx tsx scripts/convert-prices-to-eur.ts
 */
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { bgnToEur } from "../src/lib/currency";

const prisma = new PrismaClient();
const FLAG = path.join(process.cwd(), "prisma", ".price-converted-to-eur");

async function main() {
  if (fs.existsSync(FLAG)) {
    console.log("Already converted (flag file exists). Refusing to run again.");
    return;
  }

  const products = await prisma.product.findMany({ where: { price: { not: null } } });
  console.log(`Converting ${products.length} products from BGN to EUR…`);

  let updated = 0;
  for (const p of products) {
    const eur = bgnToEur(p.price!);
    await prisma.product.update({ where: { id: p.id }, data: { price: eur } });
    updated++;
  }

  fs.writeFileSync(FLAG, new Date().toISOString());
  console.log(`Done. ${updated} products updated. Flag written to ${FLAG}.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
