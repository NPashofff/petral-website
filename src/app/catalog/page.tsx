import { Suspense } from "react";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Каталог - PetralGroup",
  description: "Разгледайте нашия каталог с трактори и АТВ-та. Филтрирайте по категория, марка и цена.",
};

interface CatalogPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

async function CatalogContent({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const { category, brand, minPrice, maxPrice } = params;

  const where: Prisma.ProductWhereInput = {};
  if (category) where.category = category;
  if (brand) where.brand = brand;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  const [products, brands] = await Promise.all([
    prisma.product.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ select: { brand: true }, distinct: ["brand"], orderBy: { brand: "asc" } }),
  ]);

  const brandList = brands.map((b) => b.brand);

  return (
    <>
      <ProductFilter brands={brandList} />

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Няма намерени продукти.</p>
          <p className="text-gray-400 text-sm mt-2">Опитайте с различни филтри.</p>
        </div>
      ) : (
        <>
          <p className="text-gray-500 mb-6">{products.length} продукт{products.length !== 1 ? "а" : ""}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function CatalogPage(props: CatalogPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог</h1>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Зареждане...</div>}>
        <CatalogContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
