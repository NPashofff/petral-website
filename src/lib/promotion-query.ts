import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { sofiaStartOfDay } from "@/lib/dates";

/**
 * Prisma filter for a promotion that is active "now": the admin flag is on and
 * the optional [startsAt, endsAt] window contains today (Sofia calendar day).
 * `endsAt` is stored as the start instant of its (inclusive) last day, so it
 * must be >= the start of today. Mirrors `promotionStatus` in promotion.ts.
 */
export function activePromotionWhere(now: Date = new Date()): Prisma.PromotionWhereInput {
  return {
    active: true,
    AND: [
      { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
      { OR: [{ endsAt: null }, { endsAt: { gte: sofiaStartOfDay(now) } }] },
    ],
  };
}

type FindArgs = {
  where: Prisma.ProductWhereInput;
  orderBy: Prisma.ProductOrderByWithRelationInput[];
  skip: number;
  take: number;
  now?: Date;
};

/**
 * Paginated product query that lists products with an ACTIVE promotion first,
 * then everything else, each group ordered by `orderBy`. Done as two queries
 * (promo / non-promo) with the page offset split between them, because the
 * date-window condition cannot be expressed as a Prisma `orderBy`.
 */
export async function findProductsPromoFirst({ where, orderBy, skip, take, now = new Date() }: FindArgs) {
  const promo = activePromotionWhere(now);
  const wherePromo: Prisma.ProductWhereInput = { AND: [where, { promotion: promo }] };
  const whereRest: Prisma.ProductWhereInput = {
    AND: [where, { OR: [{ promotionId: null }, { promotion: { isNot: promo } }] }],
  };
  const include = { promotion: true } as const;

  // On page 1 the offset is 0, so the promo count is not needed to split it.
  const promoCount = skip > 0 ? await prisma.product.count({ where: wherePromo }) : Infinity;

  const promoPart =
    skip < promoCount
      ? await prisma.product.findMany({ where: wherePromo, orderBy, skip, take, include })
      : [];
  const remaining = take - promoPart.length;
  if (remaining <= 0) return promoPart;

  const restSkip = skip > 0 ? Math.max(0, skip - promoCount) : 0;
  const restPart = await prisma.product.findMany({
    where: whereRest,
    orderBy,
    skip: restSkip,
    take: remaining,
    include,
  });
  return [...promoPart, ...restPart];
}
