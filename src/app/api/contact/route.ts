import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/email";
import { logError } from "@/lib/logger";
import { contactSchema, parseBody } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimitResponse = checkRateLimit(ip, "contact", {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (rateLimitResponse) return rateLimitResponse;

  const parsed = await parseBody(request, contactSchema);
  if ("error" in parsed) return parsed.error;
  const { name, email, phone, message } = parsed.data;

  try {
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    });

    sendContactNotification({ name, email, phone: phone ?? null, message }).catch((err) => {
      console.error("Failed to send contact notification email:", err);
    });

    return NextResponse.json({ success: true, id: contact.id });
  } catch (err) {
    await logError(err, { route: "/api/contact" });
    return NextResponse.json({ error: "Грешка при изпращане на съобщението." }, { status: 500 });
  }
}
