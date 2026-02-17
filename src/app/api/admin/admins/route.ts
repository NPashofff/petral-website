import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Не сте влезли" }, { status: 401 });
    }

    const admins = await prisma.admin.findMany({
      select: { id: true, username: true, name: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(admins);
  } catch {
    return NextResponse.json({ error: "Грешка" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Не сте влезли" }, { status: 401 });
    }

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
  } catch {
    return NextResponse.json(
      { error: "Възникна грешка при създаване на админ" },
      { status: 500 }
    );
  }
}
