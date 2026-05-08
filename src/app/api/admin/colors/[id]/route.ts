import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { logError } from "@/lib/logger";

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function requireAdmin() {
  const session = await getSession();
  return !!session;
}

export async function PUT(req: NextRequest, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const { name, hex, order } = await req.json();

    if (!name || !hex) {
      return NextResponse.json(
        { error: "Моля, попълнете име и цвят." },
        { status: 400 }
      );
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      return NextResponse.json(
        { error: "Невалиден hex код." },
        { status: 400 }
      );
    }

    const color = await prisma.color.update({
      where: { id: parseInt(id) },
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
        : "Грешка при обновяване на цвят.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await prisma.color.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (err) {
    await logError(err, { route: "/api/admin/colors/[id]" });
    return NextResponse.json(
      { error: "Грешка при изтриване на цвят." },
      { status: 500 }
    );
  }
}
