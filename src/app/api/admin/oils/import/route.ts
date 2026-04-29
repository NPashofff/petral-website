import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/db";
import { detectCurrency, parseBrandFromFilename, parsePackage, parseViscosity, slugify } from "@/lib/oil-import";
import { bgnToEur } from "@/lib/currency";

export const runtime = "nodejs";

type ImportError = { row: number; name: string; reason: string };

export async function POST(req: NextRequest) {
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

    let created = 0;
    let updated = 0;
    let skipped = 0;
    const errors: ImportError[] = [];

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

      try {
        const existing = await prisma.product.findFirst({
          where: { name, brand, category: "OILS" },
        });

        if (existing) {
          await prisma.product.update({
            where: { id: existing.id },
            data: {
              price,
              viscosity,
              volumeValue: pkg?.value ?? null,
              volumeUnit: pkg?.unit ?? null,
            },
          });
          updated++;
        } else {
          let slug = slugify(`${brand}-${name}`);
          const slugTaken = await prisma.product.findUnique({ where: { slug } });
          if (slugTaken) slug = `${slug}-${Date.now().toString(36)}-${i}`;

          await prisma.product.create({
            data: {
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
            },
          });
          created++;
        }
      } catch (e) {
        errors.push({ row: i + 1, name, reason: e instanceof Error ? e.message : "unknown" });
      }
    }

    return NextResponse.json({ brand, currency, created, updated, skipped, errors });
  } catch (e) {
    return NextResponse.json(
      { error: "Грешка при импорт.", detail: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
