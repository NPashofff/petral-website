import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { getActivePromo } from "@/lib/promotion";
import { findProductsPromoFirst } from "@/lib/promotion-query";
import ProductFilter from "@/components/ProductFilter";
import Pagination from "@/components/Pagination";
import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Каталог - Петрал Груп",
  description: "Разгледайте нашия каталог с трактори, ATV и UTV. Филтрирайте по категория, марка и цена.",
};

const PAGE_SIZE = 24;

interface CatalogPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    q?: string;
    page?: string;
  }>;
}

function buildQueryString(params: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const str = search.toString();
  return str ? `?${str}` : "";
}

async function ProductList({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const { category, brand, minPrice, maxPrice, q } = params;
  const requestedPage = Math.max(1, parseInt(params.page || "1", 10) || 1);

  const where: Prisma.ProductWhereInput = { category: { not: "OILS" }, hidden: false };
  if (category && category !== "OILS") where.category = category;
  if (brand) where.brand = brand;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }
  const term = q?.trim();
  if (term) {
    where.OR = [
      { name: { contains: term } },
      { description: { contains: term } },
      { brand: { contains: term } },
    ];
  }

  const total = await prisma.product.count({ where });

  if (total === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Няма намерени продукти.</p>
        <p className="text-gray-400 text-sm mt-2">Опитайте с различни филтри.</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const baseQuery = { category, brand, minPrice, maxPrice, q };

  // #14: clamp an out-of-range page to the last page so the grid is never empty
  // while the "стр. N от M" counter shows a non-empty page count.
  const page = Math.min(requestedPage, totalPages);

  // Products with an active promotion come first, then the rest; both groups
  // keep the admin sort order (sortOrder desc, newest first).
  const products = await findProductsPromoFirst({
    where,
    orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const buildHref = (target: number) =>
    `/catalog${buildQueryString({ ...baseQuery, page: target > 1 ? String(target) : undefined })}`;

  return (
    <>
      <p className="text-gray-500 mb-6">
        {total} продукт{total !== 1 ? "а" : ""}
        {totalPages > 1 && ` · стр. ${page} от ${totalPages}`}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} promo={getActivePromo(product)} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />
    </>
  );
}

export default async function CatalogPage(props: CatalogPageProps) {
  const params = await props.searchParams;

  if (params.category === "OILS") {
    redirect("/oils");
  }

  const brands = await prisma.product.findMany({
    where: { category: { not: "OILS" }, hidden: false },
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });
  const brandList = brands.map((b) => b.brand);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог</h1>
      <Suspense fallback={<div className="bg-white rounded-xl shadow-md p-6 mb-8 h-20" />}>
        <ProductFilter mode="vehicles" brands={brandList} />
      </Suspense>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Зареждане...</div>}>
        <ProductList searchParams={Promise.resolve(params)} />
      </Suspense>
    </div>
  );
}
