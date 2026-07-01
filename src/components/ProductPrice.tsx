"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/currency";

interface ColorDelta {
  colorId: number;
  /** Surcharge added to (or, if negative, subtracted from) the base price. */
  delta: number | null;
}

interface ProductPriceProps {
  basePrice: number | null;
  unit?: string | null;
  colorDeltas?: ColorDelta[];
}

/**
 * Показва цената на продукта и я обновява на живо при избор на цвят.
 * Слуша съществуващото събитие "petral:color-selected" (от ImageGallery и
 * InquiryForm). Крайната цена = основна цена + надценка на избрания цвят
 * (надценката може да е отрицателна). Без избран цвят се показва основната.
 */
export default function ProductPrice({ basePrice, unit = null, colorDeltas = [] }: ProductPriceProps) {
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
  const display = basePrice != null ? basePrice + delta : null;

  return (
    <div className="mt-4">
      <p className="text-3xl font-bold text-[var(--color-primary)]">
        {display != null ? formatPrice(display, { unit }) : "Цена при запитване"}
      </p>
      {display != null && (
        <span className="block text-sm text-gray-600 mt-1">Цените са без ДДС</span>
      )}
    </div>
  );
}
