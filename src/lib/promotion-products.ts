import { prisma } from "@/lib/db";
import type { PromotionProductOption } from "@/components/PromotionForm";

/** All products (incl. hidden) as picker options for the promotion form. */
export async function loadPromotionProductOptions(): Promise<PromotionProductOption[]> {
  const products = await prisma.product.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      brand: true,
      category: true,
      price: true,
      volumeValue: true,
      volumeUnit: true,
      promotionId: true,
      promotion: { select: { title: true } },
    },
  });
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    volumeValue: p.volumeValue,
    volumeUnit: p.volumeUnit,
    promotionId: p.promotionId,
    promotionTitle: p.promotion?.title ?? null,
  }));
}
