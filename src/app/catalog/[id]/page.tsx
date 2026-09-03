import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import ImageGallery from "@/components/ImageGallery";
import InquiryForm from "@/components/InquiryForm";
import ProductPrice from "@/components/ProductPrice";
import ProductMapLoader from "@/components/ProductMapLoader";
import type { Metadata } from "next";
import { categoryBadgeClass, categoryLabel } from "@/lib/categories";
import { getBrandLogoUrl } from "@/lib/brand-logo";
import { formatPrice } from "@/lib/currency";
import { absoluteUrl } from "@/lib/site";
import { parseImages } from "@/lib/images";
import { sanitizeProductHtml } from "@/lib/sanitize";
import { getActivePromo, effectivePrice } from "@/lib/promotion";

// Promotions start/expire by date: re-render the cached detail page at most
// once an hour so those transitions show up without an admin edit.
export const revalidate = 3600;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

function plainText(html: string, max = 160): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * Escape a JSON string for safe embedding inside an inline <script> element so
 * a value such as `</script><script>...` cannot break out of the tag.
 */
function jsonLdSafe(value: unknown): string {
  return JSON.stringify(value)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
  if (!product || product.hidden) return { title: "Продуктът не е намерен" };

  const description = plainText(product.description);
  const images = parseImages(product.images);
  const ogImage = images[0] ?? getBrandLogoUrl(product.brand) ?? "/images/placeholder.jpg";
  const url = absoluteUrl(`/catalog/${product.id}`);

  return {
    title: `${product.name} - Петрал Груп`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: product.name,
      description,
      siteName: "Петрал Груп",
      locale: "bg_BG",
      images: [{ url: absoluteUrl(ogImage), alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      colors: {
        orderBy: [{ order: "asc" }, { name: "asc" }],
        select: { id: true, name: true, hex: true },
      },
      colorImages: {
        include: {
          color: { select: { id: true, name: true, hex: true, order: true } },
        },
        orderBy: [{ color: { order: "asc" } }, { color: { name: "asc" } }],
      },
      promotion: true,
    },
  });

  if (!product || product.hidden) notFound();

  const promo = getActivePromo(product);
  // Base price used for surcharge maths and the "Основна цена" hints: the
  // discounted price while a promotion is active, else the list price.
  const basePrice = effectivePrice(product.price, promo);

  const rawImages = parseImages(product.images);
  const images: string[] = rawImages.length > 0
    ? rawImages
    : product.category === "OILS"
      ? [getBrandLogoUrl(product.brand) ?? "/images/placeholder.jpg"]
      : [];

  const productUrl = absoluteUrl(`/catalog/${product.id}`);
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: plainText(product.description, 5000),
    image: images.map((src) => absoluteUrl(src)),
    sku: String(product.id),
    brand: { "@type": "Brand", name: product.brand },
    url: productUrl,
    ...(basePrice != null
      ? {
          offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "EUR",
            price: basePrice.toFixed(2),
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  const isOil = product.category === "OILS";
  // Per-colour `price` column now stores a signed surcharge (delta) added to the
  // base product price rather than an absolute price.
  const colorDeltaById = new Map(product.colorImages.map((ci) => [ci.colorId, ci.price ?? null]));
  const colorImages = product.colorImages
    .filter((item) => images.includes(item.imageUrl))
    .map((item) => ({
      colorId: item.colorId,
      name: item.color.name,
      hex: item.color.hex,
      imageUrl: item.imageUrl,
      priceDelta: item.price ?? null,
    }));
  const inquiryColors = product.colors.map((color) => ({
    ...color,
    imageUrl: colorImages.find((item) => item.colorId === color.id)?.imageUrl ?? null,
    priceDelta: colorDeltaById.get(color.id) ?? null,
  }));
  const colorDeltas = product.colors.map((color) => ({
    colorId: color.id,
    delta: colorDeltaById.get(color.id) ?? null,
  }));
  const totalPrice =
    isOil && basePrice != null && product.volumeValue != null
      ? basePrice * product.volumeValue
      : null;

  const specs = isOil
    ? [
        { label: "Марка", value: product.brand },
        { label: "Категория", value: categoryLabel(product.category) },
        { label: "Вискозитет", value: product.viscosity || "Други" },
        ...(product.volumeValue != null && product.volumeUnit
          ? [{ label: "Опаковка", value: `${product.volumeValue} ${product.volumeUnit}` }]
          : []),
      ]
    : [
        { label: "Марка", value: product.brand },
        ...(product.year != null ? [{ label: "Година", value: product.year.toString() }] : []),
        { label: "Категория", value: categoryLabel(product.category) },
        ...(product.horsepower ? [{ label: "Мощност", value: product.horsepower }] : []),
        ...(product.engine ? [{ label: "Двигател", value: product.engine }] : []),
        ...(product.weight ? [{ label: "Тегло", value: product.weight }] : []),
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdSafe(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">Начало</Link>
        <span className="mx-2">/</span>
        <Link href={isOil ? "/oils" : "/catalog"} className="hover:text-gray-700">
          {isOil ? "Масла" : "Каталог"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Top section: Gallery + Key info side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Gallery */}
        <ImageGallery
          images={images}
          alt={product.name}
          colorImages={colorImages}
          basePrice={basePrice}
          promoRibbon={promo?.ribbonText ?? null}
        />

        {/* Right: Key info */}
        <div>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryBadgeClass(product.category)}`}>
            {categoryLabel(product.category)}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mt-4">{product.name}</h1>
          {isOil ? (
            <ProductPrice basePrice={product.price} unit={product.volumeUnit ?? null} promo={promo}>
              {totalPrice != null && (
                <p className="text-sm text-gray-600 mt-1">
                  Обща цена за опаковка ({product.volumeValue}{product.volumeUnit}):{" "}
                  <strong>{formatPrice(totalPrice)}</strong> без ДДС
                </p>
              )}
            </ProductPrice>
          ) : (
            <ProductPrice basePrice={product.price} colorDeltas={colorDeltas} promo={promo} />
          )}

          <p className="text-sm text-gray-600 mt-2">
            Цената може да варира според избора на цвят и допълнителни опции
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

        </div>
      </div>

      {/* Full-width description below */}
      <div className="mt-12 overflow-hidden">
        <div
          className="product-description text-gray-700 leading-relaxed max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_table]:text-sm [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-2 [&_th]:border [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-2 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-left [&_a]:text-green-700 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: sanitizeProductHtml(product.description) }}
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

      {/* Inquiry form - at the bottom */}
      <div className="mt-12">
        <InquiryForm productId={product.id} productName={product.name} colors={inquiryColors} basePrice={basePrice} />
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">Снимките са илюстративни !</p>
    </div>
  );
}
