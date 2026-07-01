import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";

export async function GET() {
  const colors = await prisma.color.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
  return NextResponse.json(
    colors.map((color) => ({
      id: color.id,
      name: color.name,
      hex: color.hex,
      order: color.order,
      productCount: color._count.products,
      isUsed: color._count.products > 0,
    }))
  );
}

export async function POST(req: NextRequest) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

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
