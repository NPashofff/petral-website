import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductForm from "@/components/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      colors: { select: { id: true } },
      colorImages: { select: { colorId: true, imageUrl: true } },
    },
  });

  if (!product) notFound();

  const initialData = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand,
    year: product.year,
    horsepower: product.horsepower || "",
    engine: product.engine || "",
    weight: product.weight || "",
    viscosity: product.viscosity || "",
    volumeValue: product.volumeValue ?? null,
    volumeUnit: (product.volumeUnit === "L" || product.volumeUnit === "kg" ? product.volumeUnit : "") as "L" | "kg" | "",
    images: product.images,
    address: product.address || "",
    lat: product.lat ?? null,
    lon: product.lon ?? null,
    featured: product.featured,
    hidden: product.hidden,
    colorIds: product.colors.map((c) => c.id),
    colorImageMap: Object.fromEntries(
      product.colorImages.map((row) => [row.colorId, row.imageUrl])
    ),
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Редактирай: {product.name}</h1>
      <ProductForm initialData={initialData} productId={product.id} />
    </>
  );
}
