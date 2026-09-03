import { prisma } from "@/lib/db";
import Link from "next/link";
import AdminProductsTable, { type AdminProductRow } from "@/components/AdminProductsTable";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import { formatPrice } from "@/lib/currency";
import { promotionStatus } from "@/lib/promotion";
import type { Prisma } from "@prisma/client";

// #28: admin listing must always reflect live DB state (just-edited products,
// hidden flags, sort order), so it stays dynamic rather than cached.
export const dynamic = "force-dynamic";

interface AdminProductsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const params = await searchParams;
  const category =
    typeof params.category === "string" && (CATEGORY_KEYS as readonly string[]).includes(params.category)
      ? params.category
      : "";
  const q = (params.q ?? "").trim();

  const where: Prisma.ProductWhereInput = {};
  if (category) where.category = category;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { brand: { contains: q } },
      { slug: { contains: q } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    include: { promotion: true },
  });

  const filtered = !!category || !!q;

  const rows: AdminProductRow[] = products.map((product) => {
    const isOil = product.category === "OILS";
    return {
      id: product.id,
      sortOrder: product.sortOrder,
      name: product.name,
      category: product.category,
      brand: product.brand,
      priceText:
        product.price != null
          ? formatPrice(product.price, { unit: isOil ? product.volumeUnit ?? null : null, showBgn: false })
          : "-",
      featured: product.featured,
      hidden: product.hidden,
      promotion: product.promotion
        ? { id: product.promotion.id, title: product.promotion.title, status: promotionStatus(product.promotion) }
        : null,
    };
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Продукти</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/products/import"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Импорт от Excel
          </Link>
          <Link
            href="/admin/products/new"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Добави продукт
          </Link>
        </div>
      </div>

      {/* Filter bar (category + search) */}
      <form method="get" className="flex flex-wrap items-end gap-3 mb-4 bg-white rounded-xl shadow-md p-4">
        <div>
          <label htmlFor="filter-category" className="block text-xs font-medium text-gray-500 mb-1">
            Категория
          </label>
          <select
            id="filter-category"
            name="category"
            defaultValue={category}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Всички категории</option>
            {CATEGORY_KEYS.map((key) => (
              <option key={key} value={key}>
                {CATEGORIES[key].label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="filter-q" className="block text-xs font-medium text-gray-500 mb-1">
            Търсене
          </label>
          <input
            id="filter-q"
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Име, марка или slug"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Търси
        </button>
        {filtered && (
          <Link
            href="/admin/products"
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Изчисти
          </Link>
        )}
      </form>

      <p className="text-sm text-gray-500 mb-4">
        {products.length} продукт{products.length === 1 ? "" : "а"}
        {filtered ? " (филтрирани)" : ""}
      </p>

      <AdminProductsTable products={rows} filtered={filtered} />
    </>
  );
}
