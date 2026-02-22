import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, price, category, brand, year, horsepower, engine, weight, images, featured } = body;

    if (!name || !slug || !description || price == null || !category || !brand || !year) {
      return NextResponse.json({ error: "Моля, попълнете всички задължителни полета." }, { status: 400 });
    }

    // Validate images JSON
    try {
      JSON.parse(images);
    } catch {
      return NextResponse.json({ error: "Невалиден JSON формат за снимки." }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        category,
        brand,
        year: parseInt(year),
        horsepower: horsepower || null,
        engine: engine || null,
        weight: weight || null,
        images,
        featured: !!featured,
      },
    });

    return NextResponse.json({ success: true, id: product.id });
  } catch {
    return NextResponse.json({ error: "Грешка при създаване на продукт." }, { status: 500 });
  }
}
