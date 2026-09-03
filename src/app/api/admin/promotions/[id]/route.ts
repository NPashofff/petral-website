import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";
import { parseBody, promotionSchema, buildPromotionData } from "@/lib/validation";
import { revalidatePromotionPaths } from "@/lib/revalidate";
import { Prisma } from "@prisma/client";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** Prisma P2025: the row to update/delete no longer exists (e.g. a stale admin tab). */
function isNotFound(err: unknown): boolean {
  return err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025";
}

function notFoundResponse() {
  return NextResponse.json({ error: "Промоцията не е намерена." }, { status: 404 });
}

async function parseId(context: RouteContext): Promise<number | NextResponse> {
  const { id } = await context.params;
  const n = parseInt(id);
  if (!Number.isFinite(n)) {
    return NextResponse.json({ error: "Невалиден ID." }, { status: 400 });
  }
  return n;
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const id = await parseId(context);
  if (id instanceof NextResponse) return id;

  const parsed = await parseBody(req, promotionSchema);
  if ("error" in parsed) return parsed.error;
  const input = parsed.data;

  try {
    const previousIds = (
      await prisma.product.findMany({ where: { promotionId: id }, select: { id: true } })
    ).map((p) => p.id);

    await prisma.$transaction(async (tx) => {
      await tx.promotion.update({ where: { id }, data: buildPromotionData(input) });
      // Detach products no longer selected, then attach the current selection.
      await tx.product.updateMany({
        where: { promotionId: id, id: { notIn: input.productIds } },
        data: { promotionId: null },
      });
      if (input.productIds.length > 0) {
        await tx.product.updateMany({
          where: { id: { in: input.productIds } },
          data: { promotionId: id },
        });
      }
    });

    revalidatePromotionPaths([...previousIds, ...input.productIds]);
    return NextResponse.json({ success: true, id });
  } catch (err) {
    if (isNotFound(err)) return notFoundResponse();
    await logError(err, { route: "/api/admin/promotions/[id]" });
    return NextResponse.json({ error: "Грешка при обновяване на промоция." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const id = await parseId(context);
  if (id instanceof NextResponse) return id;

  try {
    const affected = (
      await prisma.product.findMany({ where: { promotionId: id }, select: { id: true } })
    ).map((p) => p.id);
    // Product.promotionId is SetNull on delete, so products are detached automatically.
    await prisma.promotion.delete({ where: { id } });
    revalidatePromotionPaths(affected);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (isNotFound(err)) return notFoundResponse();
    await logError(err, { route: "/api/admin/promotions/[id]" });
    return NextResponse.json({ error: "Грешка при изтриване на промоция." }, { status: 500 });
  }
}
