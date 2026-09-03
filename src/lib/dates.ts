/**
 * Calendar-day helpers anchored to the site's timezone (Europe/Sofia).
 * Pure functions, safe in the browser and on the server. All promotion
 * validity dates are "calendar days in Sofia", regardless of the server TZ.
 */

export const SITE_TIME_ZONE = "Europe/Sofia";

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const dateFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: SITE_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const offsetFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: SITE_TIME_ZONE,
  timeZoneName: "longOffset",
});

/** UTC offset of Europe/Sofia at the given instant, in milliseconds. */
function sofiaOffsetMs(at: Date): number {
  const part = offsetFmt.formatToParts(at).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(part);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  return sign * (Number(m[2]) * 60 + Number(m[3] ?? 0)) * 60_000;
}

/** "YYYY-MM-DD" of the given instant as seen in Sofia. */
export function sofiaDateString(at: Date): string {
  return dateFmt.format(at);
}

/**
 * The instant at which the given Sofia calendar day ("YYYY-MM-DD") starts.
 * Returns null for a malformed or invalid date string.
 */
export function sofiaMidnightUtc(isoDate: string): Date | null {
  if (!ISO_DATE_RE.test(isoDate)) return null;
  const [y, m, d] = isoDate.split("-").map(Number);
  const guess = Date.UTC(y, m - 1, d);
  if (Number.isNaN(guess)) return null;
  // Sofia switches DST at 03:00/04:00 local, so the offset at the UTC-midnight
  // guess is the offset in force at local midnight of the same day.
  const instant = new Date(guess - sofiaOffsetMs(new Date(guess)));
  // Reject overflowed dates such as 2026-02-31 (Date.UTC silently rolls over).
  return sofiaDateString(instant) === isoDate ? instant : null;
}

/** Start of "today" in Sofia, as a UTC instant. */
export function sofiaStartOfDay(at: Date = new Date()): Date {
  return sofiaMidnightUtc(sofiaDateString(at)) ?? at;
}

/** "DD.MM.YYYY" for a "YYYY-MM-DD" string (display only). */
export function formatDateBg(iso: string | null): string | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y}`;
}
