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
    const contactId = Number(id);
    if (!Number.isFinite(contactId)) {
      return NextResponse.json({ error: "Невалиден ID." }, { status: 400 });
    }

    await prisma.contact.delete({ where: { id: contactId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    await logError(err, { route: "/api/admin/contacts/[id]" });
    return NextResponse.json(
      { error: "Грешка при изтриване на съобщение." },
      { status: 500 }
    );
  }
}
