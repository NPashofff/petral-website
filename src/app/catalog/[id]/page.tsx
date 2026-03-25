import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import ImageGallery from "@/components/ImageGallery";
import InquiryForm from "@/components/InquiryForm";
import ProductMapLoader from "@/components/ProductMapLoader";
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
    description: product.description.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) notFound();

  const images: string[] = JSON.parse(product.images);

  const categoryLabels: Record<string, string> = {
    TRACTOR: "Трактор",
    ATV: "АТВ",
    UTV: "UTV",
    EQUIPMENT: "Прикачен инвентар",
  };
  const categoryColors: Record<string, string> = {
    TRACTOR: "bg-green-100 text-green-800",
    ATV: "bg-orange-100 text-orange-800",
    UTV: "bg-purple-100 text-purple-800",
    EQUIPMENT: "bg-yellow-100 text-yellow-800",
  };

  const specs = [
    { label: "Марка", value: product.brand },
    { label: "Година", value: product.year.toString() },
    { label: "Категория", value: categoryLabels[product.category] || product.category },
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

      {/* Top section: Gallery + Key info side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Gallery */}
        <ImageGallery images={images} alt={product.name} />

        {/* Right: Key info */}
        <div>
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full ${
              categoryColors[product.category] || "bg-gray-100 text-gray-800"
            }`}
          >
            {categoryLabels[product.category] || product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mt-4">{product.name}</h1>
          <p className="text-3xl font-bold text-[var(--color-primary)] mt-4">
            {product.price != null ? `${product.price.toLocaleString("bg-BG")} лв.` : "При запитване"}
          </p>

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

      {/* Full-width description below */}
      <div className="mt-12 overflow-hidden">
        <div
          className="product-description text-gray-700 leading-relaxed max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_table]:text-sm [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-2 [&_th]:border [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-2 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-left [&_a]:text-green-700 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>

      {/* Map */}
      {product.address && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Местоположение</h2>
          <p className="text-sm text-gray-500 mb-2">{product.address}</p>
          <ProductMapLoader address={product.address} lat={product.lat} lon={product.lon} />
        </div>
      )}
    </div>
  );
}
