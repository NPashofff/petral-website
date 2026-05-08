/**
 * Helpers for the `Product.images` column, which stores a JSON array of URL
 * strings. Reads must be safe against malformed data (corrupted DB row, hand
 * edit, partial restore). Writes go through `serializeImages` to enforce the
 * shape — no other path should construct the JSON string by hand.
 */

export function parseImages(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string" && x.length > 0);
  } catch {
    return [];
  }
}

export function serializeImages(images: string[]): string {
  const cleaned = images
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter((s) => s.length > 0);
  return JSON.stringify(cleaned);
}

export function normalizeImagesString(raw: string | null | undefined): string {
  return serializeImages(parseImages(raw));
}
