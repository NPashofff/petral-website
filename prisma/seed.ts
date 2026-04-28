import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const siteContentDefaults: Record<string, string> = {
  contact_address: "3400 Монтана, Сланището 555",
  contact_phone: "+359 884 02 74 34",
  contact_email: "petralgroup@abv.bg",
  contact_hours: "Понеделник - Петък: 08:30 - 17:30",
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

const defaultColors: { name: string; hex: string; order: number }[] = [
  { name: "Черен", hex: "#000000", order: 1 },
  { name: "Бял", hex: "#FFFFFF", order: 2 },
  { name: "Червен", hex: "#D32F2F", order: 3 },
  { name: "Зелен", hex: "#2E7D32", order: 4 },
  { name: "Син", hex: "#1976D2", order: 5 },
  { name: "Сив", hex: "#757575", order: 6 },
  { name: "Жълт", hex: "#FBC02D", order: 7 },
];

async function main() {
  // Site content — upsert only creates missing keys, never overwrites existing
  let createdContent = 0;
  for (const [key, value] of Object.entries(siteContentDefaults)) {
    const existing = await prisma.siteContent.findUnique({ where: { key } });
    if (!existing) {
      await prisma.siteContent.create({ data: { key, value } });
      createdContent++;
    }
  }
  console.log(
    createdContent > 0
      ? `Created ${createdContent} missing content entries.`
      : "All content entries already exist."
  );

  // Default color palette — only seed if the palette is empty
  const existingColors = await prisma.color.count();
  if (existingColors === 0) {
    for (const color of defaultColors) {
      await prisma.color.create({ data: color });
    }
    console.log(`Seeded ${defaultColors.length} default colors.`);
  } else {
    console.log(`Colors already exist (${existingColors}). Skipping palette seed.`);
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
