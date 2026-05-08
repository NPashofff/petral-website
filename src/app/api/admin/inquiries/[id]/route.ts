import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { logError } from "@/lib/logger";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Не сте влезли" }, { status: 401 });
    }

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
