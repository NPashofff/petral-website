import { Suspense } from "react";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import { VISCOSITY_OTHER } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Каталог - Петрал Груп",
  description: "Разгледайте нашия каталог с трактори, ATV и масла. Филтрирайте по категория, марка и цена.",
};

interface CatalogPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    viscosity?: string;
    package?: string;
  }>;
}

function parsePackageParam(pkg: string | undefined): { value: number; unit: string } | null {
  if (!pkg) return null;
  const m = pkg.match(/^(\d+(?:\.\d+)?)(L|kg)$/i);
  if (!m) return null;
  return { value: parseFloat(m[1]), unit: m[2] === "L" ? "L" : "kg" };
}

async function ProductList({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const { category, brand, minPrice, maxPrice, viscosity, package: pkg } = params;

  const where: Prisma.ProductWhereInput = {};
  if (category) where.category = category;
  if (brand) where.brand = brand;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }
  if (viscosity === VISCOSITY_OTHER) {
    where.viscosity = null;
  } else if (viscosity) {
    where.viscosity = viscosity;
  }
  const parsedPkg = parsePackageParam(pkg);
  if (parsedPkg) {
    where.volumeValue = parsedPkg.value;
    where.volumeUnit = parsedPkg.unit;
  }

  const products = await prisma.product.findMany({ where, orderBy: { createdAt: "desc" } });

  return products.length === 0 ? (
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
  );
}

export default async function CatalogPage(props: CatalogPageProps) {
  const params = await props.searchParams;
  const isOils = params.category === "OILS";

  const brandWhere: Prisma.ProductWhereInput = isOils ? { category: "OILS" } : {};
  const brands = await prisma.product.findMany({
    where: brandWhere,
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });
  const brandList = brands.map((b) => b.brand);

  let viscosities: string[] = [];
  let packageSizes: string[] = [];
  if (isOils) {
    const visRows = await prisma.product.findMany({
      where: { category: "OILS", viscosity: { not: null } },
      select: { viscosity: true },
      distinct: ["viscosity"],
    });
    viscosities = visRows
      .map((r) => r.viscosity!)
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

    const pkgRows = await prisma.product.findMany({
      where: { category: "OILS", volumeValue: { not: null }, volumeUnit: { not: null } },
      select: { volumeValue: true, volumeUnit: true },
    });
    const seen = new Set<string>();
    for (const r of pkgRows) {
      const key = `${r.volumeValue}${r.volumeUnit}`;
      seen.add(key);
    }
    packageSizes = Array.from(seen).sort((a, b) => {
      const aNum = parseFloat(a);
      const bNum = parseFloat(b);
      return aNum - bNum;
    });
  }

  // Re-construct a compatible searchParams Promise for the inner component
  const searchParamsPromise = Promise.resolve(params);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог</h1>
      <Suspense fallback={<div className="bg-white rounded-xl shadow-md p-6 mb-8 h-20" />}>
        <ProductFilter brands={brandList} viscosities={viscosities} packageSizes={packageSizes} />
      </Suspense>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Зареждане...</div>}>
        <ProductList searchParams={searchParamsPromise} />
      </Suspense>
    </div>
  );
}
