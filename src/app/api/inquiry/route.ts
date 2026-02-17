import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, name, email, phone, message } = body;

    if (!productId || !name || !email || !message) {
      return NextResponse.json({ error: "Моля, попълнете всички задължителни полета." }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        productId: parseInt(productId),
        name,
        email,
        phone: phone || null,
        message,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch {
    return NextResponse.json({ error: "Грешка при обработка на запитването." }, { status: 500 });
  }
}
