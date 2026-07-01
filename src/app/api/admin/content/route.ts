import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { defaultContent, getAllContent, SITE_CONTENT_TAG } from "@/lib/content";
import { logError } from "@/lib/logger";

export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const content = await getAllContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const csrf = requireSameOrigin(request);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const body: Record<string, unknown> = await request.json();

    const validKeys = Object.keys(defaultContent);
    const entries = Object.entries(body).filter(([key]) => validKeys.includes(key));

    // #35: every value must be a string before it touches the DB.
    for (const [key, value] of entries) {
      if (typeof value !== "string") {
        return NextResponse.json(
          { error: `Невалидна стойност за "${key}". Очаква се текст.` },
          { status: 400 }
        );
      }
    }

    // Phase 1: validate color_* values — must be a 6-digit hex like #aabbcc.
    const HEX = /^#[0-9A-Fa-f]{6}$/;
    for (const [key, value] of entries) {
      if (key.startsWith("color_") && !HEX.test(value as string)) {
        return NextResponse.json(
          { error: `Невалиден цвят за "${key}". Използвайте формат #aabbcc.` },
          { status: 400 }
        );
      }
    }

    // #35: upsert all entries atomically in a single transaction.
    await prisma.$transaction(
      entries.map(([key, value]) =>
        prisma.siteContent.upsert({
          where: { key },
          update: { value: value as string },
          create: { key, value: value as string },
        })
      )
    );

    // #27: invalidate the cached SiteContent read so every public page that
    // renders content (layout colors, hero, footer, contact, about, home)
    // picks up the new values on the next request.
    revalidateTag(SITE_CONTENT_TAG);

    return NextResponse.json({ success: true, updated: entries.length });
  } catch (e) {
    // #35: log server-side, return a generic message.
    await logError(e, { route: "admin/content", method: "PUT" });
    return NextResponse.json({ error: "Грешка при запазване." }, { status: 500 });
  }
}
