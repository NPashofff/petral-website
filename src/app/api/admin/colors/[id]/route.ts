import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

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

export async function DELETE(req: NextRequest, context: RouteContext) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

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
