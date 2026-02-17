import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  // Tractors
  {
    name: "John Deere 6120M",
    slug: "john-deere-6120m",
    description:
      "John Deere 6120M е универсален трактор с мощност 120 к.с., подходящ за разнообразни земеделски дейности. Оборудван с модерен двигател и хидравлична система за максимална ефективност.",
    price: 145000,
    category: "TRACTOR",
    brand: "John Deere",
    year: 2024,
    horsepower: "120 к.с.",
    engine: "4.5L 4-цилиндров дизел",
    weight: "5200 кг",
    images: JSON.stringify([
      "/images/tractors/tractor-1.jpg",
      "/images/tractors/tractor-2.jpg",
    ]),
    featured: true,
  },
  {
    name: "Kubota M7-173",
    slug: "kubota-m7-173",
    description:
      "Kubota M7-173 предлага 170 к.с. мощност в компактен и маневрен корпус. Идеален за средни и големи стопанства с нужда от висока производителност.",
    price: 168000,
    category: "TRACTOR",
    brand: "Kubota",
    year: 2024,
    horsepower: "170 к.с.",
    engine: "6.1L 4-цилиндров турбо дизел",
    weight: "6800 кг",
    images: JSON.stringify([
      "/images/tractors/tractor-2.jpg",
      "/images/tractors/tractor-3.jpg",
    ]),
    featured: true,
  },
  {
    name: "New Holland T6.180",
    slug: "new-holland-t6-180",
    description:
      "New Holland T6.180 е мощен трактор с 180 к.с., оборудван с последно поколение технологии за прецизно земеделие и комфортна кабина.",
    price: 175000,
    category: "TRACTOR",
    brand: "New Holland",
    year: 2023,
    horsepower: "180 к.с.",
    engine: "6.7L 6-цилиндров дизел",
    weight: "7200 кг",
    images: JSON.stringify([
      "/images/tractors/tractor-1.jpg",
      "/images/tractors/tractor-3.jpg",
    ]),
    featured: true,
  },
  {
    name: "Massey Ferguson 5711",
    slug: "massey-ferguson-5711",
    description:
      "Massey Ferguson 5711 е надежден трактор с 110 к.с., предлагащ отлично съотношение цена-качество. Подходящ за малки и средни стопанства.",
    price: 98000,
    category: "TRACTOR",
    brand: "Massey Ferguson",
    year: 2023,
    horsepower: "110 к.с.",
    engine: "4.4L 4-цилиндров дизел",
    weight: "4800 кг",
    images: JSON.stringify([
      "/images/tractors/tractor-3.jpg",
      "/images/tractors/tractor-1.jpg",
    ]),
    featured: false,
  },
  {
    name: "Case IH Farmall 75A",
    slug: "case-ih-farmall-75a",
    description:
      "Case IH Farmall 75A е компактен трактор с 75 к.с., идеален за градинарство, лозарство и овощарство. Лесен за управление и икономичен.",
    price: 65000,
    category: "TRACTOR",
    brand: "Case IH",
    year: 2024,
    horsepower: "75 к.с.",
    engine: "3.4L 4-цилиндров дизел",
    weight: "3200 кг",
    images: JSON.stringify([
      "/images/tractors/tractor-2.jpg",
    ]),
    featured: false,
  },
  {
    name: "Fendt 314 Vario",
    slug: "fendt-314-vario",
    description:
      "Fendt 314 Vario с безстепенна трансмисия Vario и 140 к.с. Най-високо ниво на комфорт и технологии в своя клас.",
    price: 195000,
    category: "TRACTOR",
    brand: "Fendt",
    year: 2024,
    horsepower: "140 к.с.",
    engine: "4.0L 4-цилиндров дизел",
    weight: "5600 кг",
    images: JSON.stringify([
      "/images/tractors/tractor-1.jpg",
      "/images/tractors/tractor-2.jpg",
      "/images/tractors/tractor-3.jpg",
    ]),
    featured: false,
  },
  // ATVs
  {
    name: "Can-Am Outlander 700",
    slug: "can-am-outlander-700",
    description:
      "Can-Am Outlander 700 е мощно АТВ с 650cc двигател Rotax, независимо окачване и електроусилвател на волана. Перфектен за работа и приключения.",
    price: 28500,
    category: "ATV",
    brand: "Can-Am",
    year: 2024,
    horsepower: "48 к.с.",
    engine: "650cc Rotax V-Twin",
    weight: "320 кг",
    images: JSON.stringify([
      "/images/atvs/atv-1.jpg",
      "/images/atvs/atv-2.jpg",
    ]),
    featured: true,
  },
  {
    name: "Polaris Sportsman 570",
    slug: "polaris-sportsman-570",
    description:
      "Polaris Sportsman 570 е водещо АТВ в своя клас с 44 к.с. двигател ProStar, електронен усилвател на волана и впечатляваща товароносимост.",
    price: 22000,
    category: "ATV",
    brand: "Polaris",
    year: 2024,
    horsepower: "44 к.с.",
    engine: "567cc ProStar",
    weight: "295 кг",
    images: JSON.stringify([
      "/images/atvs/atv-2.jpg",
      "/images/atvs/atv-1.jpg",
    ]),
    featured: true,
  },
  {
    name: "Yamaha Grizzly 700",
    slug: "yamaha-grizzly-700",
    description:
      "Yamaha Grizzly 700 е легендарно АТВ с 686cc двигател, автоматична трансмисия Ultramatic и отлична проходимост по всякакъв терен.",
    price: 25000,
    category: "ATV",
    brand: "Yamaha",
    year: 2024,
    horsepower: "49 к.с.",
    engine: "686cc SOHC",
    weight: "310 кг",
    images: JSON.stringify([
      "/images/atvs/atv-1.jpg",
    ]),
    featured: true,
  },
  {
    name: "Honda FourTrax Rancher",
    slug: "honda-fourtrax-rancher",
    description:
      "Honda FourTrax Rancher е надеждно АТВ с 420cc двигател, подходящо за ежедневна работа и отдих. Познато за своята издръжливост и ниска поддръжка.",
    price: 18500,
    category: "ATV",
    brand: "Honda",
    year: 2023,
    horsepower: "27 к.с.",
    engine: "420cc OHV",
    weight: "265 кг",
    images: JSON.stringify([
      "/images/atvs/atv-2.jpg",
    ]),
    featured: false,
  },
  {
    name: "CF Moto CForce 600",
    slug: "cf-moto-cforce-600",
    description:
      "CF Moto CForce 600 предлага отлично съотношение цена-качество с 580cc двигател, електроусилвател на волана и модерен дизайн.",
    price: 15500,
    category: "ATV",
    brand: "CF Moto",
    year: 2024,
    horsepower: "41 к.с.",
    engine: "580cc SOHC",
    weight: "305 кг",
    images: JSON.stringify([
      "/images/atvs/atv-1.jpg",
      "/images/atvs/atv-2.jpg",
    ]),
    featured: false,
  },
  {
    name: "Suzuki KingQuad 500",
    slug: "suzuki-kingquad-500",
    description:
      "Suzuki KingQuad 500 AXi е утвърден модел с 493cc двигател с впръскване на горивото, независимо окачване и автоматична трансмисия.",
    price: 20000,
    category: "ATV",
    brand: "Suzuki",
    year: 2023,
    horsepower: "35 к.с.",
    engine: "493cc DOHC",
    weight: "290 кг",
    images: JSON.stringify([
      "/images/atvs/atv-2.jpg",
      "/images/atvs/atv-1.jpg",
    ]),
    featured: false,
  },
];

const siteContentDefaults: Record<string, string> = {
  contact_address: "гр. София, бул. Цариградско шосе 100",
  contact_phone: "+359 888 123 456",
  contact_email: "info@petralgroup.bg",
  contact_hours: "Понеделник - Петък: 09:00 - 18:00\nСъбота: 10:00 - 14:00\nНеделя: Затворено",
  hero_title: "Качествена техника за земеделие и отдих",
  hero_subtitle: "PetralGroup е вашият доверен партньор за продажба на трактори и АТВ-та. Предлагаме широка гама техника с гарантирано качество.",
  about_title: "PetralGroup - Вашият доверен партньор",
  about_text1: "PetralGroup е водеща компания в продажбата на трактори и АТВ-та в България. С дългогодишен опит в бранша, ние предлагаме широка гама от качествена техника за земеделие и отдих.",
  about_text2: "Нашата мисия е да предоставим на нашите клиенти най-доброто съотношение цена-качество, съчетано с професионално обслужване и поддръжка.",
  about_text3: "Работим с утвърдени световни марки и гарантираме качеството на всеки продукт, който предлагаме. Нашият екип от специалисти е винаги готов да ви помогне да изберете правилната техника за вашите нужди.",
  about_value1_title: "Клиентът на първо място",
  about_value1_text: "Всеки клиент е важен за нас. Отделяме време да разберем нуждите ви и да предложим най-подходящото решение.",
  about_value2_title: "Надеждност",
  about_value2_text: "Предлагаме само проверена и сертифицирана техника, в която можете да имате пълно доверие.",
  about_value3_title: "Иновация",
  about_value3_text: "Следим последните тенденции в техниката и постоянно обновяваме нашата гама с модерни модели.",
  feature1_title: "Гарантирано качество",
  feature1_text: "Всички наши продукти са внимателно подбрани и проверени.",
  feature2_title: "Конкурентни цени",
  feature2_text: "Предлагаме най-добрите цени на пазара с гъвкави условия.",
  feature3_title: "Сервиз и поддръжка",
  feature3_text: "Пълно сервизно обслужване и поддръжка на техниката.",
  company_description: "Вашият доверен партньор за трактори и АТВ-та. Качествена техника за земеделие и отдих.",
  color_primary: "#1B5E20",
  color_primary_light: "#2E7D32",
  color_primary_dark: "#0D3B12",
};

async function main() {
  const existingProducts = await prisma.product.count();

  if (existingProducts > 0) {
    console.log(`Database already has ${existingProducts} products. Skipping seed.`);
  } else {
    console.log("Seeding database...");

    for (const product of products) {
      await prisma.product.create({ data: product });
    }

    console.log(`Seeded ${products.length} products.`);
  }

  // Site content — upsert only creates missing keys, never overwrites existing
  let created = 0;
  for (const [key, value] of Object.entries(siteContentDefaults)) {
    const existing = await prisma.siteContent.findUnique({ where: { key } });
    if (!existing) {
      await prisma.siteContent.create({ data: { key, value } });
      created++;
    }
  }

  if (created > 0) {
    console.log(`Created ${created} missing content entries.`);
  } else {
    console.log("All content entries already exist. Skipping.");
  }

  // Default admin
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: "admin" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("petral2024", 10);
    await prisma.admin.create({
      data: {
        username: "admin",
        password: hashedPassword,
        name: "Администратор",
      },
    });
    console.log("Created default admin (admin / petral2024).");
  } else {
    console.log("Default admin already exists. Skipping.");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
