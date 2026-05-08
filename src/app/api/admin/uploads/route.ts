import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";
import { logError } from "@/lib/logger";
import { getUploadsDir, uploadUrl } from "@/lib/uploads";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const uploadsDir = getUploadsDir();
    const files = await readdir(uploadsDir).catch(() => [] as string[]);

    const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const imageFiles = files.filter((f) =>
      imageExts.includes(path.extname(f).toLowerCase())
    );

    // Get file stats for sorting by newest first
    const withStats = await Promise.all(
      imageFiles.map(async (f) => {
        const s = await stat(path.join(uploadsDir, f)).catch(() => null);
        return { url: uploadUrl(f), mtime: s?.mtimeMs || 0 };
      })
    );

    withStats.sort((a, b) => b.mtime - a.mtime);

    return NextResponse.json({ images: withStats.map((f) => f.url) });
  } catch (err) {
    await logError(err, { route: "/api/admin/uploads" });
    return NextResponse.json({ images: [] });
  }
}
