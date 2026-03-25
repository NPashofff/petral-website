import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readdir, stat } from "fs/promises";
import path from "path";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const files = await readdir(uploadsDir).catch(() => [] as string[]);

    const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const imageFiles = files.filter((f) =>
      imageExts.includes(path.extname(f).toLowerCase())
    );

    // Get file stats for sorting by newest first
    const withStats = await Promise.all(
      imageFiles.map(async (f) => {
        const s = await stat(path.join(uploadsDir, f)).catch(() => null);
        return { url: `/uploads/${f}`, mtime: s?.mtimeMs || 0 };
      })
    );

    withStats.sort((a, b) => b.mtime - a.mtime);

    return NextResponse.json({ images: withStats.map((f) => f.url) });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
