import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const { id } = await context.params;
    const inquiryId = Number(id);
    if (!Number.isFinite(inquiryId)) {
      return NextResponse.json({ error: "Невалиден ID." }, { status: 400 });
    }

    await prisma.inquiry.delete({ where: { id: inquiryId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    await logError(err, { route: "/api/admin/inquiries/[id]" });
    return NextResponse.json(
      { error: "Грешка при изтриване на запитване." },
      { status: 500 }
    );
  }
}
