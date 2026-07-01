import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrf = requireSameOrigin(request);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const { id } = await params;
    const adminId = parseInt(id);

    if (adminId === session.adminId) {
      return NextResponse.json(
        { error: "Не можете да изтриете собствения си акаунт" },
        { status: 400 }
      );
    }

    const count = await prisma.admin.count();
    if (count <= 1) {
      return NextResponse.json(
        { error: "Трябва да има поне един админ" },
        { status: 400 }
      );
    }

    await prisma.admin.delete({ where: { id: adminId } });

    return NextResponse.json({ success: true });
  } catch (err) {
    await logError(err, { route: "/api/admin/admins/[id]" });
    return NextResponse.json(
      { error: "Възникна грешка при изтриване" },
      { status: 500 }
    );
  }
}
