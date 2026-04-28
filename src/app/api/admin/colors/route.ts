import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return !!session?.value;
}

export async function GET() {
  const colors = await prisma.color.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(colors);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, hex, order } = await req.json();

    if (!name || !hex) {
      return NextResponse.json(
        { error: "Моля, попълнете име и цвят." },
        { status: 400 }
      );
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      return NextResponse.json(
        { error: "Невалиден hex код. Очакван формат #RRGGBB." },
        { status: 400 }
      );
    }

    const color = await prisma.color.create({
      data: {
        name: String(name).trim(),
        hex: hex.toUpperCase(),
        order: typeof order === "number" ? order : 0,
      },
    });

    return NextResponse.json({ success: true, color });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("Unique constraint")
        ? "Вече съществува цвят с това име."
        : "Грешка при създаване на цвят.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
