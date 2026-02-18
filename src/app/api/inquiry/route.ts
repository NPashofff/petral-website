import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendInquiryNotification } from "@/lib/email";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimitResponse = checkRateLimit(ip, "inquiry", {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (rateLimitResponse) return rateLimitResponse;

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

    // Fetch product info for the email
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      select: { name: true },
    });

    // Send email notification (non-blocking)
    sendInquiryNotification(
      { name, email, phone, message },
      product?.name || `Продукт #${productId}`
    ).catch((err) => {
      console.error("Failed to send inquiry notification email:", err);
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch {
    return NextResponse.json({ error: "Грешка при обработка на запитването." }, { status: 500 });
  }
}
