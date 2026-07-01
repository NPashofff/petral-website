import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";
import { revalidateProductPaths } from "@/lib/revalidate";
import {
  parseBody,
  productSchema,
  buildProductData,
  buildColorRows,
} from "@/lib/validation";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
  const csrf = requireSameOrigin(request);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const { id } = await context.params;
  const productId = parseInt(id);
  if (!Number.isFinite(productId)) {
    return NextResponse.json({ error: "Невалиден ID." }, { status: 400 });
  }

  const parsed = await parseBody(request, productSchema);
  if ("error" in parsed) return parsed.error;
  const input = parsed.data;

  try {
    // #10/#21: update the product, drop the old color rows and recreate them in
    // one transaction so a partial failure can't leave the product with its
    // color rows deleted but not recreated.
    const product = await prisma.$transaction(async (tx) => {
      const updated = await tx.product.update({
        where: { id: productId },
        data: {
          ...buildProductData(input),
          colors: { set: input.colorIds.map((cid) => ({ id: cid })) },
        },
      });

      await tx.productColorImage.deleteMany({ where: { productId } });

      const colorRows = buildColorRows(productId, input);
      if (colorRows.length > 0) {
        await tx.productColorImage.createMany({ data: colorRows });
      }

      return updated;
    });

    // #27: reflect the edit on the public catalog/oils listings and detail page.
    revalidateProductPaths({ id: productId });

    return NextResponse.json({ success: true, id: product.id });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json(
        { error: "Продукт с този slug вече съществува." },
        { status: 400 }
      );
    }
    await logError(err, { route: "/api/admin/products/[id]" });
    return NextResponse.json({ error: "Грешка при обновяване на продукт." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const csrf = requireSameOrigin(request);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const { id } = await context.params;

    const productId = parseInt(id);
    // Inquiry rows cascade-delete via the schema relation.
    await prisma.product.delete({ where: { id: productId } });

    // #27: drop the deleted product from the public listings/detail caches.
    revalidateProductPaths({ id: productId });

    return NextResponse.json({ success: true });
  } catch (err) {
    await logError(err, { route: "/api/admin/products/[id]" });
    return NextResponse.json({ error: "Грешка при изтриване на продукт." }, { status: 500 });
  }
}
