import { prisma } from "@/lib/db";
import Link from "next/link";
import DeleteRowButton from "@/components/DeleteRowButton";
import { categoryBadgeClass, categoryLabel, CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import { formatPrice } from "@/lib/currency";
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
  });

  const filtered = !!category || !!q;

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

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-center px-4 py-3 font-medium" title="Подредба в каталога (0–99)">№</th>
              <th className="text-left px-4 py-3 font-medium">Име</th>
              <th className="text-left px-4 py-3 font-medium">Категория</th>
              <th className="text-left px-4 py-3 font-medium">Марка</th>
              <th className="text-right px-4 py-3 font-medium">Цена</th>
              <th className="text-center px-4 py-3 font-medium">Featured</th>
              <th className="text-center px-4 py-3 font-medium">Скрит</th>
              <th className="text-right px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              const isOil = product.category === "OILS";
              const priceText = product.price != null
                ? formatPrice(product.price, {
                    unit: isOil ? product.volumeUnit ?? null : null,
                    showBgn: false,
                  })
                : "-";
              return (
                <tr key={product.id} className={`hover:bg-gray-50 ${product.hidden ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3 text-gray-500">{product.id}</td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-700">{product.sortOrder}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryBadgeClass(product.category)}`}>
                      {categoryLabel(product.category)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                  <td className="px-4 py-3 text-right font-medium">{priceText}</td>
                  <td className="px-4 py-3 text-center">{product.featured ? "✓" : ""}</td>
                  <td className="px-4 py-3 text-center">{product.hidden ? "✓" : ""}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Редактирай
                    </Link>
                    <DeleteRowButton
                      endpoint={`/api/admin/products/${product.id}`}
                      confirmTitle="Изтриване на продукт"
                      confirmMessage={`Сигурни ли сте, че искате да изтриете "${product.name}"? Действието е необратимо.`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            {filtered ? "Няма намерени продукти за този филтър." : "Няма продукти."}
          </p>
        )}
      </div>
    </>
  );
}
