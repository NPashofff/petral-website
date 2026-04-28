import fs from "fs";
import path from "path";

const EXTS = ["svg", "png", "webp", "jpg", "jpeg"];

export function brandSlug(brand: string): string {
  return brand
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBrandLogoUrl(brand: string | null | undefined): string | null {
  if (!brand) return null;
  const slug = brandSlug(brand);
  if (!slug) return null;
  const dir = path.join(process.cwd(), "public", "brand-logos");
  for (const ext of EXTS) {
    const filePath = path.join(dir, `${slug}.${ext}`);
    try {
      if (fs.existsSync(filePath)) {
        return `/brand-logos/${slug}.${ext}`;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

export function resolveProductImage(
  imageList: string[],
  brand: string,
  category: string
): string {
  if (imageList.length > 0) return imageList[0];
  if (category === "OILS") {
    const logo = getBrandLogoUrl(brand);
    if (logo) return logo;
  }
  return "/images/placeholder.jpg";
}
