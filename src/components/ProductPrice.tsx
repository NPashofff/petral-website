"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/currency";

interface ColorPrice {
  colorId: number;
  price: number | null;
}

interface ProductPriceProps {
  basePrice: number | null;
  unit?: string | null;
  colorPrices?: ColorPrice[];
}

/**
 * Показва цената на продукта и я обновява на живо при избор на цвят.
 * Слуша съществуващото събитие "petral:color-selected", което се излъчва
 * от ImageGallery и InquiryForm. Цена на избрания цвят има предимство пред
 * базовата; ако избраният цвят няма собствена цена, се показва базовата.
 */
export default function ProductPrice({ basePrice, unit = null, colorPrices = [] }: ProductPriceProps) {
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

  const colorPrice =
    selectedColorId != null
      ? colorPrices.find((c) => c.colorId === selectedColorId)?.price ?? null
      : null;
  const display = colorPrice ?? basePrice;

  return (
    <div className="mt-4">
      <p className="text-3xl font-bold text-[var(--color-primary)]">
        {display != null ? formatPrice(display, { unit }) : "Цена при запитване"}
      </p>
      {display != null && (
        <span className="block text-sm font-normal text-gray-500 mt-0.5">без ДДС</span>
      )}
    </div>
  );
}
