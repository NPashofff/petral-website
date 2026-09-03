import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";
import { parseBody, promotionSchema, buildPromotionData } from "@/lib/validation";
import { revalidatePromotionPaths } from "@/lib/revalidate";

export async function POST(req: NextRequest) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const parsed = await parseBody(req, promotionSchema);
  if ("error" in parsed) return parsed.error;
  const input = parsed.data;

  try {
    const promotion = await prisma.$transaction(async (tx) => {
      const created = await tx.promotion.create({ data: buildPromotionData(input) });
      if (input.productIds.length > 0) {
        // A product belongs to at most one promotion: attaching it here moves
        // it out of any promotion it was in before.
        await tx.product.updateMany({
          where: { id: { in: input.productIds } },
          data: { promotionId: created.id },
        });
      }
      return created;
    });

    revalidatePromotionPaths(input.productIds);
    return NextResponse.json({ success: true, id: promotion.id });
  } catch (err) {
    await logError(err, { route: "/api/admin/promotions" });
    return NextResponse.json({ error: "Грешка при създаване на промоция." }, { status: 500 });
  }
}
