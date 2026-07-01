import { NextRequest, NextResponse } from "next/server";
import { stat, readFile } from "fs/promises";
import path from "path";
import { getUploadsDir } from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Known raster image types we are willing to serve inline. SVG is deliberately
// excluded: it can carry scripts and would be an XSS vector if served inline.
const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  if (!segments || segments.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  for (const seg of segments) {
    if (!seg || seg === "." || seg === ".." || seg.includes("\\") || seg.includes("/")) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  const uploadsDir = getUploadsDir();
  const filePath = path.join(uploadsDir, ...segments);

  // Defense in depth: ensure resolved path stays inside uploadsDir.
  const resolved = path.resolve(filePath);
  const root = path.resolve(uploadsDir);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const s = await stat(filePath);
    if (!s.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const knownType = MIME[ext];

    const headers: Record<string, string> = {
      "Content-Type": knownType || "application/octet-stream",
      "Content-Length": String(s.size),
      "Cache-Control": "public, max-age=31536000, immutable",
      // Prevent the browser from MIME-sniffing a file into an executable type.
      "X-Content-Type-Options": "nosniff",
    };

    // Anything that isn't a known raster image (e.g. an SVG that slipped in, or
    // any other file type) is forced to download instead of rendering inline.
    if (!knownType) {
      const downloadName = path.basename(filePath).replace(/[^a-zA-Z0-9._-]/g, "_");
      headers["Content-Disposition"] = `attachment; filename="${downloadName}"`;
    }

    return new NextResponse(new Uint8Array(data), { headers });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
