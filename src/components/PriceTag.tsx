import { formatPrice, netFromGross } from "@/lib/currency";

type Size = "sm" | "md" | "lg";

// Prices are stored VAT-inclusive, but the headline figure is the net price.
const SIZES: Record<Size, { label: string; net: string; note: string; gross: string }> = {
  sm: {
    label: "text-[10px] uppercase tracking-wide text-gray-400",
    net: "text-sm font-medium text-gray-900",
    note: "text-[10px] text-gray-400",
    gross: "text-xs text-gray-500",
  },
  md: {
    label: "text-[11px] uppercase tracking-wide text-gray-400",
    net: "text-xl font-bold text-[var(--color-primary)]",
    note: "text-[11px] font-normal text-gray-400",
    gross: "text-xs text-gray-500",
  },
  lg: {
    label: "text-xs uppercase tracking-wide text-gray-500",
    net: "text-3xl font-bold text-[var(--color-primary)]",
    note: "text-xs font-normal text-gray-400",
    gross: "text-sm text-gray-500",
  },
};

interface PriceTagProps {
  /** Price as stored in the database — euro, VAT included. */
  gross: number;
  /** Caption rendered above the price, e.g. "Цена". Omit for table cells that already have a header. */
  label?: string;
  unit?: string | null;
  size?: Size;
  align?: "left" | "right";
  className?: string;
}

export default function PriceTag({
  gross,
  label,
  unit,
  size = "md",
  align = "left",
  className,
}: PriceTagProps) {
  const s = SIZES[size];
  const net = netFromGross(gross);

  return (
    <span
      className={`block whitespace-nowrap ${align === "right" ? "text-right" : ""} ${className ?? ""}`}
    >
      {label && <span className={`block ${s.label}`}>{label}</span>}
      <span className={`block ${s.net}`}>
        {formatPrice(net, { unit })} <span className={s.note}>без вкл. ДДС</span>
      </span>
      <span className={`block ${s.gross}`}>{formatPrice(gross, { unit })} с вкл. ДДС</span>
    </span>
  );
}
