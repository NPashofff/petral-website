import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";

export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, username: true, name: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(admins);
  } catch (err) {
    await logError(err, { route: "/api/admin/admins" });
    return NextResponse.json({ error: "Грешка" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const csrf = requireSameOrigin(request);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const { username, password, name } = await request.json();

    if (!username || !password || !name) {
      return NextResponse.json(
        { error: "Всички полета са задължителни" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Паролата трябва да е поне 6 символа" },
        { status: 400 }
      );
    }

    const existing = await prisma.admin.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json(
        { error: "Потребителското име вече съществува" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: { username, password: hashedPassword, name },
    });

    return NextResponse.json({ id: admin.id }, { status: 201 });
  } catch (err) {
    await logError(err, { route: "/api/admin/admins" });
    return NextResponse.json(
      { error: "Възникна грешка при създаване на админ" },
      { status: 500 }
    );
  }
}
