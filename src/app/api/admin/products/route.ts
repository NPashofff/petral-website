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

export async function POST(request: Request) {
  const csrf = requireSameOrigin(request);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const parsed = await parseBody(request, productSchema);
  if ("error" in parsed) return parsed.error;
  const input = parsed.data;

  try {
    // #10/#21: create the product AND its color rows in one transaction so a
    // partial failure rolls back fully (never a product without its color rows).
    const product = await prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          ...buildProductData(input),
          colors: { connect: input.colorIds.map((id) => ({ id })) },
        },
      });

      const colorRows = buildColorRows(created.id, input);
      if (colorRows.length > 0) {
        await tx.productColorImage.createMany({ data: colorRows });
      }

      return created;
    });

    // #27: a new product must appear on the public catalog/oils listings.
    revalidateProductPaths(product);

    return NextResponse.json({ success: true, id: product.id });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json(
        { error: "Продукт с този slug вече съществува." },
        { status: 400 }
      );
    }
    await logError(err, { route: "/api/admin/products" });
    return NextResponse.json({ error: "Грешка при създаване на продукт." }, { status: 500 });
  }
}
