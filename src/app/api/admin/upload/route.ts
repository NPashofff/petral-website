import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";
import { getUploadsDir, uploadUrl } from "@/lib/uploads";
import { detectImageType, extensionForImageType } from "@/lib/image-validation";

export async function POST(req: NextRequest) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Не е избран файл." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Файлът е твърде голям. Максимум 5MB." },
        { status: 400 }
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());

    // Do NOT trust file.type or the client-supplied extension — detect the real
    // type from the file's magic bytes and derive the stored extension from it.
    const detected = detectImageType(bytes);
    if (!detected) {
      return NextResponse.json(
        { error: "Невалиден формат. Позволени: JPG, PNG, WebP, GIF." },
        { status: 400 }
      );
    }
    const ext = extensionForImageType(detected);

    const uploadsDir = getUploadsDir();
    await mkdir(uploadsDir, { recursive: true });

    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 50);
    const filename = `${Date.now()}-${safeName}${ext}`;

    await writeFile(path.join(uploadsDir, filename), bytes);

    return NextResponse.json({ url: uploadUrl(filename) });
  } catch (err) {
    await logError(err, { route: "/api/admin/upload" });
    return NextResponse.json({ error: "Грешка при качване." }, { status: 500 });
  }
}
