import Link from "next/link";
import Image from "next/image";
import { categoryBadgeClass, categoryLabel } from "@/lib/categories";
import { resolveProductImage } from "@/lib/brand-logo";
import { formatPrice } from "@/lib/currency";
import { parseImages } from "@/lib/images";
import { effectivePrice, type ActivePromo } from "@/lib/promotion";
import PromoRibbon from "@/components/PromoRibbon";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number | null;
  category: string;
  brand: string;
  year: number | null;
  images: string;
  viscosity?: string | null;
  volumeValue?: number | null;
  volumeUnit?: string | null;
  promo?: ActivePromo | null;
}

export default function ProductCard({
  id,
  name,
  price,
  category,
  brand,
  year,
  images,
  viscosity,
  volumeValue,
  volumeUnit,
  promo = null,
}: ProductCardProps) {
  const imageList = parseImages(images);
  const firstImage = resolveProductImage(imageList, brand, category);
  const isOil = category === "OILS";

  const unit = isOil ? volumeUnit ?? null : null;
  const shownPrice = effectivePrice(price, promo);
  const hasPromoPrice = promo?.promoPrice != null;
  const priceLabel = shownPrice == null ? "-" : formatPrice(shownPrice, { unit });

  return (
    <Link href={`/catalog/${id}`} className="group block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {promo && <PromoRibbon text={promo.ribbonText} size="sm" />}
          <Image
            src={firstImage}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryBadgeClass(category)}`}>
              {categoryLabel(category)}
            </span>
            {isOil ? (
              <span className="text-xs text-gray-500">
                {viscosity || "Други"}
                {volumeValue != null && volumeUnit ? ` • ${volumeValue}${volumeUnit}` : ""}
              </span>
            ) : (
              year != null && <span className="text-xs text-gray-500">{year}</span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[var(--color-primary)] transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{brand}</p>
          {hasPromoPrice && price != null && (
            <p className="text-sm text-gray-400 line-through mt-2" data-testid="old-price">
              {formatPrice(price, { unit })}
            </p>
          )}
          <p className={`text-xl font-bold ${hasPromoPrice ? "text-red-600" : "text-[var(--color-primary)]"} ${hasPromoPrice ? "" : "mt-2"}`}>
            {priceLabel}
            {shownPrice != null && (
              <span className="block text-xs font-normal text-gray-500">без ДДС</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
