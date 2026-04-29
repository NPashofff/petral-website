import { Suspense } from "react";
import { prisma } from "@/lib/db";
import OilsTable, { type OilRow } from "@/components/OilsTable";
import ProductFilter from "@/components/ProductFilter";
import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import { VISCOSITY_OTHER } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Масла - Петрал Груп",
  description: "Каталог на масла — индустриални, моторни, грийсове. Филтрирайте по марка, вискозитет и опаковка.",
};

interface OilsPageProps {
  searchParams: Promise<{
    brand?: string;
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

async function OilsListing({ searchParams }: OilsPageProps) {
  const params = await searchParams;
  const { brand, viscosity, package: pkg } = params;

  const where: Prisma.ProductWhereInput = { category: "OILS" };
  if (brand) where.brand = brand;
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

  const products = await prisma.product.findMany({
    where,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      brand: true,
      price: true,
      viscosity: true,
      volumeValue: true,
      volumeUnit: true,
    },
  });

  const rows: OilRow[] = products;

  return (
    <>
      <p className="text-gray-500 mb-4">{rows.length} продукт{rows.length !== 1 ? "а" : ""}</p>
      <OilsTable rows={rows} />
    </>
  );
}

export default async function OilsPage(props: OilsPageProps) {
  const brands = await prisma.product.findMany({
    where: { category: "OILS" },
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });
  const brandList = brands.map((b) => b.brand);

  const visRows = await prisma.product.findMany({
    where: { category: "OILS", viscosity: { not: null } },
    select: { viscosity: true },
    distinct: ["viscosity"],
  });
  const viscosities = visRows
    .map((r) => r.viscosity!)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

  const pkgRows = await prisma.product.findMany({
    where: { category: "OILS", volumeValue: { not: null }, volumeUnit: { not: null } },
    select: { volumeValue: true, volumeUnit: true },
  });
  const seen = new Set<string>();
  for (const r of pkgRows) seen.add(`${r.volumeValue}${r.volumeUnit}`);
  const packageSizes = Array.from(seen).sort((a, b) => parseFloat(a) - parseFloat(b));

  const params = await props.searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Масла</h1>
      <Suspense fallback={<div className="bg-white rounded-xl shadow-md p-6 mb-8 h-20" />}>
        <ProductFilter
          mode="oils"
          brands={brandList}
          viscosities={viscosities}
          packageSizes={packageSizes}
        />
      </Suspense>
      <Suspense fallback={<div className="text-center py-16 text-gray-400">Зареждане...</div>}>
        <OilsListing searchParams={Promise.resolve(params)} />
      </Suspense>
    </div>
  );
}
