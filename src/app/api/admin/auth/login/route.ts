import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Потребителското име и паролата са задължителни" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json(
        { error: "Невалидно потребителско име или парола" },
        { status: 401 }
      );
    }

    await createSession({ adminId: admin.id, username: admin.username });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Възникна грешка при вход" },
      { status: 500 }
    );
  }
}
