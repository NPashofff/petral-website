import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import JSZip from "jszip";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/csrf";
import { logError } from "@/lib/logger";
import { getUploadsDir } from "@/lib/uploads";
import { normalizeImagesString } from "@/lib/images";
import {
  detectImageType,
  ALLOWED_UPLOAD_EXTENSIONS,
} from "@/lib/image-validation";
import { revalidateTag } from "next/cache";
import { SITE_CONTENT_TAG } from "@/lib/content";
import { revalidateProductPaths } from "@/lib/revalidate";
import { isPromotionType } from "@/lib/promotion";
import { clampSortOrder } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Scope = "db" | "inquiries" | "uploads";

// Caps for restoring the "uploads" scope of a backup archive.
const MAX_UPLOAD_ENTRIES = 5000;
const MAX_UPLOAD_FILE_BYTES = 10 * 1024 * 1024; // 10MB per file
const MAX_UPLOAD_TOTAL_BYTES = 500 * 1024 * 1024; // 500MB total

class RestoreValidationError extends Error {}

async function readJson<T>(zip: JSZip, filename: string): Promise<T | null> {
  const file = zip.file(filename);
  if (!file) return null;
  const text = await file.async("string");
  return JSON.parse(text) as T;
}

async function writeUploadsFromZip(zip: JSZip): Promise<number> {
  const uploadsDir = getUploadsDir();
  await fs.mkdir(uploadsDir, { recursive: true });
  const root = path.resolve(uploadsDir);

  const uploadFiles = zip.folder("uploads");
  if (!uploadFiles) return 0;

  const entries: Array<{ name: string; file: JSZip.JSZipObject }> = [];
  zip.forEach((relativePath, file) => {
    if (relativePath.startsWith("uploads/") && !file.dir) {
      entries.push({ name: relativePath.slice("uploads/".length), file });
    }
  });

  // Max entry count guard (zip bomb / abuse).
  if (entries.length > MAX_UPLOAD_ENTRIES) {
    throw new RestoreValidationError(
      `Архивът съдържа твърде много файлове (${entries.length}).`
    );
  }

  let count = 0;
  let totalBytes = 0;

  for (const { name, file } of entries) {
    // Zip-slip / path-traversal guard.
    if (!name || name.includes("/") || name.includes("\\") || name.includes("..")) {
      throw new RestoreValidationError(`Невалидно име на файл в архива: "${name}".`);
    }

    // Extension whitelist.
    const ext = path.extname(name).toLowerCase();
    if (!(ALLOWED_UPLOAD_EXTENSIONS as readonly string[]).includes(ext)) {
      throw new RestoreValidationError(`Неразрешен тип файл в архива: "${name}".`);
    }

    const content = await file.async("nodebuffer");

    // Per-file size cap.
    if (content.length > MAX_UPLOAD_FILE_BYTES) {
      throw new RestoreValidationError(`Файл в архива е твърде голям: "${name}".`);
    }
    totalBytes += content.length;
    if (totalBytes > MAX_UPLOAD_TOTAL_BYTES) {
      throw new RestoreValidationError("Архивът надвишава максималния общ размер.");
    }

    // Magic-byte check: contents must actually be a supported raster image.
    if (!detectImageType(content)) {
      throw new RestoreValidationError(
        `Съдържанието на "${name}" не е валидно изображение.`
      );
    }

    // Defense in depth: ensure the resolved path stays inside uploadsDir.
    const dest = path.resolve(path.join(uploadsDir, name));
    if (dest !== root && !dest.startsWith(root + path.sep)) {
      throw new RestoreValidationError(`Невалиден път на файл в архива: "${name}".`);
    }

    await fs.writeFile(dest, content);
    count++;
  }
  return count;
}

export async function POST(req: NextRequest) {
  const csrf = requireSameOrigin(req);
  if (csrf) return csrf;

  const session = await requireSession();
  if (session instanceof NextResponse) return session;

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
          hidden?: boolean;
          sortOrder?: number;
          promotionId?: number | null;
          createdAt: string;
          colorIds: number[];
        }>
      >(zip, "data/products.json")) || [];
      // Promotions: absent in backups made before the feature existed.
      const promotions = (await readJson<
        Array<{
          id: number;
          title: string;
          type: string;
          promoPriceGross: number | null;
          percent: number | null;
          ribbonText: string;
          comment: string | null;
          startsAt: string | null;
          endsAt: string | null;
          active: boolean;
          createdAt: string;
        }>
      >(zip, "data/promotions.json")) || [];
      // Only known types restore; anything else would silently become a
      // discount-less promotion, so it is skipped and reported.
      const validPromotions = promotions.filter((p) => isPromotionType(p.type));
      const promotionIds = new Set(validPromotions.map((p) => p.id));
      const colors = (await readJson<
        Array<{ id: number; name: string; hex: string; order: number; createdAt: string }>
      >(zip, "data/colors.json")) || [];
      const siteContent = (await readJson<
        Array<{ key: string; value: string; updatedAt: string }>
      >(zip, "data/site_content.json")) || [];
      // #20: admin accounts (and password hashes) are NOT part of the backup
      // anymore and are never restored. Existing admins are left untouched so a
      // restore cannot wipe the only login or reintroduce stale credentials.
      const contacts = (await readJson<
        Array<{ id: number; name: string; email: string; phone: string | null; message: string; createdAt: string }>
      >(zip, "data/contacts.json")) || [];
      // #23: per-color prices/images (ProductColorImage). Absent in pre-fix
      // backups → [] (backward compatible), so those simply restore no color rows.
      const colorImages = (await readJson<
        Array<{
          id: number;
          productId: number;
          colorId: number;
          imageUrl: string;
          price: number | null;
          createdAt: string;
          updatedAt: string;
        }>
      >(zip, "data/color_images.json")) || [];

      await prisma.$transaction(async (tx) => {
        // Order matters: inquiries reference products; products reference colors via link table.
        // #20: admins are intentionally NOT wiped or restored — they are
        // preserved across a restore so login is never lost.
        await tx.inquiry.deleteMany({});
        await tx.product.deleteMany({});
        await tx.color.deleteMany({});
        await tx.siteContent.deleteMany({});
        await tx.contact.deleteMany({});
        await tx.promotion.deleteMany({});

        if (validPromotions.length > 0) {
          await tx.promotion.createMany({
            data: validPromotions.map((p) => ({
              id: p.id,
              title: p.title,
              type: p.type,
              promoPriceGross: p.promoPriceGross ?? null,
              percent: p.percent ?? null,
              ribbonText: p.ribbonText || "ПРОМОЦИЯ",
              comment: p.comment ?? null,
              startsAt: p.startsAt ? new Date(p.startsAt) : null,
              endsAt: p.endsAt ? new Date(p.endsAt) : null,
              active: p.active !== false,
              createdAt: new Date(p.createdAt),
            })),
          });
        }

        // #23: flat tables (no relation writes) go through createMany.
        if (colors.length > 0) {
          await tx.color.createMany({
            data: colors.map((c) => ({
              id: c.id,
              name: c.name,
              hex: c.hex,
              order: c.order,
              createdAt: new Date(c.createdAt),
            })),
          });
        }
        // Products keep per-row create: each needs its colors.connect relation,
        // which createMany cannot express.
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
              images: normalizeImagesString(p.images),
              address: p.address,
              lat: p.lat,
              lon: p.lon,
              featured: p.featured,
              hidden: !!p.hidden,
              sortOrder: clampSortOrder(p.sortOrder),
              // Only link to a promotion that exists in this backup (SetNull FK).
              promotionId:
                p.promotionId != null && promotionIds.has(p.promotionId) ? p.promotionId : null,
              createdAt: new Date(p.createdAt),
              colors: { connect: (p.colorIds || []).map((id) => ({ id })) },
            },
          });
        }
        // #23: recreate ProductColorImage rows AFTER products+colors exist (both
        // are FK targets). Cascade already cleared them via product.deleteMany.
        if (colorImages.length > 0) {
          await tx.productColorImage.createMany({
            data: colorImages.map((ci) => ({
              id: ci.id,
              productId: ci.productId,
              colorId: ci.colorId,
              imageUrl: ci.imageUrl,
              price: ci.price ?? null,
              createdAt: new Date(ci.createdAt),
              updatedAt: new Date(ci.updatedAt),
            })),
          });
        }
        if (siteContent.length > 0) {
          await tx.siteContent.createMany({
            data: siteContent.map((sc) => ({
              key: sc.key,
              value: sc.value,
              updatedAt: new Date(sc.updatedAt),
            })),
          });
        }
        if (contacts.length > 0) {
          await tx.contact.createMany({
            data: contacts.map((c) => ({
              id: c.id,
              name: c.name,
              email: c.email,
              phone: c.phone,
              message: c.message,
              createdAt: new Date(c.createdAt),
            })),
          });
        }
      });

      restored.products = products.length;
      restored.colors = colors.length;
      restored.colorImages = colorImages.length;
      restored.siteContent = siteContent.length;
      restored.contacts = contacts.length;
      restored.promotions = validPromotions.length;
      restored.promotionsSkipped = promotions.length - validPromotions.length;
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

      // Skip inquiries whose product doesn't exist (can happen when restoring inquiries
      // without the db scope and the product was previously deleted).
      const existingProductIds = new Set(
        (await prisma.product.findMany({ select: { id: true } })).map((p) => p.id)
      );

      const validInquiries = inquiries.filter((inq) =>
        existingProductIds.has(inq.productId)
      );

      // #23: wipe + recreate the inquiries in a single transaction so a failure
      // mid-restore can't leave inquiries partially deleted/recreated.
      await prisma.$transaction([
        prisma.inquiry.deleteMany({}),
        ...(validInquiries.length > 0
          ? [
              prisma.inquiry.createMany({
                data: validInquiries.map((inq) => ({
                  id: inq.id,
                  productId: inq.productId,
                  name: inq.name,
                  email: inq.email,
                  phone: inq.phone,
                  message: inq.message,
                  selectedColorName: inq.selectedColorName ?? null,
                  selectedColorHex: inq.selectedColorHex ?? null,
                  createdAt: new Date(inq.createdAt),
                })),
              }),
            ]
          : []),
      ]);

      restored.inquiries = validInquiries.length;
    }

    if (scopes.has("uploads")) {
      restored.uploads = await writeUploadsFromZip(zip);
    }

    // #27: a restore can replace the entire product set and site content, so
    // flush both the product route caches and the site-content data cache.
    if (scopes.has("db")) {
      revalidateProductPaths();
      revalidateTag(SITE_CONTENT_TAG);
    }

    return NextResponse.json({ success: true, restored });
  } catch (error) {
    if (error instanceof RestoreValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Restore error:", error);
    await logError(error, { route: "/api/admin/backup/restore" });
    return NextResponse.json(
      { error: "Грешка при възстановяване. Проверете ZIP файла." },
      { status: 500 }
    );
  }
}
