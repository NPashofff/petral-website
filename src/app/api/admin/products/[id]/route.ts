import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logError } from "@/lib/logger";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const {
      name, slug, description, price, category, brand, year,
      horsepower, engine, weight, viscosity, volumeValue, volumeUnit,
      images, address, lat, lon, featured, hidden, colorIds,
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

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
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
        hidden: !!hidden,
        colors: { set: cleanColorIds.map((id) => ({ id })) },
      },
    });

    return NextResponse.json({ success: true, id: product.id });
  } catch (err) {
    await logError(err, { route: "/api/admin/products/[id]" });
    return NextResponse.json({ error: "Грешка при обновяване на продукт." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    // Delete related inquiries first
    await prisma.inquiry.deleteMany({ where: { productId: parseInt(id) } });
    await prisma.product.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ success: true });
  } catch (err) {
    await logError(err, { route: "/api/admin/products/[id]" });
    return NextResponse.json({ error: "Грешка при изтриване на продукт." }, { status: 500 });
  }
}
