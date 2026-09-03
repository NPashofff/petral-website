import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import JSZip from "jszip";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { getUploadsDir } from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// SECURITY / SENSITIVITY NOTE (#20):
// The exported ZIP still contains business data (products, colours, site
// content, contacts, inquiries) and uploaded media. Treat it as SENSITIVE —
// store it encrypted/at-rest-protected and do not share it casually.
// It DELIBERATELY does NOT contain the `admins` table or any password hashes:
// leaking bcrypt hashes lets an attacker brute-force admin credentials offline,
// so they are omitted from the export entirely. Restore therefore leaves the
// existing admin accounts (and their passwords) untouched.

type Scope = "db" | "inquiries" | "uploads";

async function addUploadsToZip(zip: JSZip) {
  const uploadsDir = getUploadsDir();
  try {
    const entries = await fs.readdir(uploadsDir);
    for (const entry of entries) {
      const full = path.join(uploadsDir, entry);
      const stat = await fs.stat(full);
      if (stat.isFile()) {
        const content = await fs.readFile(full);
        zip.file(`uploads/${entry}`, content);
      }
    }
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") throw err;
  }
}

export async function GET(req: NextRequest) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const scopesParam = req.nextUrl.searchParams.get("scopes") || "";
  const scopes = new Set<Scope>(
    scopesParam.split(",").filter((s): s is Scope => ["db", "inquiries", "uploads"].includes(s))
  );

  if (scopes.size === 0) {
    return NextResponse.json({ error: "Не е избран обхват." }, { status: 400 });
  }

  const zip = new JSZip();
  const manifest = {
    schemaVersion: "1",
    createdAt: new Date().toISOString(),
    scopes: Array.from(scopes),
  };
  zip.file("manifest.json", JSON.stringify(manifest, null, 2));

  if (scopes.has("db")) {
    // #20: the admins table (and its password hashes) is intentionally NOT
    // exported. See the sensitivity note at the top of this file.
    const [products, colors, colorImages, siteContent, contacts, promotions] =
      await Promise.all([
        prisma.product.findMany({
          include: { colors: { select: { id: true } } },
          orderBy: { id: "asc" },
        }),
        prisma.color.findMany({ orderBy: { id: "asc" } }),
        // #23: per-color images AND per-color prices live in ProductColorImage;
        // export them so a restore round-trips the live-price feature (they were
        // silently dropped before, losing every colorPriceMap/colorImageMap).
        prisma.productColorImage.findMany({ orderBy: { id: "asc" } }),
        prisma.siteContent.findMany({ orderBy: { key: "asc" } }),
        prisma.contact.findMany({ orderBy: { id: "asc" } }),
        prisma.promotion.findMany({ orderBy: { id: "asc" } }),
      ]);

    const productsSerializable = products.map((p) => ({
      ...p,
      colorIds: p.colors.map((c) => c.id),
      colors: undefined,
    }));

    zip.file("data/products.json", JSON.stringify(productsSerializable, null, 2));
    zip.file("data/colors.json", JSON.stringify(colors, null, 2));
    zip.file("data/color_images.json", JSON.stringify(colorImages, null, 2));
    zip.file("data/site_content.json", JSON.stringify(siteContent, null, 2));
    zip.file("data/contacts.json", JSON.stringify(contacts, null, 2));
    // Promotions are referenced by Product.promotionId (exported with each product).
    zip.file("data/promotions.json", JSON.stringify(promotions, null, 2));
  }

  if (scopes.has("inquiries")) {
    const inquiries = await prisma.inquiry.findMany({ orderBy: { id: "asc" } });
    zip.file("data/inquiries.json", JSON.stringify(inquiries, null, 2));
  }

  if (scopes.has("uploads")) {
    await addUploadsToZip(zip);
  }

  const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  const dateStr = new Date().toISOString().slice(0, 10);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="petral-backup-${dateStr}.zip"`,
      "Content-Length": String(buffer.length),
    },
  });
}
