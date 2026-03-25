import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import path from "path";

const SCRAPED = readFileSync("scraped-data.md", "utf-8");
const UPLOADS_DIR = "public/uploads/products";

// Product metadata (slug, category, brand, year, hp, engine, weight, featured)
const META = {
  23:   { slug: "traktor-tym-t2025p", category: "TRACTOR", brand: "TYM", year: 2025, hp: "25 к.с.", engine: "Yanmar 3TNV80F-NXD, 1267 cc", weight: "853 кг", featured: false },
  569:  { slug: "traktor-tym-t3048", category: "TRACTOR", brand: "TYM", year: 2025, hp: "48 к.с.", engine: "TYM T2300N2, 2287 cc", weight: "1464 кг", featured: false },
  602:  { slug: "traktor-tym-t1025", category: "TRACTOR", brand: "TYM", year: 2025, hp: "25 к.с.", engine: "Yanmar 3TNV76-UD, 1116 cc", weight: "768 кг", featured: false },
  630:  { slug: "traktor-tym-t5068", category: "TRACTOR", brand: "TYM", year: 2025, hp: "67 к.с.", engine: "Deutz TCD2.9L4, 2925 cc", weight: "2595 кг", featured: false },
  677:  { slug: "traktor-tym-t5075", category: "TRACTOR", brand: "TYM", year: 2025, hp: "74 к.с.", engine: "Deutz TCD2.9L4, 2925 cc", weight: "2835 кг", featured: false },
  770:  { slug: "traktor-tym-t6115", category: "TRACTOR", brand: "TYM", year: 2025, hp: "111 к.с.", engine: "Deutz TCD 3.6 L4 Common Rail, 3621 cc", weight: "4130 кг", featured: true },
  801:  { slug: "traktor-tym-t6130", category: "TRACTOR", brand: "TYM", year: 2025, hp: "127 к.с.", engine: "Deutz TCD 3.6 L4 Common Rail, 3621 cc", weight: "4470 кг", featured: true },
  1088: { slug: "atv-hisun-guardian-400", category: "ATV", brand: "Hisun", year: 2026, hp: "28 к.с.", engine: "Едноцилиндров 4-такт SOHC, 400 cc, EFI", weight: "448 кг", featured: true },
  1099: { slug: "atv-hisun-guardian-750", category: "ATV", brand: "Hisun", year: 2026, hp: "44 к.с.", engine: "Едноцилиндров 4-такт SOHC, 750 cc, EFI", weight: "448 кг", featured: false },
  1096: { slug: "atv-hisun-guardian-750l", category: "ATV", brand: "Hisun", year: 2026, hp: "44 к.с.", engine: "Едноцилиндров 4-такт SOHC, 750 cc, EFI", weight: "452 кг", featured: false },
  1028: { slug: "atv-linhai-f320", category: "ATV", brand: "Linhai", year: 2026, hp: "21 к.с.", engine: "LH173MN едноцилиндров 4-такт водоохлаждан, 275 cc", weight: "295 кг", featured: false },
  1105: { slug: "atv-linhai-m210", category: "ATV", brand: "Linhai", year: 2026, hp: "11 к.с.", engine: "LH1P63FMK-2 едноцилиндров 4-такт въздушноохлаждан, 177 cc", weight: "188 кг", featured: false },
  1112: { slug: "atv-linhai-promax-550", category: "ATV", brand: "Linhai", year: 2026, hp: "39 к.с.", engine: "Едноцилиндров 4-такт SOHC водоохлаждан, 499.5 cc, EFI", weight: "371 кг", featured: false },
  1115: { slug: "atv-linhai-promax-650l", category: "ATV", brand: "Linhai", year: 2026, hp: "39 к.с.", engine: "Едноцилиндров 4-такт водоохлаждан, 585.3 cc, EFI", weight: "395 кг", featured: false },
  1054: { slug: "utv-hisun-strike-250", category: "UTV", brand: "Hisun", year: 2026, hp: "16 к.с.", engine: "Едноцилиндров 4-такт SOHC, 229 cc, EFI", weight: "402 кг", featured: false },
  1075: { slug: "utv-hisun-sector-550", category: "UTV", brand: "Hisun", year: 2026, hp: "30 к.с.", engine: "Едноцилиндров 4-такт SOHC, 546 cc, EFI", weight: "743 кг", featured: false },
  1118: { slug: "utv-linhai-tboss-570", category: "UTV", brand: "Linhai", year: 2026, hp: "38 к.с.", engine: "4-такт течноохлаждан, 499.5 cc, EFI", weight: "540 кг", featured: false },
  1122: { slug: "utv-linhai-lh1100-diesel-red", category: "UTV", brand: "Linhai", year: 2026, hp: "25 к.с.", engine: "Kubota дизел, 3-цилиндров 4-такт, 1123 cc", weight: "882 кг", featured: false },
  1125: { slug: "utv-linhai-lh1100-diesel-yellow", category: "UTV", brand: "Linhai", year: 2026, hp: "25 к.с.", engine: "Kubota дизел, 3-цилиндров 4-такт, 1123 cc", weight: "882 кг", featured: false },
};

// Parse scraped data
const products = [];
const productSections = SCRAPED.split(/^## Product ID /m).slice(1);

for (const section of productSections) {
  const idMatch = section.match(/^(\d+): (.+)/);
  if (!idMatch) continue;
  const id = parseInt(idMatch[1]);
  const name = idMatch[2].trim();
  const meta = META[id];
  if (!meta) { console.log(`No meta for ID ${id}`); continue; }

  // Featured image
  const featuredMatch = section.match(/### Featured Image\n- Media ID: \d+\n- URL: (.+)/);
  const featuredUrl = featuredMatch ? featuredMatch[1].trim() : null;

  // Gallery images
  const gallerySection = section.match(/### Gallery Images \(\d+ images\)\n([\s\S]*?)(?=\n### )/);
  const galleryUrls = gallerySection
    ? gallerySection[1].split("\n").filter(l => l.startsWith("- ")).map(l => l.slice(2).trim())
    : [];

  // Full HTML content
  const htmlMatch = section.match(/### Full HTML Content\n```html\n([\s\S]*?)\n```/);
  const html = htmlMatch ? htmlMatch[1].trim() : "";

  // Collect all unique image URLs (featured + gallery)
  const allImageUrls = new Set();
  if (featuredUrl) allImageUrls.add(featuredUrl);
  galleryUrls.forEach(u => allImageUrls.add(u));

  products.push({ id, name, meta, featuredUrl, galleryUrls: [...allImageUrls], html });
}

console.log(`Parsed ${products.length} products`);

// Download all gallery images
let downloadCount = 0;
const urlToLocal = {};

for (const p of products) {
  for (let i = 0; i < p.galleryUrls.length; i++) {
    const url = p.galleryUrls[i];
    if (urlToLocal[url]) continue;

    const ext = path.extname(url.split("?")[0]) || ".png";
    const localName = `${p.meta.slug}-${i + 1}${ext}`;
    const localPath = path.join(UPLOADS_DIR, localName);
    const webPath = `/uploads/products/${localName}`;

    if (!existsSync(localPath)) {
      try {
        console.log(`Downloading: ${localName}`);
        execSync(`curl -sL -o "${localPath}" "${url}"`, { timeout: 30000 });
        downloadCount++;
      } catch (e) {
        console.error(`Failed: ${url}`);
        continue;
      }
    }
    urlToLocal[url] = webPath;
  }
}

console.log(`Downloaded ${downloadCount} new images`);

// Generate seed-data.ts
let ts = `export interface SeedProduct {
  name: string;
  slug: string;
  description: string;
  price: number | null;
  category: string;
  brand: string;
  year: number;
  horsepower: string;
  engine: string;
  weight: string;
  images: string;
  featured: boolean;
}

export const seedProducts: SeedProduct[] = [\n`;

for (const p of products) {
  const imageList = p.galleryUrls.map(u => urlToLocal[u]).filter(Boolean);
  const imagesJson = JSON.stringify(imageList);

  // Escape backticks and ${} in HTML for template literal
  const escapedHtml = p.html
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");

  ts += `  {
    name: ${JSON.stringify(p.name)},
    slug: ${JSON.stringify(p.meta.slug)},
    category: ${JSON.stringify(p.meta.category)},
    brand: ${JSON.stringify(p.meta.brand)},
    year: ${p.meta.year},
    horsepower: ${JSON.stringify(p.meta.hp)},
    engine: ${JSON.stringify(p.meta.engine)},
    weight: ${JSON.stringify(p.meta.weight)},
    price: null,
    featured: ${p.meta.featured},
    images: ${JSON.stringify(imagesJson)},
    description: \`${escapedHtml}\`,
  },\n`;
}

ts += `];\n`;

writeFileSync("src/lib/seed-data.ts", ts);
console.log(`\nGenerated seed-data.ts with ${products.length} products`);
console.log("Image counts per product:");
for (const p of products) {
  const count = p.galleryUrls.filter(u => urlToLocal[u]).length;
  console.log(`  ${p.name}: ${count} images`);
}
