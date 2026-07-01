import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { detectCurrency, parseBrandFromFilename, parsePackage, parseViscosity, slugify } from "@/lib/oil-import";
import { bgnToEur } from "@/lib/currency";
import { logError } from "@/lib/logger";
import { revalidateProductPaths } from "@/lib/revalidate";

export const runtime = "nodejs";

type ImportError = { row: number; name: string; reason: string };

export async function POST(req: NextRequest) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Не е избран файл." }, { status: 400 });
    }

    if (!file.name.match(/\.xlsx?$/i)) {
      return NextResponse.json({ error: "Очаква се .xlsx или .xls файл." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Файлът е твърде голям. Максимум 10MB." }, { status: 400 });
    }

    const brand = parseBrandFromFilename(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    if (!sheet) {
      return NextResponse.json({ error: "Файлът няма листове." }, { status: 400 });
    }

    const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, blankrows: false });

    const headerCell = rows[0]?.[1];
    const headerText = headerCell != null ? String(headerCell) : "";
    const currency = detectCurrency(headerText);
    if (!currency) {
      return NextResponse.json(
        {
          error:
            `Не мога да определя валутата от заглавието на колона B: "${headerText.slice(0, 120)}". ` +
            `Очаквам да съдържа "лв"/"BGN" или "€"/"EUR"/"евро".`,
        },
        { status: 400 }
      );
    }

    let skipped = 0;
    const errors: ImportError[] = [];

    // #12: Preload the existing OILS products for this brand ONCE (no per-row
    // findFirst/findUnique). Lets us resolve insert-vs-update and slug collisions
    // entirely in memory before issuing batched writes inside a transaction.
    const existingProducts = await prisma.product.findMany({
      where: { brand, category: "OILS" },
      select: { id: true, name: true, slug: true },
    });
    const existingByName = new Map<string, { id: number }>();
    const takenSlugs = new Set<string>();
    for (const p of existingProducts) {
      existingByName.set(p.name, { id: p.id });
      takenSlugs.add(p.slug);
    }

    type UpdateOp = {
      id: number;
      price: number;
      viscosity: string | null;
      volumeValue: number | null;
      volumeUnit: string | null;
    };
    type CreateOp = {
      name: string;
      slug: string;
      description: string;
      price: number;
      category: string;
      brand: string;
      year: null;
      viscosity: string | null;
      volumeValue: number | null;
      volumeUnit: string | null;
      images: string;
    };
    const updateOps: UpdateOp[] = [];
    const createOps: CreateOp[] = [];
    // Track names seen within THIS file so duplicate rows don't both insert.
    const seenNames = new Set<string>();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i] as unknown[];
      const rawName = row?.[0];
      const rawPrice = row?.[1];

      if (rawName == null || String(rawName).trim() === "") {
        skipped++;
        continue;
      }

      const name = String(rawName).trim();
      const lowerName = name.toLowerCase();
      if (
        lowerName.includes("описание") ||
        lowerName.includes("клиентска цена") ||
        lowerName.includes("отстъпка") ||
        lowerName.includes("фактурна цена")
      ) {
        skipped++;
        continue;
      }

      const rawPriceNum = typeof rawPrice === "number" ? rawPrice : parseFloat(String(rawPrice ?? ""));
      if (!isFinite(rawPriceNum) || rawPriceNum <= 0) {
        skipped++;
        continue;
      }
      const price = currency === "BGN" ? bgnToEur(rawPriceNum) : rawPriceNum;

      const viscosity = parseViscosity(name);
      const pkg = parsePackage(name);

      const existing = existingByName.get(name);
      if (existing) {
        updateOps.push({
          id: existing.id,
          price,
          viscosity,
          volumeValue: pkg?.value ?? null,
          volumeUnit: pkg?.unit ?? null,
        });
      } else if (seenNames.has(name)) {
        // Same name appeared earlier in this file and was queued for insert;
        // treat the repeat as a skip to avoid a unique-name collision mid-batch.
        skipped++;
        continue;
      } else {
        let slug = slugify(`${brand}-${name}`);
        if (takenSlugs.has(slug)) slug = `${slug}-${Date.now().toString(36)}-${i}`;
        takenSlugs.add(slug);
        createOps.push({
          name,
          slug,
          description: "",
          price,
          category: "OILS",
          brand,
          year: null,
          viscosity,
          volumeValue: pkg?.value ?? null,
          volumeUnit: pkg?.unit ?? null,
          images: "[]",
        });
      }
      seenNames.add(name);
    }

    // #12: batch the writes in a single transaction (all-or-nothing).
    await prisma.$transaction([
      ...(createOps.length > 0
        ? [prisma.product.createMany({ data: createOps })]
        : []),
      ...updateOps.map((op) =>
        prisma.product.update({
          where: { id: op.id },
          data: {
            price: op.price,
            viscosity: op.viscosity,
            volumeValue: op.volumeValue,
            volumeUnit: op.volumeUnit,
          },
        })
      ),
    ]);

    const created = createOps.length;
    const updated = updateOps.length;

    // #27: a bulk import changes the public oils/catalog listings.
    if (created > 0 || updated > 0) revalidateProductPaths();

    return NextResponse.json({ brand, currency, created, updated, skipped, errors });
  } catch (e) {
    // #33: log server-side, return a generic message (don't leak e.message).
    await logError(e, { route: "admin/oils/import" });
    return NextResponse.json({ error: "Грешка при импорт." }, { status: 500 });
  }
}
