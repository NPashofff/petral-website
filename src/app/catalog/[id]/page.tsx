import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import ImageGallery from "@/components/ImageGallery";
import InquiryForm from "@/components/InquiryForm";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
  if (!product) return { title: "Продуктът не е намерен" };

  return {
    title: `${product.name} - PetralGroup`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) notFound();

  const images: string[] = JSON.parse(product.images);

  const specs = [
    { label: "Марка", value: product.brand },
    { label: "Година", value: product.year.toString() },
    { label: "Категория", value: product.category === "TRACTOR" ? "Трактор" : "АТВ" },
    ...(product.horsepower ? [{ label: "Мощност", value: product.horsepower }] : []),
    ...(product.engine ? [{ label: "Двигател", value: product.engine }] : []),
    ...(product.weight ? [{ label: "Тегло", value: product.weight }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">Начало</Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="hover:text-gray-700">Каталог</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Gallery */}
        <ImageGallery images={images} alt={product.name} />

        {/* Right: Info */}
        <div>
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full ${
              product.category === "TRACTOR"
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            {product.category === "TRACTOR" ? "Трактор" : "АТВ"}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mt-4">{product.name}</h1>
          <p className="text-3xl font-bold text-[var(--color-primary)] mt-4">
            {product.price.toLocaleString("bg-BG")} лв.
          </p>

          <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

          {/* Specs table */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Характеристики</h2>
            <div className="border rounded-lg overflow-hidden">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <span className="w-1/3 px-4 py-3 text-sm font-medium text-gray-500">
                    {spec.label}
                  </span>
                  <span className="w-2/3 px-4 py-3 text-sm text-gray-900">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry form */}
          <div className="mt-8">
            <InquiryForm productId={product.id} productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
