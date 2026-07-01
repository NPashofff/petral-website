import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";

export async function GET(request: NextRequest) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level");
  const search = searchParams.get("q");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "100"), 500);
  const offset = parseInt(searchParams.get("offset") ?? "0");

  const where: Record<string, unknown> = {};
  if (level && level !== "all") where.level = level;
  if (search) {
    where.OR = [
      { message: { contains: search } },
      { route: { contains: search } },
      { stack: { contains: search } },
    ];
  }

  const [logs, total] = await Promise.all([
    prisma.errorLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    }),
    prisma.errorLog.count({ where }),
  ]);

  return NextResponse.json({ logs, total });
}

export async function DELETE(request: NextRequest) {
  const csrf = requireSameOrigin(request);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    await prisma.errorLog.delete({ where: { id: parseInt(id) } });
  } else {
    await prisma.errorLog.deleteMany({});
  }

  return NextResponse.json({ success: true });
}
