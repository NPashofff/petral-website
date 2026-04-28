import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name, slug, description, price, category, brand, year,
      horsepower, engine, weight, viscosity, volumeValue, volumeUnit,
      images, address, lat, lon, featured, colorIds,
    } = body;

    if (!name || !slug || !category || !brand) {
      return NextResponse.json({ error: "Моля, попълнете всички задължителни полета." }, { status: 400 });
    }

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
        price: price != null && price !== "" ? parseFloat(price) : null,
        category,
        brand,
        year: year != null && year !== "" ? parseInt(year) : null,
        horsepower: horsepower || null,
        engine: engine || null,
        weight: weight || null,
        viscosity: viscosity || null,
        volumeValue: volumeValue != null && volumeValue !== "" ? parseFloat(volumeValue) : null,
        volumeUnit: volumeUnit || null,
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
