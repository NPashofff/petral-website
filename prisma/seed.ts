import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  // ═══════════════════════════════════════
  // TYM Трактори
  // ═══════════════════════════════════════
  {
    name: "Трактор TYM T1025",
    slug: "tym-t1025",
    description:
      "Трактор TYM T1025 – субкомпактен трактор от Серия 1, доказателство че наистина големи неща могат да се съдържат в малки опаковки. Оборудван с японски двигател Yanmar с висок въртящ момент, 2-диапазонна HST трансмисия и ергономични контроли. Идеален за озеленяване, градинарство и поддръжка около дома.",
    price: 0,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "25 к.с.",
    engine: "Yanmar 3TNV76-UD, 1116 куб.см",
    weight: "768 кг",
    images: JSON.stringify([
      "/images/products/tym-t1025/tym-t1025-front-loader.png",
      "/images/products/tym-t1025/tym-t1025-rear.png",
      "/images/products/tym-t1025/tym-t1025-quarter-front.png",
    ]),
    featured: true,
  },
  {
    name: "Трактор TYM T2025P",
    slug: "tym-t2025p",
    description:
      "Трактор TYM T2025P – субкомпактен трактор от Серия 2, създаден за производителност във всяко отношение. Оборудван с Bluetooth колонка, безжично зарядно за смартфон, USB портове и комфортна седалка с тежкотоварно механично окачване. Сгъваема ROPS конструкция с модулна система за светлини.",
    price: 0,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "25 к.с.",
    engine: "Yanmar 3TNV80F-NXD, 1267 куб.см",
    weight: "853 кг",
    images: JSON.stringify([
      "/images/products/tym-t2025p/tym-t2025p-front-loader.png",
      "/images/products/tym-t2025p/tym-t2025p-side.png",
      "/images/products/tym-t2025p/tym-t2025p-quarter-front.png",
    ]),
    featured: true,
  },
  {
    name: "Трактор TYM T3048",
    slug: "tym-t3048",
    description:
      "Трактор TYM T3048 – компактен трактор от Серия 3, предлагащ перфектен баланс между маневреност и мощност. Екологичен 4-цилиндров двигател TYM, Stage V сертификат, LED работни светлини, блокиране на диференциала и 52° ъгъл на завиване. Идеален за градини, лозя, строителство и снегопочистване.",
    price: 0,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "48 к.с.",
    engine: "TYM T2300N2, 2287 куб.см",
    weight: "1464 – 1636 кг",
    images: JSON.stringify([
      "/images/products/tym-t3048/tym-t3048-front-loader.png",
      "/images/products/tym-t3048/tym-t3048-rear.png",
      "/images/products/tym-t3048/tym-t3048-quarter-front.png",
    ]),
    featured: true,
  },
  {
    name: "Трактор TYM T5068",
    slug: "tym-t5068",
    description:
      "Трактор TYM T5068 – универсален трактор от Серия 5, обединяващ най-новите технологии. Немски двигател Deutz Stage V, електронна хидравлична система BOSCH, 4-секционни задни хидравлични клапани, безжично зарядно, комфортна седалка с окачване. Подходящ за животновъдство, горско стопанство, работа с материали и озеленяване.",
    price: 0,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "67 к.с.",
    engine: "Deutz TCD2.9L4, 2925 куб.см",
    weight: "2595 – 2851 кг",
    images: JSON.stringify([
      "/images/products/tym-t5068/tym-t5068-front-loader.png",
      "/images/products/tym-t5068/tym-t5068-side-loader.png",
      "/images/products/tym-t5068/tym-t5068-quarter-front.png",
    ]),
    featured: false,
  },
  {
    name: "Трактор TYM T5075",
    slug: "tym-t5075",
    description:
      "Трактор TYM T5075 – универсален трактор от Серия 5 с 74 к.с. Немски двигател Deutz Stage V, комфортна седалка с окачване, 4-секционни задни хидравлични клапани и сенник. Вашият универсален помощник за животновъдство, горско стопанство и озеленяване.",
    price: 0,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "74 к.с.",
    engine: "Deutz TCD2.9L4, 2925 куб.см",
    weight: "2835 – 3091 кг",
    images: JSON.stringify([
      "/images/products/tym-t5075/tym-t5075-front-loader.png",
      "/images/products/tym-t5075/tym-t5075-quarter-front.png",
      "/images/products/tym-t5075/tym-t5075-action-field.jpg",
    ]),
    featured: false,
  },
  {
    name: "Трактор TYM T6115",
    slug: "tym-t6115",
    description:
      "Трактор TYM T6115 – мощен универсален трактор от Серия 6 с 111 к.с. Двигател Deutz TCD 3.6 Common Rail с електрохидравлична система BOSCH. Премиум кабина с панорамни гледки, седалка с въздушно окачване, 10.1\" сензорен монитор, смарт ключ с дистанционно стартиране, пълно LED осветление и задна камера.",
    price: 0,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "111 к.с.",
    engine: "Deutz TCD 3.6 L4, 3621 куб.см",
    weight: "4130 кг",
    images: JSON.stringify([
      "/images/products/tym-t6115/tym-t6115-front.png",
      "/images/products/tym-t6115/tym-t6115-rear.png",
      "/images/products/tym-t6115/tym-t6115-quarter-front.png",
    ]),
    featured: true,
  },
  {
    name: "Трактор TYM T6130",
    slug: "tym-t6130",
    description:
      "Трактор TYM T6130 – флагманът на TYM, премиум универсален трактор от Серия 6 с 127 к.с. Двигател Deutz TCD 3.6 Common Rail, 10.1\" сензорен монитор с Bluetooth, седалка с въздушно окачване, смарт ключ, навесна система с товароносимост 3747 кг. Резервоар 190 литра и F36xR36 предавки. Създаден за растениевъдство, строителство, горско стопанство и транспортиране на материали.",
    price: 0,
    category: "TRACTOR",
    brand: "TYM",
    year: 2025,
    horsepower: "127 к.с.",
    engine: "Deutz TCD 3.6 L4, 3621 куб.см",
    weight: "4470 кг",
    images: JSON.stringify([
      "/images/products/tym-t6130/tym-t6130-front.png",
      "/images/products/tym-t6130/tym-t6130-rear.png",
      "/images/products/tym-t6130/tym-t6130-quarter-front.png",
      "/images/products/tym-t6130/tym-t6130-action-field.jpg",
    ]),
    featured: true,
  },

  // ═══════════════════════════════════════
  // ATV-та
  // ═══════════════════════════════════════
  {
    name: "ATV Hisun Guardian 400",
    slug: "hisun-guardian-400",
    description:
      "Hisun Guardian 400 е многофункционален ATV с мощен 400 cc двигател и 4×4 задвижване. Оборудван с 7\" LCD дисплей, пълни LED светлини, алуминиеви джанти, предна и задна блокировка, преден и заден теглич, защита на долната част и протектори за ръцете. Макс. скорост 60 км/ч.",
    price: 11481,
    category: "ATV",
    brand: "Hisun",
    year: 2025,
    horsepower: "28 к.с. (23 kW)",
    engine: "400 куб.см, едноцилиндров, 4-тактов, SOHC, EFI",
    weight: "448 кг",
    images: JSON.stringify([
      "/images/products/hisun-guardian-400/hisun-guardian-400-quarter-front.png",
      "/images/products/hisun-guardian-400/hisun-guardian-400-quarter-front-camo.png",
      "/images/products/hisun-guardian-400/hisun-guardian-400-quarter-front-camo-dark.png",
    ]),
    featured: true,
  },
  {
    name: "ATV Hisun Guardian 750",
    slug: "hisun-guardian-750",
    description:
      "Hisun Guardian 750 е ултрамодерен ATV с мощен 750 cc двигател и 4×4 задвижване. Оборудван с 7\" TFT цветен дисплей, система без ключ, EPS серво управление, лебедка 2500 lbs, облегалка за пътника, отопление, въздушно окачване и жироскоп. Горски камуфлаж.",
    price: 15510,
    category: "ATV",
    brand: "Hisun",
    year: 2025,
    horsepower: "44 к.с. (32 kW)",
    engine: "750 куб.см, едноцилиндров, 4-тактов, SOHC, EFI",
    weight: "448 кг",
    images: JSON.stringify([
      "/images/products/hisun-guardian-750/hisun-guardian-750-quarter-front-green.png",
      "/images/products/hisun-guardian-750/hisun-guardian-750-quarter-front-camo.png",
      "/images/products/hisun-guardian-750/hisun-guardian-750-quarter-front-black.png",
    ]),
    featured: true,
  },
  {
    name: "ATV Hisun Guardian 750L",
    slug: "hisun-guardian-750l",
    description:
      "Hisun Guardian 750L е надежден работен ATV с удължена база, 750 cc EFI двигател и 4×4 задвижване. Оборудван с 7\" TFT дисплей, EPS, лебедка 2500 lbs и сензор за налягане в гумите. Подходящ за селско и горско стопанство и професионален офроуд.",
    price: 15578,
    category: "ATV",
    brand: "Hisun",
    year: 2025,
    horsepower: "44 к.с. (32 kW)",
    engine: "750 куб.см, едноцилиндров, 4-тактов, SOHC, EFI",
    weight: "452 кг",
    images: JSON.stringify([
      "/images/products/hisun-guardian-750l/hisun-guardian-750l-quarter-front.png",
    ]),
    featured: false,
  },
  {
    name: "ATV Linhai F320",
    slug: "linhai-f320",
    description:
      "Linhai F320 е многофункционален ATV с 275 cc водноохлаждан двигател и 2WD/4WD задвижване. Фабрично оборудван с лебедка, теглич, алуминиеви джанти и облегалка за пътника. Идеален за стопанска работа, лов, риболов и офроуд разходки.",
    price: 9828,
    category: "ATV",
    brand: "Linhai",
    year: 2025,
    horsepower: "21.4 к.с. (16 kW)",
    engine: "LH173MN, 275 куб.см, водно охлаждане, EFI",
    weight: "295 кг",
    images: JSON.stringify([
      "/images/products/linhai-f320/linhai-f320-quarter-front-grey.png",
      "/images/products/linhai-f320/linhai-f320-quarter-front-tan.png",
    ]),
    featured: false,
  },
  {
    name: "ATV Linhai M210",
    slug: "linhai-m210",
    description:
      "Linhai M210 е компактен и лек ATV с 177 cc EFI двигател, предназначен за начинаещи и любители на офроуд. Оборудван с теглич, алуминиеви джанти и облегалка за пътника. Достъпна цена за навлизане в офроуд света.",
    price: 6259,
    category: "ATV",
    brand: "Linhai",
    year: 2025,
    horsepower: "11.3 к.с. (8.4 kW)",
    engine: "LH1P63FMK-2, 177 куб.см, въздушно охлаждане, EFI",
    weight: "189 кг",
    images: JSON.stringify([
      "/images/products/linhai-m210/linhai-m210-quarter-front-red.png",
      "/images/products/linhai-m210/linhai-m210-quarter-front-tan.png",
    ]),
    featured: false,
  },
  {
    name: "ATV Linhai Promax 550",
    slug: "linhai-promax-550",
    description:
      "Linhai Promax 550 е мощен ATV с 499.5 cc EFI двигател, EPS, матрични Full-LED фарове и канадска CVTech трансмисия. С 18.7% по-висока мощност спрямо предходните модели. Фабрична лебедка и 2WD/4WD с блокировка на преден диференциал.",
    price: 11862,
    category: "ATV",
    brand: "Linhai",
    year: 2025,
    horsepower: "38.8 к.с. (28.5 kW)",
    engine: "499.5 куб.см, едноцилиндров, SOHC, водно охлаждане, EFI",
    weight: "371 кг",
    images: JSON.stringify([
      "/images/products/linhai-promax-550/linhai-promax-550-quarter-front.png",
    ]),
    featured: false,
  },
  {
    name: "ATV Linhai Promax 650L",
    slug: "linhai-promax-650l",
    description:
      "Linhai Promax 650L е флагманът на серията PROMAX с 585 cc двигател и удължена база за максимална стабилност. Оборудван с EPS, лебедка, теглич и блокировка на диференциала. Предназначен за екстремни офроуд условия и професионална употреба.",
    price: 14170,
    category: "ATV",
    brand: "Linhai",
    year: 2025,
    horsepower: "38.8 к.с.",
    engine: "LH191MS, 585 куб.см, водно охлаждане, EFI",
    weight: "395 кг",
    images: JSON.stringify([
      "/images/products/linhai-promax-650l/linhai-promax-650l-quarter-front.png",
    ]),
    featured: true,
  },
  {
    name: "UTV Hisun Sector 550",
    slug: "hisun-sector-550",
    description:
      "Hisun Sector 550 е многофункционален UTV (Side-by-Side) с 546 cc EFI двигател и 4WD задвижване. Стандартно включва покрив, поликарбонатно предно стъкло, лебедка 1680 кг, EPS, алуминиеви джанти и голяма товарна площ. Подходящ за земеделие и работа сред природата.",
    price: 19979,
    category: "ATV",
    brand: "Hisun",
    year: 2025,
    horsepower: "29.9 к.с. (22 kW)",
    engine: "546 куб.см, едноцилиндров, 4-тактов, SOHC, EFI",
    weight: "743 кг",
    images: JSON.stringify([
      "/images/products/hisun-sector-550/hisun-sector-550-quarter-front.png",
      "/images/products/hisun-sector-550/hisun-sector-550-side-action.jpg",
      "/images/products/hisun-sector-550/hisun-sector-550-rear-action.jpg",
    ]),
    featured: false,
  },
  {
    name: "UTV Hisun Strike 250",
    slug: "hisun-strike-250",
    description:
      "Hisun Strike 250 е компактен Side-by-Side UTV с 229 cc EFI двигател, предназначен за млади ентусиасти и начинаещи водачи. Стандартно оборудван с покрив, предно стъкло, врати и лебедка. Идеален за работа около двора и леко офроуд.",
    price: 10649,
    category: "ATV",
    brand: "Hisun",
    year: 2025,
    horsepower: "16.3 к.с. (12 kW)",
    engine: "229 куб.см, едноцилиндров, 4-тактов, SOHC, EFI",
    weight: "402 кг",
    images: JSON.stringify([
      "/images/products/hisun-strike-250/hisun-strike-250-quarter-front.png",
    ]),
    featured: false,
  },
  {
    name: "UTV Linhai LH 1100 U-Diesel",
    slug: "linhai-lh1100-diesel",
    description:
      "Linhai LH 1100 U-Diesel е тежкотоварен работен UTV с японски 3-цилиндров дизелов двигател Kubota 1123 cc, осигуряващ висок въртящ момент от 71.5 Nm. Задният товарен отсек (1470 x 1020 мм) побира стандартен европалет. Машина за тежка работа в индустриални и аграрни условия.",
    price: 30159,
    category: "ATV",
    brand: "Linhai",
    year: 2025,
    horsepower: "25.2 к.с. (18.5 kW)",
    engine: "Kubota Diesel, 1123 куб.см, 3-цилиндров, течно охлаждане",
    weight: "882 кг",
    images: JSON.stringify([
      "/images/products/linhai-lh1100-diesel/linhai-lh1100-diesel-quarter-front.png",
    ]),
    featured: true,
  },
  {
    name: "UTV Linhai T-Boss 570",
    slug: "linhai-t-boss-570",
    description:
      "Linhai T-Boss 570 е мощен работен UTV с 499.5 cc EFI двигател и канадска CVTech трансмисия. Оборудван с EPS, самосвален товарен отсек с товароносимост 300 кг, лебедка и теглич. Подходящ за стопанства, ловни територии и офроуд експедиции.",
    price: 18854,
    category: "ATV",
    brand: "Linhai",
    year: 2025,
    horsepower: "38.2 к.с. (28.5 kW)",
    engine: "LH191MR-C, 499.5 куб.см, течно охлаждане, EFI",
    weight: "540 кг",
    images: JSON.stringify([
      "/images/products/linhai-t-boss-570/linhai-t-boss-570-quarter-front.png",
    ]),
    featured: false,
  },
];

const siteContentDefaults: Record<string, string> = {
  contact_address: "1588 София, Софийски околовръстен път 459",
  contact_phone: "+359 878 209 939",
  contact_email: "info@petral.bg",
  contact_hours:
    "Понеделник - Петък: 09:00 - 18:00\nСъбота: 10:00 - 14:00\nНеделя: Затворено",
  hero_title: "Качествена техника за земеделие и отдих",
  hero_subtitle:
    "Петрал Груп е вашият доверен партньор за продажба на трактори TYM и ATV/UTV. Предлагаме широка гама техника с гарантирано качество и сервизно обслужване.",
  about_title: "Петрал Груп - Вашият доверен партньор",
  about_text1:
    "Петрал Груп е водеща компания в продажбата на трактори TYM и ATV/UTV в България. Предлагаме иновативни решения с машини, интегриращи най-новите технологични постижения в сектора.",
  about_text2:
    "Нашата мисия е да предоставим разнообразие от продукти – богат избор от трактори и инвентар, подходящи за всякакви земеделски задачи и терени, с най-добро съотношение между цена и качество.",
  about_text3:
    "Работим с утвърдени световни марки – TYM, Hisun, Linhai – и гарантираме качеството на всеки продукт. Нашият екип от специалисти е винаги готов да ви помогне да изберете правилната техника за вашите нужди.",
  about_value1_title: "Клиентът на първо място",
  about_value1_text:
    "Всеки клиент е важен за нас. Отделяме време да разберем нуждите ви и да предложим най-подходящото решение.",
  about_value2_title: "Гарантирано качество",
  about_value2_text:
    "Предлагаме машини, известни със своята здравина и дългогодишна ефективна работа.",
  about_value3_title: "Сервиз и поддръжка",
  about_value3_text:
    "Професионално сервизно обслужване, оригинални резервни части и гаранционен сервиз.",
  feature1_title: "Продажба на трактори и агротехника",
  feature1_text:
    "Нашите машини са проектирани да отговарят на вашите специфични изисквания.",
  feature2_title: "Резервни части",
  feature2_text:
    "Оригинални и качествени резервни части. Всичко за поддръжката на вашите машини.",
  feature3_title: "Гаранционен сервиз",
  feature3_text:
    "Професионално сервизно обслужване в гаранционен срок.",
  company_description:
    "Вашият доверен партньор за трактори TYM и ATV/UTV. Качествена техника за земеделие и отдих.",
  color_primary: "#1B5E20",
  color_primary_light: "#2E7D32",
  color_primary_dark: "#0D3B12",
};

async function main() {
  const existingProducts = await prisma.product.count();

  if (existingProducts > 0) {
    console.log(
      `Database already has ${existingProducts} products. Skipping seed.`
    );
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
