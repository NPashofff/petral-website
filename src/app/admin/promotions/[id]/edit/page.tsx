import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import PromotionForm from "@/components/PromotionForm";
import { loadPromotionProductOptions } from "@/lib/promotion-products";
import { promotionToFormData } from "@/lib/promotion-admin";

export const dynamic = "force-dynamic";

interface EditPromotionPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPromotionPage({ params }: EditPromotionPageProps) {
  const { id } = await params;
  const promotionId = parseInt(id, 10);
  if (!Number.isFinite(promotionId)) notFound();

  const [promotion, products] = await Promise.all([
    prisma.promotion.findUnique({
      where: { id: promotionId },
      include: { products: { select: { id: true, name: true } } },
    }),
    loadPromotionProductOptions(),
  ]);
  if (!promotion) notFound();

  const initialData = promotionToFormData(
    promotion,
    promotion.products.map((p) => p.id)
  );

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Редактирай промоция: {promotion.title}</h1>
      <PromotionForm initialData={initialData} promotionId={promotion.id} products={products} />
    </>
  );
}
