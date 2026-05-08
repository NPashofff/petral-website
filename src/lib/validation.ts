import { NextResponse } from "next/server";
import { z } from "zod";

const trimmedString = (max: number) =>
  z.string().trim().min(1).max(max);

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
