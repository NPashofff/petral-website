import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Не сте влезли" }, { status: 401 });
    }

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
  } catch {
    return NextResponse.json(
      { error: "Възникна грешка при изтриване" },
      { status: 500 }
    );
  }
}
