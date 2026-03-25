import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { seedProducts } from "@/lib/seed-data";

export async function POST(req: NextRequest) {
  // Auth check
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mode } = await req.json() as { mode: "clear" | "keep" };

  try {
    if (mode === "clear") {
      // Delete all inquiries first (foreign key constraint)
      await prisma.inquiry.deleteMany({});
      await prisma.product.deleteMany({});
    }

    // Get existing slugs to avoid duplicates in "keep" mode
    const existing = await prisma.product.findMany({ select: { slug: true } });
    const existingSlugs = new Set(existing.map((p) => p.slug));

    const toInsert = mode === "clear"
      ? seedProducts
      : seedProducts.filter((p) => !existingSlugs.has(p.slug));

    if (toInsert.length === 0) {
      return NextResponse.json({
        success: true,
        inserted: 0,
        message: "Всички продукти вече съществуват в базата данни.",
      });
    }

    await prisma.product.createMany({
      data: toInsert.map((p) => ({
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        category: p.category,
        brand: p.brand,
        year: p.year,
        horsepower: p.horsepower,
        engine: p.engine,
        weight: p.weight,
        images: p.images,
        featured: p.featured,
      })),
    });

    return NextResponse.json({
      success: true,
      inserted: toInsert.length,
      message: `Успешно добавени ${toInsert.length} продукта.`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Грешка при посяване на данни." },
      { status: 500 }
    );
  }
}
