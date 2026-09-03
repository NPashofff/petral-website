/**
 * Promotion helpers shared by server pages, client components and the admin
 * API. Pure functions only — no Prisma imports — so they can run in the browser.
 *
 * Pricing rules (agreed with the client):
 *  - Every price on the site is shown ex-VAT ("без ДДС").
 *  - A PRICE promotion is entered by the admin INCLUDING VAT; it is converted to
 *    a net price (÷ 1.20) and shown by the usual rules. For OILS the product
 *    price is per litre/kg, so a PRICE promotion is a per-unit price too.
 *  - A PERCENT promotion discounts the product's base ex-VAT price.
 *  - An OTHER promotion changes no price: ribbon + comment only.
 *  - Per-colour surcharges are added AFTER the promotion, on top of the
 *    discounted base price.
 *  - A promotion is active when `active` is true and "now" is within the
 *    optional [startsAt, endsAt] window of Sofia calendar days (endsAt is
 *    inclusive of the whole day).
 */

import { sofiaDateString } from "@/lib/dates";

export const VAT_RATE = 0.2;

/** OTHER = no price change (e.g. instalment offers): ribbon + comment only. */
export type PromotionType = "PRICE" | "PERCENT" | "OTHER";

export const PROMOTION_TYPES: PromotionType[] = ["PERCENT", "PRICE", "OTHER"];

export const PROMOTION_TYPE_LABEL: Record<PromotionType, string> = {
  PERCENT: "Процент от цената",
  PRICE: "Фиксирана промо цена (с ДДС)",
  OTHER: "Друго (без промяна на цената)",
};

export function isPromotionType(value: unknown): value is PromotionType {
  return typeof value === "string" && (PROMOTION_TYPES as string[]).includes(value);
}

export interface PromotionLike {
  type: string;
  promoPriceGross: number | null;
  percent: number | null;
  ribbonText: string;
  comment: string | null;
  startsAt: Date | string | null;
  endsAt: Date | string | null;
  active: boolean;
}

/** Serialisable view of an active promotion, safe to pass to client components. */
export interface ActivePromo {
  ribbonText: string;
  comment: string | null;
  /** Discounted base price, net of VAT (EUR). Null when the promotion changes no price. */
  promoPrice: number | null;
  /** Sofia calendar day ("YYYY-MM-DD") the promotion ends on, if bounded. */
  endsOn: string | null;
}

export type PromotionStatus = "active" | "scheduled" | "expired" | "paused";

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Gross (incl. VAT) → net (ex-VAT), rounded to cents. */
export function grossToNet(gross: number): number {
  return round2(gross / (1 + VAT_RATE));
}

function toDate(value: Date | string | null | undefined): Date | null {
  if (value == null) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Status by Sofia calendar days: scheduled while `now` is before the start
 * instant, expired once today's Sofia date is past the end date's Sofia date.
 * Mirrors `activePromotionWhere` in promotion-query.ts — keep the two in sync.
 */
export function promotionStatus(promo: PromotionLike, now: Date = new Date()): PromotionStatus {
  if (!promo.active) return "paused";
  const start = toDate(promo.startsAt);
  const end = toDate(promo.endsAt);
  if (start && now < start) return "scheduled";
  if (end && sofiaDateString(now) > sofiaDateString(end)) return "expired";
  return "active";
}

export function isPromotionActive(promo: PromotionLike | null | undefined, now: Date = new Date()): boolean {
  return !!promo && promotionStatus(promo, now) === "active";
}

/**
 * Net promo price for a base (ex-VAT) price. Returns null when the promotion
 * changes no price (OTHER) or cannot be computed (PERCENT without a base price).
 */
export function computePromoPrice(basePrice: number | null, promo: PromotionLike): number | null {
  if (promo.type === "PRICE") {
    return promo.promoPriceGross != null ? grossToNet(promo.promoPriceGross) : null;
  }
  if (promo.type === "PERCENT") {
    if (basePrice == null || promo.percent == null) return null;
    const pct = Math.min(100, Math.max(0, promo.percent));
    return round2(basePrice * (1 - pct / 100));
  }
  return null;
}

/**
 * Resolve the promotion to show for a product, or null when there is none /
 * it is not currently active. The result is plain JSON (no Date objects).
 * A promotion without a computable price (OTHER, or PERCENT on a product with
 * no price) still returns ribbon + comment; `promoPrice` is just null.
 */
export function getActivePromo(
  product: { price: number | null; promotion?: PromotionLike | null },
  now: Date = new Date()
): ActivePromo | null {
  const promo = product.promotion;
  if (!promo || !isPromotionActive(promo, now)) return null;
  const end = toDate(promo.endsAt);
  return {
    ribbonText: promo.ribbonText || "ПРОМОЦИЯ",
    comment: promo.comment?.trim() ? promo.comment.trim() : null,
    promoPrice: computePromoPrice(product.price, promo),
    endsOn: end ? sofiaDateString(end) : null,
  };
}

/** Effective (net) price after promotion; falls back to the base price. */
export function effectivePrice(basePrice: number | null, promo: ActivePromo | null | undefined): number | null {
  if (promo && promo.promoPrice != null) return promo.promoPrice;
  return basePrice;
}

/** Human label for the discount column in the admin list. */
export function promotionDiscountLabel(
  promo: Pick<PromotionLike, "type" | "percent" | "promoPriceGross">,
  fmt: (eur: number) => string
): string {
  switch (promo.type) {
    case "OTHER":
      return "без промяна на цената";
    case "PERCENT":
      return `−${promo.percent ?? 0}%`;
    case "PRICE":
      return promo.promoPriceGross != null
        ? `${fmt(promo.promoPriceGross)} с ДДС (${fmt(grossToNet(promo.promoPriceGross))} без)`
        : "—";
    default:
      return "—";
  }
}

export const PROMOTION_STATUS_LABEL: Record<PromotionStatus, string> = {
  active: "Активна",
  scheduled: "Предстояща",
  expired: "Изтекла",
  paused: "Спряна",
};

export const PROMOTION_STATUS_CLASS: Record<PromotionStatus, string> = {
  active: "bg-red-100 text-red-700",
  scheduled: "bg-blue-100 text-blue-700",
  expired: "bg-gray-100 text-gray-500",
  paused: "bg-yellow-100 text-yellow-700",
};
