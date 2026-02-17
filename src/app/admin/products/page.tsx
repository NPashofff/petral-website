import { prisma } from "@/lib/db";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Продукти</h1>
        <Link
          href="/admin/products/new"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Добави продукт
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Име</th>
              <th className="text-left px-4 py-3 font-medium">Категория</th>
              <th className="text-left px-4 py-3 font-medium">Марка</th>
              <th className="text-right px-4 py-3 font-medium">Цена</th>
              <th className="text-center px-4 py-3 font-medium">Featured</th>
              <th className="text-right px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{product.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    product.category === "TRACTOR" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                  }`}>
                    {product.category === "TRACTOR" ? "Трактор" : "АТВ"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                <td className="px-4 py-3 text-right font-medium">{product.price.toLocaleString("bg-BG")} лв.</td>
                <td className="px-4 py-3 text-center">{product.featured ? "✓" : ""}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Редактирай
                  </Link>
                  <DeleteProductButton productId={product.id} productName={product.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center text-gray-400 py-8">Няма продукти.</p>
        )}
      </div>
    </>
  );
}
