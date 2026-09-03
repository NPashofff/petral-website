"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/currency";
import type { ActivePromo } from "@/lib/promotion";
import PromoNote from "@/components/PromoNote";

interface ColorDelta {
  colorId: number;
  /** Surcharge added to (or, if negative, subtracted from) the base price. */
  delta: number | null;
}

interface ProductPriceProps {
  basePrice: number | null;
  unit?: string | null;
  colorDeltas?: ColorDelta[];
  promo?: ActivePromo | null;
  /** Extra lines under the price (e.g. the oil package total). */
  children?: React.ReactNode;
}

/**
 * Показва цената на продукта и я обновява на живо при избор на цвят.
 * Слуша съществуващото събитие "petral:color-selected" (от ImageGallery и
 * InquiryForm). Крайната цена = основна цена + надценка на избрания цвят
 * (надценката може да е отрицателна). Без избран цвят се показва основната.
 *
 * При активна промоция основната цена е промо цената (надценката за цвят се
 * добавя върху нея), а старата цена се показва зачертана.
 */
export default function ProductPrice({ basePrice, unit = null, colorDeltas = [], promo = null, children }: ProductPriceProps) {
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

  useEffect(() => {
    const handleColorSelected = (event: Event) => {
      const colorId = (event as CustomEvent<{ colorId: number | null }>).detail?.colorId;
      if (typeof colorId === "number") {
        setSelectedColorId(colorId);
      } else if (colorId === null) {
        // Selected image (or interaction) maps to no color: fall back to base price.
        setSelectedColorId(null);
      }
    };

    window.addEventListener("petral:color-selected", handleColorSelected);
    return () => window.removeEventListener("petral:color-selected", handleColorSelected);
  }, []);

  const delta =
    selectedColorId != null
      ? colorDeltas.find((c) => c.colorId === selectedColorId)?.delta ?? 0
      : 0;

  const hasPromoPrice = promo != null && promo.promoPrice != null;
  const current = hasPromoPrice ? promo.promoPrice! : basePrice;
  const display = current != null ? current + delta : null;
  const oldDisplay = hasPromoPrice && basePrice != null ? basePrice + delta : null;

  return (
    <div className="mt-4">
      {oldDisplay != null && (
        <p className="text-lg text-gray-400 line-through" data-testid="old-price">
          {formatPrice(oldDisplay, { unit })}
        </p>
      )}
      <p
        className={`text-3xl font-bold ${hasPromoPrice ? "text-red-600" : "text-[var(--color-primary)]"}`}
        data-testid="current-price"
      >
        {display != null ? formatPrice(display, { unit }) : "Цена при запитване"}
      </p>
      {display != null && (
        <span className="block text-sm text-gray-600 mt-1">Цените са без ДДС</span>
      )}
      {children}
      {promo && <PromoNote promo={promo} />}
    </div>
  );
}
