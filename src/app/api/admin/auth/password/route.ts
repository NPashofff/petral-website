import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireSession, createSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";

export async function PUT(request: NextRequest) {
  const csrf = requireSameOrigin(request);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Всички полета са задължителни" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Новата парола трябва да е поне 6 символа" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { id: session.adminId },
    });

    if (!admin || !(await bcrypt.compare(currentPassword, admin.password))) {
      return NextResponse.json(
        { error: "Текущата парола е грешна" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // #5: bump sessionVersion so every previously-issued token for this admin
    // is invalidated (getSession rejects them). Then mint a fresh cookie with
    // the new version so the current admin stays logged in.
    const updated = await prisma.admin.update({
      where: { id: session.adminId },
      data: {
        password: hashedPassword,
        sessionVersion: { increment: 1 },
      },
      select: { sessionVersion: true },
    });

    await createSession(
      { adminId: session.adminId, username: session.username },
      updated.sessionVersion
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    await logError(err, { route: "/api/admin/auth/password" });
    return NextResponse.json(
      { error: "Възникна грешка при смяна на паролата" },
      { status: 500 }
    );
  }
}
