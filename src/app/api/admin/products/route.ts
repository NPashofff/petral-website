import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, price, category, brand, year, horsepower, engine, weight, images, address, lat, lon, featured, colorIds } = body;

    if (!name || !slug || !category || !brand || !year) {
      return NextResponse.json({ error: "Моля, попълнете всички задължителни полета." }, { status: 400 });
    }

    // Validate images JSON
    try {
      JSON.parse(images);
    } catch {
      return NextResponse.json({ error: "Невалиден JSON формат за снимки." }, { status: 400 });
    }

    const cleanColorIds: number[] = Array.isArray(colorIds)
      ? colorIds.map((x: unknown) => Number(x)).filter((x) => Number.isFinite(x))
      : [];

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: price != null ? parseFloat(price) : null,
        category,
        brand,
        year: parseInt(year),
        horsepower: horsepower || null,
        engine: engine || null,
        weight: weight || null,
        images,
        address: address || null,
        lat: lat != null ? parseFloat(lat) : null,
        lon: lon != null ? parseFloat(lon) : null,
        featured: !!featured,
        colors: { connect: cleanColorIds.map((id) => ({ id })) },
      },
    });

    return NextResponse.json({ success: true, id: product.id });
  } catch {
    return NextResponse.json({ error: "Грешка при създаване на продукт." }, { status: 500 });
  }
}
