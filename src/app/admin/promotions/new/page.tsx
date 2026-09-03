import PromotionForm from "@/components/PromotionForm";
import { loadPromotionProductOptions } from "@/lib/promotion-products";

export const dynamic = "force-dynamic";

interface NewPromotionPageProps {
  searchParams: Promise<{ products?: string | string[] }>;
}

export default async function NewPromotionPage({ searchParams }: NewPromotionPageProps) {
  const params = await searchParams;
  const products = await loadPromotionProductOptions();
  const known = new Set(products.map((p) => p.id));
  // Next.js delivers string[] for a repeated key (?products=1&products=2).
  const raw = Array.isArray(params.products) ? params.products.join(",") : params.products ?? "";
  const preselected = raw
    .split(",")
    .map((x) => parseInt(x, 10))
    .filter((x) => Number.isInteger(x) && known.has(x));

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Нова промоция</h1>
      <PromotionForm products={products} initialData={{ productIds: preselected }} />
    </>
  );
}
