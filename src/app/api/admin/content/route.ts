import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { defaultContent, getAllContent } from "@/lib/content";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Не сте влезли" }, { status: 401 });
  }

  const content = await getAllContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Не сте влезли" }, { status: 401 });
  }

  const body: Record<string, string> = await request.json();

  const validKeys = Object.keys(defaultContent);
  const entries = Object.entries(body).filter(([key]) => validKeys.includes(key));

  for (const [key, value] of entries) {
    await prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ success: true, updated: entries.length });
}
