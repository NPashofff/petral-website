import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { logError } from "@/lib/logger";
import { imagesJsonSchema } from "@/lib/validation";
import { normalizeImagesString } from "@/lib/images";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Не сте влезли" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const {
      name, slug, description, price, category, brand, year,
      horsepower, engine, weight, viscosity, volumeValue, volumeUnit,
      images, address, lat, lon, featured, hidden, colorIds, colorImageMap,
    } = body;

    if (!name || !slug || !category || !brand) {
      return NextResponse.json({ error: "Моля, попълнете всички задължителни полета." }, { status: 400 });
    }

    const imagesValidation = imagesJsonSchema.safeParse(images);
    if (!imagesValidation.success) {
      return NextResponse.json(
        { error: imagesValidation.error.issues[0].message },
        { status: 400 }
      );
    }
    const normalizedImages = normalizeImagesString(images);

    const cleanColorIds: number[] = Array.isArray(colorIds)
      ? colorIds.map((x: unknown) => Number(x)).filter((x) => Number.isFinite(x))
      : [];

    const productId = parseInt(id);

    const product = await prisma.product.update({
      where: { id: productId },
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
        images: normalizedImages,
        address: address || null,
        lat: lat != null ? parseFloat(lat) : null,
        lon: lon != null ? parseFloat(lon) : null,
        featured: !!featured,
        hidden: !!hidden,
        colors: { set: cleanColorIds.map((id) => ({ id })) },
      },
    });

    await prisma.productColorImage.deleteMany({ where: { productId } });

    const colorImageRows = cleanColorIds
      .map((colorId) => ({
        productId,
        colorId,
        imageUrl: typeof colorImageMap?.[colorId] === "string" ? colorImageMap[colorId].trim() : "",
      }))
      .filter((row) => row.imageUrl.length > 0);

    if (colorImageRows.length > 0) {
      await prisma.productColorImage.createMany({ data: colorImageRows });
    }

    return NextResponse.json({ success: true, id: product.id });
  } catch (err) {
    await logError(err, { route: "/api/admin/products/[id]" });
    return NextResponse.json({ error: "Грешка при обновяване на продукт." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Не сте влезли" }, { status: 401 });
    }

    const { id } = await context.params;

    // Inquiry rows cascade-delete via the schema relation.
    await prisma.product.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ success: true });
  } catch (err) {
    await logError(err, { route: "/api/admin/products/[id]" });
    return NextResponse.json({ error: "Грешка при изтриване на продукт." }, { status: 500 });
  }
}
