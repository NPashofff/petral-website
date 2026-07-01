"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/currency";

export type OilRow = {
  id: number;
  name: string;
  brand: string;
  price: number | null;
  viscosity: string | null;
  volumeValue: number | null;
  volumeUnit: string | null;
};

type SortKey = "name" | "brand" | "viscosity" | "package" | "price" | "total";
type SortDir = "asc" | "desc";

function totalPrice(r: OilRow): number | null {
  if (r.price == null || r.volumeValue == null) return null;
  return r.price * r.volumeValue;
}

function packageNumeric(r: OilRow): number {
  return r.volumeValue ?? -1;
}

function compare(a: OilRow, b: OilRow, key: SortKey): number {
  switch (key) {
    case "name":
      return a.name.localeCompare(b.name, "bg");
    case "brand":
      return a.brand.localeCompare(b.brand, "bg");
    case "viscosity":
      return (a.viscosity ?? "яяя").localeCompare(b.viscosity ?? "яяя", "en", { numeric: true });
    case "package":
      return packageNumeric(a) - packageNumeric(b);
    case "price":
      return (a.price ?? Infinity) - (b.price ?? Infinity);
    case "total":
      return (totalPrice(a) ?? Infinity) - (totalPrice(b) ?? Infinity);
  }
}

export default function OilsTable({ rows }: { rows: OilRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const v = compare(a, b, sortKey);
      return sortDir === "asc" ? v : -v;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const onSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortDir === "asc" ? "▲" : "▼") : "";

  if (rows.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Няма намерени продукти.</p>
        <p className="text-gray-400 text-sm mt-2">Опитайте с различни филтри.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700 sticky top-0">
            <tr>
              <Th onClick={() => onSort("name")} arrow={arrow("name")}>Име</Th>
              <Th onClick={() => onSort("brand")} arrow={arrow("brand")}>Марка</Th>
              <Th onClick={() => onSort("viscosity")} arrow={arrow("viscosity")}>Вискозитет</Th>
              <Th onClick={() => onSort("package")} arrow={arrow("package")} align="right">Опаковка</Th>
              <Th onClick={() => onSort("price")} arrow={arrow("price")} align="right">Цена/л(кг) без ДДС</Th>
              <Th onClick={() => onSort("total")} arrow={arrow("total")} align="right">Обща цена без ДДС</Th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((r) => {
              const total = totalPrice(r);
              const unit = r.volumeUnit || "";
              return (
                <tr key={r.id} className="hover:bg-green-50/40">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link href={`/catalog/${r.id}`} className="hover:text-[var(--color-primary)] hover:underline">
                      {r.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{r.brand}</td>
                  <td className="px-4 py-3">
                    {r.viscosity ? (
                      <span className="inline-block bg-purple-50 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                        {r.viscosity}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Други</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700 whitespace-nowrap">
                    {r.volumeValue != null && unit ? `${r.volumeValue} ${unit}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {r.price != null ? formatPrice(r.price, { unit: unit || null }) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">
                    {total != null ? formatPrice(total) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/catalog/${r.id}`}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Детайли за ${r.name}`}
                    >
                      →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  onClick,
  arrow,
  align,
}: {
  children: React.ReactNode;
  onClick: () => void;
  arrow: string;
  align?: "right";
}) {
  return (
    <th
      onClick={onClick}
      className={`px-4 py-3 font-semibold cursor-pointer select-none hover:bg-gray-100 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <span className="text-xs text-gray-400 w-3">{arrow}</span>
      </span>
    </th>
  );
}
