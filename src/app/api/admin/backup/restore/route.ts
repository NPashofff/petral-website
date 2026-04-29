import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import JSZip from "jszip";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Scope = "db" | "inquiries" | "uploads";

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return !!session?.value;
}

async function readJson<T>(zip: JSZip, filename: string): Promise<T | null> {
  const file = zip.file(filename);
  if (!file) return null;
  const text = await file.async("string");
  return JSON.parse(text) as T;
}

async function writeUploadsFromZip(zip: JSZip): Promise<number> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const uploadFiles = zip.folder("uploads");
  if (!uploadFiles) return 0;

  let count = 0;
  const entries: Array<{ name: string; file: JSZip.JSZipObject }> = [];
  zip.forEach((relativePath, file) => {
    if (relativePath.startsWith("uploads/") && !file.dir) {
      entries.push({ name: relativePath.slice("uploads/".length), file });
    }
  });

  for (const { name, file } of entries) {
    if (!name || name.includes("/") || name.includes("..")) continue;
    const content = await file.async("nodebuffer");
    await fs.writeFile(path.join(uploadsDir, name), content);
    count++;
  }
  return count;
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const scopesRaw = String(formData.get("scopes") || "");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Липсва файл." }, { status: 400 });
    }

    const scopes = new Set<Scope>(
      scopesRaw.split(",").filter((s): s is Scope => ["db", "inquiries", "uploads"].includes(s))
    );
    if (scopes.size === 0) {
      return NextResponse.json({ error: "Не е избран обхват." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const zip = await JSZip.loadAsync(buffer);

    const manifest = await readJson<{ schemaVersion: string; scopes: Scope[] }>(zip, "manifest.json");
    if (!manifest || manifest.schemaVersion !== "1") {
      return NextResponse.json(
        { error: "Невалиден или несъвместим бекъп файл." },
        { status: 400 }
      );
    }

    const restored: Record<string, number> = {};

    // Products + Colors + SiteContent + Admins + Contacts
    if (scopes.has("db")) {
      const products = (await readJson<
        Array<{
          id: number;
          name: string;
          slug: string;
          description: string;
          price: number | null;
          category: string;
          brand: string;
          year: number | null;
          horsepower: string | null;
          engine: string | null;
          weight: string | null;
          viscosity: string | null;
          volumeValue: number | null;
          volumeUnit: string | null;
          images: string;
          address: string | null;
          lat: number | null;
          lon: number | null;
          featured: boolean;
          createdAt: string;
          colorIds: number[];
        }>
      >(zip, "data/products.json")) || [];
      const colors = (await readJson<
        Array<{ id: number; name: string; hex: string; order: number; createdAt: string }>
      >(zip, "data/colors.json")) || [];
      const siteContent = (await readJson<
        Array<{ key: string; value: string; updatedAt: string }>
      >(zip, "data/site_content.json")) || [];
      const admins = (await readJson<
        Array<{ id: number; username: string; password: string; name: string; createdAt: string }>
      >(zip, "data/admins.json")) || [];
      const contacts = (await readJson<
        Array<{ id: number; name: string; email: string; phone: string | null; message: string; createdAt: string }>
      >(zip, "data/contacts.json")) || [];

      await prisma.$transaction(async (tx) => {
        // Order matters: inquiries reference products; products reference colors via link table.
        await tx.inquiry.deleteMany({});
        await tx.product.deleteMany({});
        await tx.color.deleteMany({});
        await tx.siteContent.deleteMany({});
        await tx.admin.deleteMany({});
        await tx.contact.deleteMany({});

        for (const c of colors) {
          await tx.color.create({
            data: {
              id: c.id,
              name: c.name,
              hex: c.hex,
              order: c.order,
              createdAt: new Date(c.createdAt),
            },
          });
        }
        for (const p of products) {
          await tx.product.create({
            data: {
              id: p.id,
              name: p.name,
              slug: p.slug,
              description: p.description,
              price: p.price,
              category: p.category,
              brand: p.brand,
              year: p.year,
              horsepower: p.horsepower,
              engine: p.engine,
              weight: p.weight,
              viscosity: p.viscosity ?? null,
              volumeValue: p.volumeValue ?? null,
              volumeUnit: p.volumeUnit ?? null,
              images: p.images,
              address: p.address,
              lat: p.lat,
              lon: p.lon,
              featured: p.featured,
              createdAt: new Date(p.createdAt),
              colors: { connect: (p.colorIds || []).map((id) => ({ id })) },
            },
          });
        }
        for (const sc of siteContent) {
          await tx.siteContent.create({
            data: { key: sc.key, value: sc.value, updatedAt: new Date(sc.updatedAt) },
          });
        }
        for (const a of admins) {
          await tx.admin.create({
            data: {
              id: a.id,
              username: a.username,
              password: a.password,
              name: a.name,
              createdAt: new Date(a.createdAt),
            },
          });
        }
        for (const c of contacts) {
          await tx.contact.create({
            data: {
              id: c.id,
              name: c.name,
              email: c.email,
              phone: c.phone,
              message: c.message,
              createdAt: new Date(c.createdAt),
            },
          });
        }
      });

      restored.products = products.length;
      restored.colors = colors.length;
      restored.siteContent = siteContent.length;
      restored.admins = admins.length;
      restored.contacts = contacts.length;
    }

    if (scopes.has("inquiries")) {
      const inquiries = (await readJson<
        Array<{
          id: number;
          productId: number;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          selectedColorName: string | null;
          selectedColorHex: string | null;
          createdAt: string;
        }>
      >(zip, "data/inquiries.json")) || [];

      // If we didn't already wipe inquiries via db scope, do it now.
      if (!scopes.has("db")) {
        await prisma.inquiry.deleteMany({});
      }

      // Skip inquiries whose product doesn't exist (can happen when restoring inquiries
      // without the db scope and the product was previously deleted).
      const existingProductIds = new Set(
        (await prisma.product.findMany({ select: { id: true } })).map((p) => p.id)
      );

      let created = 0;
      for (const inq of inquiries) {
        if (!existingProductIds.has(inq.productId)) continue;
        await prisma.inquiry.create({
          data: {
            id: inq.id,
            productId: inq.productId,
            name: inq.name,
            email: inq.email,
            phone: inq.phone,
            message: inq.message,
            selectedColorName: inq.selectedColorName ?? null,
            selectedColorHex: inq.selectedColorHex ?? null,
            createdAt: new Date(inq.createdAt),
          },
        });
        created++;
      }
      restored.inquiries = created;
    }

    if (scopes.has("uploads")) {
      restored.uploads = await writeUploadsFromZip(zip);
    }

    return NextResponse.json({ success: true, restored });
  } catch (error) {
    console.error("Restore error:", error);
    return NextResponse.json(
      { error: "Грешка при възстановяване. Проверете ZIP файла." },
      { status: 500 }
    );
  }
}
