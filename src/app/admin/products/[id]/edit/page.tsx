import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductForm from "@/components/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

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
    images: product.images,
    featured: product.featured,
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Редактирай: {product.name}</h1>
      <ProductForm initialData={initialData} productId={product.id} />
    </>
  );
}
