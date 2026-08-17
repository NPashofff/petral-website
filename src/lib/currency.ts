// Bulgaria adopted the euro on 2026-01-01; the fixed BNB rate is 1 EUR = 1.95583 BGN.
// Kept for importing supplier price lists that are still quoted in BGN — the site
// itself displays euro only.
export const BGN_PER_EUR = 1.95583;

export function bgnToEur(bgn: number): number {
  return Math.round((bgn / BGN_PER_EUR) * 100) / 100;
}

// Standard Bulgarian VAT rate. Product prices are stored VAT-inclusive.
export const VAT_RATE = 0.2;

export function netFromGross(gross: number): number {
  return Math.round((gross / (1 + VAT_RATE)) * 100) / 100;
}

// Round trips through cents first, so values like 7.2 * 20 = 144.00000000000003
// are treated as whole. Whole amounts drop the ",00" tail entirely.
function fmt(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  const hasCents = !Number.isInteger(rounded);
  return rounded.toLocaleString("bg-BG", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

export type FormatPriceOptions = {
  unit?: string | null;
};

export function formatPrice(eur: number, opts: FormatPriceOptions = {}): string {
  const { unit } = opts;
  return `${fmt(eur)} €${unit ? `/${unit}` : ""}`;
}
