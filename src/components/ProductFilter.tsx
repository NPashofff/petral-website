"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CATEGORIES, CATEGORY_KEYS, VISCOSITY_OTHER } from "@/lib/categories";

type FilterMode = "vehicles" | "oils";

interface ProductFilterProps {
  brands: string[];
  viscosities?: string[];
  packageSizes?: string[];
  mode?: FilterMode;
}

export default function ProductFilter({
  brands,
  viscosities = [],
  packageSizes = [],
  mode = "vehicles",
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const basePath = mode === "oils" ? "/oils" : "/catalog";

  const currentCategory = searchParams.get("category") || "";
  const currentBrand = searchParams.get("brand") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentViscosity = searchParams.get("viscosity") || "";
  const currentPackage = searchParams.get("package") || "";
  const currentSearch = searchParams.get("q") || "";
  const [search, setSearch] = useState(currentSearch);

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Any filter change resets pagination.
      if (key !== "page") params.delete("page");
      router.push(`${basePath}?${params.toString()}`);
    },
    [router, searchParams, basePath]
  );

  // Debounce the search input so we don't push a navigation on every keystroke.
  useEffect(() => {
    if (search === currentSearch) return;
    const t = setTimeout(() => updateFilters("q", search.trim()), 300);
    return () => clearTimeout(t);
  }, [search, currentSearch, updateFilters]);

  // If the URL query changes externally (browser back, clear button), keep the input in sync.
  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  const clearFilters = () => {
    setSearch("");
    router.push(basePath);
  };

  const hasFilters =
    (mode === "vehicles" && (currentCategory || currentMinPrice || currentMaxPrice)) ||
    currentBrand || currentViscosity || currentPackage || currentSearch;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="mb-4">
        <label htmlFor="product-search" className="block text-sm font-medium text-gray-700 mb-1">
          Търсене
        </label>
        <input
          id="product-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Търси по име или описание..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        {mode === "vehicles" && (
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Категория
            </label>
            <select
              value={currentCategory}
              onChange={(e) => updateFilters("category", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Всички</option>
              {CATEGORY_KEYS.filter((k) => !CATEGORIES[k].fields.oil).map((key) => (
                <option key={key} value={key}>{CATEGORIES[key].label}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Марка
          </label>
          <select
            value={currentBrand}
            onChange={(e) => updateFilters("brand", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Всички</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {mode === "oils" ? (
          <>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Вискозитет
              </label>
              <select
                value={currentViscosity}
                onChange={(e) => updateFilters("viscosity", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Всички</option>
                {viscosities.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
                <option value={VISCOSITY_OTHER}>Други</option>
              </select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Опаковка
              </label>
              <select
                value={currentPackage}
                onChange={(e) => updateFilters("package", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Всички</option>
                {packageSizes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 min-w-[120px]">
              <label className="block text-sm font-medium text-gray-700 mb-1" title="По редовната цена без ДДС; промо цените не се филтрират">
                Мин. цена <span className="font-normal text-gray-400">(редовна)</span>
              </label>
              <input
                type="number"
                value={currentMinPrice}
                onChange={(e) => updateFilters("minPrice", e.target.value)}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex-1 min-w-[120px]">
              <label className="block text-sm font-medium text-gray-700 mb-1" title="По редовната цена без ДДС; промо цените не се филтрират">
                Макс. цена <span className="font-normal text-gray-400">(редовна)</span>
              </label>
              <input
                type="number"
                value={currentMaxPrice}
                onChange={(e) => updateFilters("maxPrice", e.target.value)}
                placeholder="100000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-2"
          >
            Изчисти филтрите
          </button>
        )}
      </div>
    </div>
  );
}
