"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteRowButton from "@/components/DeleteRowButton";
import { categoryBadgeClass, categoryLabel } from "@/lib/categories";
import type { PromotionStatus } from "@/lib/promotion";
import { PROMOTION_STATUS_CLASS, PROMOTION_STATUS_LABEL } from "@/lib/promotion";

export interface AdminProductRow {
  id: number;
  sortOrder: number;
  name: string;
  category: string;
  brand: string;
  priceText: string;
  featured: boolean;
  hidden: boolean;
  promotion: { id: number; title: string; status: PromotionStatus } | null;
}

interface AdminProductsTableProps {
  products: AdminProductRow[];
  filtered: boolean;
}

/**
 * Admin product listing with row checkboxes. Selecting one or more rows shows
 * a bulk bar whose only action (for now) is "create a promotion for the
 * selected products", which hands the ids to /admin/promotions/new.
 */
export default function AdminProductsTable({ products, filtered }: AdminProductsTableProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  const allSelected = products.length > 0 && products.every((p) => selected.has(p.id));
  const selectedIds = useMemo(
    () => products.filter((p) => selected.has(p.id)).map((p) => p.id),
    [products, selected]
  );

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(products.map((p) => p.id)));
  };

  const createPromotion = () => {
    if (selectedIds.length === 0) return;
    router.push(`/admin/promotions/new?products=${selectedIds.join(",")}`);
  };

  return (
    <>
      {selectedIds.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-3 mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
          data-testid="bulk-bar"
        >
          <span className="text-sm text-red-900">
            Избрани: <strong>{selectedIds.length}</strong>
          </span>
          <button
            type="button"
            onClick={createPromotion}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Промоция за избраните
          </button>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Изчисти избора
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-3 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Избери всички"
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
              </th>
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-center px-4 py-3 font-medium" title="Подредба в каталога (0–99)">№</th>
              <th className="text-left px-4 py-3 font-medium">Име</th>
              <th className="text-left px-4 py-3 font-medium">Категория</th>
              <th className="text-left px-4 py-3 font-medium">Марка</th>
              <th className="text-right px-4 py-3 font-medium">Цена</th>
              <th className="text-left px-4 py-3 font-medium">Промоция</th>
              <th className="text-center px-4 py-3 font-medium">Featured</th>
              <th className="text-center px-4 py-3 font-medium">Скрит</th>
              <th className="text-right px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className={`hover:bg-gray-50 ${product.hidden ? "opacity-50" : ""}`}>
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(product.id)}
                    onChange={() => toggle(product.id)}
                    aria-label={`Избери ${product.name}`}
                    data-product-id={product.id}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                </td>
                <td className="px-4 py-3 text-gray-500">{product.id}</td>
                <td className="px-4 py-3 text-center font-semibold text-gray-700">{product.sortOrder}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryBadgeClass(product.category)}`}>
                    {categoryLabel(product.category)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                <td className="px-4 py-3 text-right font-medium">{product.priceText}</td>
                <td className="px-4 py-3">
                  {product.promotion ? (
                    <Link
                      href={`/admin/promotions/${product.promotion.id}/edit`}
                      className={`inline-block text-xs font-semibold px-2 py-1 rounded-full hover:opacity-80 ${PROMOTION_STATUS_CLASS[product.promotion.status]}`}
                      title={`${product.promotion.title} — ${PROMOTION_STATUS_LABEL[product.promotion.status]}`}
                    >
                      {product.promotion.title}
                    </Link>
                  ) : (
                    <Link
                      href={`/admin/promotions/new?products=${product.id}`}
                      className="text-xs text-gray-400 hover:text-red-600"
                    >
                      + промоция
                    </Link>
                  )}
                </td>
                <td className="px-4 py-3 text-center">{product.featured ? "✓" : ""}</td>
                <td className="px-4 py-3 text-center">{product.hidden ? "✓" : ""}</td>
                <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
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
            ))}
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
