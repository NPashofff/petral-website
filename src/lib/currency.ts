// Bulgaria adopted the euro on 2026-01-01; the fixed BNB rate is 1 EUR = 1.95583 BGN.
export const BGN_PER_EUR = 1.95583;

export function bgnToEur(bgn: number): number {
  return Math.round((bgn / BGN_PER_EUR) * 100) / 100;
}

export function eurToBgn(eur: number): number {
  return Math.round(eur * BGN_PER_EUR * 100) / 100;
}

function fmt(value: number, fractionDigits = 2): string {
  return value.toLocaleString("bg-BG", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export type FormatPriceOptions = {
  unit?: string | null;
  showBgn?: boolean;
};

export function formatPrice(eur: number, opts: FormatPriceOptions = {}): string {
  const { unit, showBgn = true } = opts;
  const eurStr = `${fmt(eur)} €${unit ? `/${unit}` : ""}`;
  if (!showBgn) return eurStr;
  const bgn = eurToBgn(eur);
  return `${eurStr} (${fmt(bgn)} лв${unit ? `/${unit}` : ""})`;
}
