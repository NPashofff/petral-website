/**
 * Diagonal red corner ribbon rendered over a product image. The parent must be
 * `position: relative` with `overflow: hidden`. Long labels shrink the font a
 * little and are finally truncated with an ellipsis.
 */
interface PromoRibbonProps {
  text: string;
  size?: "sm" | "md";
}

export default function PromoRibbon({ text, size = "md" }: PromoRibbonProps) {
  const long = text.length > 12;
  const box = size === "sm" ? "w-36 h-36" : "w-48 h-48";
  const band =
    size === "sm"
      ? `top-[26px] -left-[44px] w-[210px] py-1 ${long ? "text-[10px]" : "text-[11px]"}`
      : `top-[34px] -left-[58px] w-[280px] py-1.5 ${long ? "text-xs" : "text-sm"}`;
  return (
    <div
      data-testid="promo-ribbon"
      aria-label={`Промоция: ${text}`}
      className={`pointer-events-none absolute top-0 left-0 z-10 overflow-hidden ${box}`}
    >
      <div
        className={`absolute -rotate-45 bg-red-600 text-white font-bold uppercase tracking-wide text-center shadow-md truncate px-10 ${band}`}
      >
        {text}
      </div>
    </div>
  );
}
