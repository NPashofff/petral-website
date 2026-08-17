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

function fmt(value: number, fractionDigits = 2): string {
  return value.toLocaleString("bg-BG", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export type FormatPriceOptions = {
  unit?: string | null;
};

export function formatPrice(eur: number, opts: FormatPriceOptions = {}): string {
  const { unit } = opts;
  return `${fmt(eur)} €${unit ? `/${unit}` : ""}`;
}
