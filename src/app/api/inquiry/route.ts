import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendInquiryNotification } from "@/lib/email";
import { logError } from "@/lib/logger";
import { inquirySchema, parseBody } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimitResponse = checkRateLimit(ip, "inquiry", {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (rateLimitResponse) return rateLimitResponse;

  const parsed = await parseBody(request, inquirySchema);
  if ("error" in parsed) return parsed.error;
  const { productId, name, email, phone, message, selectedColorName, selectedColorHex } =
    parsed.data;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { name: true },
    });
    if (!product) {
      return NextResponse.json(
        { error: "Продуктът не е намерен." },
        { status: 404 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        productId,
        name,
        email,
        phone: phone || null,
        message,
        selectedColorName: selectedColorName || null,
        selectedColorHex: selectedColorHex || null,
      },
    });

    sendInquiryNotification(
      { name, email, phone: phone ?? null, message },
      product.name,
      selectedColorName && selectedColorHex
        ? { name: selectedColorName, hex: selectedColorHex }
        : null
    ).catch((err) => {
      console.error("Failed to send inquiry notification email:", err);
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (err) {
    await logError(err, { route: "/api/inquiry" });
    return NextResponse.json({ error: "Грешка при обработка на запитването." }, { status: 500 });
  }
}
