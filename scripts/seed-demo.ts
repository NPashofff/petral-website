/**
 * Demo products for local development.
 *
 * Prices are PLACEHOLDERS — euro, VAT included (the site derives the net price).
 * Run with:  npx tsx scripts/seed-demo.ts
 * Undo with: npx tsx scripts/seed-demo.ts --clean
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Demo = {
  name: string;
  slug: string;
  description: string;
  price: number | null;
  category: string;
  brand: string;
  year?: number;
  horsepower?: string;
  engine?: string;
  weight?: string;
  viscosity?: string;
  volumeValue?: number;
  volumeUnit?: string;
  featured?: boolean;
};

const DEMO: Demo[] = [
  {
    name: "TYM T1025",
    slug: "demo-traktor-tym-t1025",
    description:
      "<p>Компактен трактор за овощарство и комунални дейности. Хидростатична трансмисия, 4x4, три-точков окачване.</p>",
    price: 21500,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "25 к.с.",
    engine: "Yanmar 3TNV76-UD, 1116 cc",
    weight: "768 кг",
  },
  {
    name: "TYM T5075",
    slug: "demo-traktor-tym-t5075",
    description:
      "<p>Универсален трактор за средни стопанства. Кабина с климатик, синхронизирана трансмисия, задна ВОМ.</p>",
    price: 58900,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "74 к.с.",
    engine: "Deutz TCD2.9L4, 2925 cc",
    weight: "2835 кг",
    featured: true,
  },
  {
    name: "TYM T6130",
    slug: "demo-traktor-tym-t6130",
    description:
      "<p>Флагманският модел на TYM. Common Rail двигател, Powershift трансмисия, луксозна кабина.</p>",
    price: 96400,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "127 к.с.",
    engine: "Deutz TCD 3.6 L4 Common Rail, 3621 cc",
    weight: "4470 кг",
    featured: true,
  },
  {
    name: "Hisun Guardian 400",
    slug: "demo-atv-hisun-guardian-400",
    description:
      "<p>Работно ATV с висока проходимост, теглич и багажници. Подходящо за земеделие и горско стопанство.</p>",
    price: 8790,
    category: "ATV",
    brand: "Hisun",
    year: 2026,
    horsepower: "28 к.с.",
    engine: "Едноцилиндров 4-такт SOHC, 400 cc, EFI",
    weight: "448 кг",
  },
  {
    name: "Linhai Promax 550",
    slug: "demo-atv-linhai-promax-550",
    description:
      "<p>ATV с независимо окачване и EFI двигател. Електрическо усилване на волана, лебедка.</p>",
    price: 11250,
    category: "ATV",
    brand: "Linhai",
    year: 2026,
    horsepower: "39 к.с.",
    engine: "Едноцилиндров 4-такт SOHC водоохлаждан, 499.5 cc, EFI",
    weight: "371 кг",
    featured: true,
  },
  {
    name: "Hisun Sector 550",
    slug: "demo-utv-hisun-sector-550",
    description:
      "<p>Двуместно UTV с товарна каросерия. Здраво шаси, теглителна способност 500 кг.</p>",
    price: 15400,
    category: "UTV",
    brand: "Hisun",
    year: 2026,
    horsepower: "30 к.с.",
    engine: "Едноцилиндров 4-такт SOHC, 546 cc, EFI",
    weight: "743 кг",
  },
  {
    name: "Linhai LH1100 Diesel",
    slug: "demo-utv-linhai-lh1100-diesel",
    description:
      "<p>Дизелово UTV с Kubota двигател. Кабина, отопление, самосвална каросерия.</p>",
    price: 23800,
    category: "UTV",
    brand: "Linhai",
    year: 2026,
    horsepower: "25 к.с.",
    engine: "Kubota дизел, 3-цилиндров 4-такт, 1123 cc",
    weight: "882 кг",
  },
  {
    name: "Обръщателен плуг 2-корпусен",
    slug: "demo-plug-2-korpusen",
    description: "<p>Навесен обръщателен плуг за трактори от 40 до 80 к.с. Работна ширина 70 см.</p>",
    price: 3450,
    category: "EQUIPMENT",
    brand: "Petral",
    year: 2025,
    weight: "410 кг",
  },
  {
    name: "Ротационна косачка 1.6 м",
    slug: "demo-kosachka-1600",
    description: "<p>Навесна ротационна косачка с работна ширина 1600 мм. Задвижване от ВОМ.</p>",
    price: null,
    category: "EQUIPMENT",
    brand: "Petral",
    year: 2025,
    weight: "285 кг",
  },
  {
    name: "Shell Rimula R4 X 15W-40 20L",
    slug: "demo-oil-shell-rimula-r4x-15w40-20l",
    description: "<p>Моторно масло за тежкотоварни дизелови двигатели. API CI-4, ACEA E7.</p>",
    price: 7.2,
    category: "OILS",
    brand: "Shell",
    viscosity: "15W40",
    volumeValue: 20,
    volumeUnit: "L",
  },
  {
    name: "Shell Spirax S4 TXM 20L",
    slug: "demo-oil-shell-spirax-s4-txm-20l",
    description: "<p>Универсално трансмисионно-хидравлично масло (UTTO) за селскостопанска техника.</p>",
    price: 8.45,
    category: "OILS",
    brand: "Shell",
    viscosity: "10W30",
    volumeValue: 20,
    volumeUnit: "L",
  },
  {
    name: "Shell Gadus S2 V220 18kg",
    slug: "demo-oil-shell-gadus-s2-v220-18kg",
    description: "<p>Литиева грес за общо приложение. Работен диапазон -20 °C до +130 °C.</p>",
    price: 9.9,
    category: "OILS",
    brand: "Shell",
    volumeValue: 18,
    volumeUnit: "kg",
  },
];

async function main() {
  if (process.argv.includes("--clean")) {
    const r = await prisma.product.deleteMany({ where: { slug: { startsWith: "demo-" } } });
    console.log(`Deleted ${r.count} demo product(s).`);
    return;
  }

  let created = 0;
  let updated = 0;
  for (const p of DEMO) {
    const data = { ...p, images: "[]" };
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    await prisma.product.upsert({ where: { slug: p.slug }, update: data, create: data });
    if (existing) updated++;
    else created++;
  }
  console.log(`Demo products — created: ${created}, updated: ${updated}`);
}

main().finally(() => prisma.$disconnect());
