import type { ActivePromo } from "@/lib/promotion";
import { formatDateBg } from "@/lib/dates";

/**
 * Free-text promotion comment shown under the price (distinct serif/italic
 * font, per the spec) plus the "valid until" date when the promotion is bounded.
 */
export default function PromoNote({ promo }: { promo: ActivePromo }) {
  const until = formatDateBg(promo.endsOn);
  if (!promo.comment && !until) return null;
  return (
    <div className="mt-3 border-l-4 border-red-500 bg-red-50 rounded-r-lg px-4 py-3" data-testid="promo-note">
      {promo.comment && (
        <p className="font-serif italic text-base text-red-800 whitespace-pre-line">{promo.comment}</p>
      )}
      {until && (
        <p className="text-xs text-red-700 mt-1">Промоцията важи до {until}</p>
      )}
    </div>
  );
}
