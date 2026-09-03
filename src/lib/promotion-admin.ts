import type { Promotion } from "@prisma/client";
import { sofiaDateString } from "@/lib/dates";
import type { PromotionType } from "@/lib/promotion";

/** Sofia calendar day "YYYY-MM-DD" or null — the shape the admin date inputs use. */
export function toIsoDate(d: Date | null | undefined): string | null {
  return d ? sofiaDateString(d) : null;
}

/** Form-shaped promotion for PromotionForm's initialData. */
export function promotionToFormData(promotion: Promotion, productIds: number[]) {
  return {
    title: promotion.title,
    type: promotion.type as PromotionType,
    promoPriceGross: promotion.promoPriceGross,
    percent: promotion.percent,
    ribbonText: promotion.ribbonText,
    comment: promotion.comment ?? "",
    startsAt: toIsoDate(promotion.startsAt) ?? "",
    endsAt: toIsoDate(promotion.endsAt) ?? "",
    active: promotion.active,
    productIds,
  };
}
