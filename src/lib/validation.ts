import { NextResponse } from "next/server";
import { z } from "zod";
import { CATEGORY_KEYS } from "@/lib/categories";
import { sanitizeProductHtml } from "@/lib/sanitize";
import { normalizeImagesString } from "@/lib/images";
import { sofiaMidnightUtc } from "@/lib/dates";

const trimmedString = (max: number) =>
  z.string().trim().min(1).max(max);

/** Подредба в каталога: цяло число, ограничено в 0–99. Невалидни стойности → 0. */
export function clampSortOrder(value: unknown): number {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return 0;
  return Math.min(99, Math.max(0, n));
}

export const imagesJsonSchema = z
  .string()
  .max(50_000)
  .superRefine((value, ctx) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "Невалиден JSON формат за снимки.",
      });
      return;
    }
    if (!Array.isArray(parsed)) {
      ctx.addIssue({
        code: "custom",
        message: "Снимките трябва да са JSON масив от низове.",
      });
      return;
    }
    for (const item of parsed) {
      if (typeof item !== "string") {
        ctx.addIssue({
          code: "custom",
          message: "Всеки елемент в масива трябва да е низ.",
        });
        return;
      }
    }
  });

/**
 * Optional free-text field (horsepower, engine, weight, viscosity, address):
 * accepts a string or null/undefined (key may be absent); trims; empty → "" so
 * callers can fall back to null. Mirrors the routes' previous `value || null`.
 */
const optionalText = (max: number) =>
  z
    .union([z.string(), z.null()])
    .optional()
    .transform((v) => (typeof v === "string" ? v.trim() : ""))
    .pipe(z.string().max(max));

/**
 * Number-or-empty coercion. Accepts a real number, a numeric string, or
 * null/""/undefined / absent key (→ null). Rejects non-numeric strings. Mirrors
 * the routes' `value != null && value !== "" ? parseFloat(value) : null` but
 * with validation so garbage like "abc" is a 400 instead of a NaN write.
 */
const nullableNumber = z
  .union([z.number(), z.string(), z.null()])
  .optional()
  .transform((v, ctx) => {
    if (v == null || v === "") return null;
    const n = typeof v === "number" ? v : Number(v);
    if (!Number.isFinite(n)) {
      ctx.addIssue({ code: "custom", message: "Очаква се число." });
      return z.NEVER;
    }
    return n;
  });

// Slug: lowercase a-z, 0-9, hyphens — exactly the shape generateSlug() and the
// seed produce. Non-empty (the current routes already reject empty slug).
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const productSchema = z.object({
  name: trimmedString(200),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(SLUG_RE, "Slug може да съдържа само малки латински букви, цифри и тирета."),
  description: z
    .union([z.string(), z.null()])
    .optional()
    .transform((v) => (typeof v === "string" ? v : ""))
    .pipe(z.string().max(200_000)),
  price: nullableNumber,
  category: z.enum(CATEGORY_KEYS as [string, ...string[]]),
  brand: trimmedString(200),
  year: nullableNumber,
  horsepower: optionalText(100),
  engine: optionalText(200),
  weight: optionalText(100),
  viscosity: optionalText(100),
  volumeValue: nullableNumber,
  volumeUnit: z
    .union([z.literal("L"), z.literal("kg"), z.literal(""), z.null()])
    .optional()
    .transform((v) => (v === "L" || v === "kg" ? v : "")),
  images: z
    .union([z.string(), z.null()])
    .optional()
    .transform((v) => (typeof v === "string" ? v : "[]"))
    .pipe(imagesJsonSchema),
  address: optionalText(500),
  lat: nullableNumber,
  lon: nullableNumber,
  featured: z.unknown().optional().transform((v) => !!v),
  hidden: z.unknown().optional().transform((v) => !!v),
  sortOrder: z
    .union([z.number(), z.string(), z.null()])
    .optional()
    .transform((v) => clampSortOrder(v)),
  colorIds: z
    .union([z.array(z.unknown()), z.null()])
    .optional()
    .transform((v) =>
      Array.isArray(v)
        ? v.map((x) => Number(x)).filter((x) => Number.isFinite(x))
        : []
    ),
  colorImageMap: z
    .union([z.record(z.string(), z.unknown()), z.null()])
    .optional()
    .transform((v) => (v && typeof v === "object" ? (v as Record<string, unknown>) : {})),
  colorPriceMap: z
    .union([z.record(z.string(), z.unknown()), z.null()])
    .optional()
    .transform((v) => (v && typeof v === "object" ? (v as Record<string, unknown>) : {})),
});

export type ProductInput = z.infer<typeof productSchema>;

/**
 * Builds the Prisma `data` object shared by product create + update. Caller
 * appends the connect-vs-set color relation. `description` is sanitized here so
 * the Phase 1 stored-XSS protection lives in exactly one place.
 */
export function buildProductData(input: ProductInput) {
  return {
    name: input.name,
    slug: input.slug,
    description: sanitizeProductHtml(input.description),
    price: input.price,
    category: input.category,
    brand: input.brand,
    year: input.year != null ? Math.trunc(input.year) : null,
    horsepower: input.horsepower || null,
    engine: input.engine || null,
    weight: input.weight || null,
    viscosity: input.viscosity || null,
    volumeValue: input.volumeValue,
    volumeUnit: input.volumeUnit || null,
    images: normalizeImagesString(input.images),
    address: input.address || null,
    lat: input.lat,
    lon: input.lon,
    featured: input.featured,
    hidden: input.hidden,
    sortOrder: input.sortOrder,
  };
}

/**
 * Builds the ProductColorImage rows for a product. A row is kept only when it
 * carries a non-empty image URL OR an explicit per-color price (the existing
 * filter — preserves the sortOrder/per-color-price features).
 */
export function buildColorRows(productId: number, input: ProductInput) {
  return input.colorIds
    .map((colorId) => {
      // JSON object keys are strings; the form's numeric keys arrive stringified.
      const rawImage = input.colorImageMap[String(colorId)];
      const imageUrl = typeof rawImage === "string" ? rawImage.trim() : "";
      const rawPrice = input.colorPriceMap[String(colorId)];
      const colorPrice =
        rawPrice != null && rawPrice !== "" && Number.isFinite(Number(rawPrice))
          ? Number(rawPrice)
          : null;
      return { productId, colorId, imageUrl, price: colorPrice };
    })
    .filter((row) => row.imageUrl.length > 0 || row.price != null);
}

/** Optional "YYYY-MM-DD" (Sofia calendar day) → instant of local midnight, or null. */
const optionalIsoDate = z
  .union([z.string(), z.null()])
  .optional()
  .transform((v, ctx) => {
    const s = typeof v === "string" ? v.trim() : "";
    if (!s) return null;
    const d = sofiaMidnightUtc(s);
    if (!d) {
      ctx.addIssue({ code: "custom", message: "Очаква се валидна дата във формат ГГГГ-ММ-ДД." });
      return z.NEVER;
    }
    return d;
  });

export const promotionSchema = z
  .object({
    title: trimmedString(200),
    type: z.enum(["PRICE", "PERCENT", "OTHER"]),
    promoPriceGross: nullableNumber,
    percent: nullableNumber,
    ribbonText: z
      .union([z.string(), z.null()])
      .optional()
      .transform((v) => (typeof v === "string" ? v.trim() : ""))
      .pipe(z.string().max(40))
      .transform((v) => v || "ПРОМОЦИЯ"),
    comment: optionalText(1000),
    startsAt: optionalIsoDate,
    endsAt: optionalIsoDate,
    active: z.unknown().optional().transform((v) => v === undefined ? true : !!v),
    productIds: z
      .union([z.array(z.unknown()), z.null()])
      .optional()
      .transform((v) =>
        Array.isArray(v)
          ? Array.from(new Set(v.map((x) => Number(x)).filter((x) => Number.isInteger(x) && x > 0)))
          : []
      ),
  })
  .superRefine((val, ctx) => {
    if (val.type === "PRICE") {
      if (val.promoPriceGross == null || val.promoPriceGross <= 0) {
        ctx.addIssue({ code: "custom", path: ["promoPriceGross"], message: "Въведете промо цена с ДДС (> 0)." });
      }
    } else if (val.type === "PERCENT" && (val.percent == null || val.percent <= 0 || val.percent > 100)) {
      ctx.addIssue({ code: "custom", path: ["percent"], message: "Процентът трябва да е между 0 и 100." });
    }
    // OTHER: no price fields required.
    if (val.startsAt && val.endsAt && val.endsAt < val.startsAt) {
      ctx.addIssue({ code: "custom", path: ["endsAt"], message: "Крайната дата е преди началната." });
    }
  });

export type PromotionInput = z.infer<typeof promotionSchema>;

/** Prisma `data` for Promotion create/update (products are linked separately). */
export function buildPromotionData(input: PromotionInput) {
  return {
    title: input.title,
    type: input.type,
    promoPriceGross: input.type === "PRICE" ? input.promoPriceGross : null,
    percent: input.type === "PERCENT" ? input.percent : null,
    ribbonText: input.ribbonText,
    comment: input.comment || null,
    startsAt: input.startsAt,
    endsAt: input.endsAt,
    active: input.active,
  };
}

export const inquirySchema = z.object({
  productId: z.coerce.number().int().positive(),
  name: trimmedString(200),
  email: z.string().trim().toLowerCase().email().max(200),
  phone: z.string().trim().max(50).optional().nullable(),
  message: trimmedString(5000),
  selectedColorName: z.string().trim().max(100).optional().nullable(),
  selectedColorHex: z
    .string()
    .trim()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional()
    .nullable(),
});

export const contactSchema = z.object({
  name: trimmedString(200),
  email: z.string().trim().toLowerCase().email().max(200),
  phone: z.string().trim().max(50).optional().nullable(),
  message: trimmedString(5000),
});

export async function parseBody<T extends z.ZodType>(
  request: Request,
  schema: T
): Promise<{ data: z.infer<T> } | { error: NextResponse }> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return {
      error: NextResponse.json(
        { error: "Невалиден JSON формат." },
        { status: 400 }
      ),
    };
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    const first = result.error.issues[0];
    const field = first.path.join(".") || "input";
    return {
      error: NextResponse.json(
        { error: `Невалиден вход (${field}): ${first.message}` },
        { status: 400 }
      ),
    };
  }

  return { data: result.data };
}
