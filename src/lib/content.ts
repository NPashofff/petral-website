import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";

export const defaultContent: Record<string, string> = {
  // Контакти
  contact_address: "3400 Монтана, Сланището 555",
  contact_phone: "+359 884 02 74 34",
  contact_email: "petralgroup@abv.bg",
  contact_hours: "Понеделник - Петък: 08:30 - 17:30",
  contact_lat: "",
  contact_lon: "",

  // Hero секция
  hero_title: "Качествена техника за земеделие и отдих",
  hero_subtitle:
    "Петрал Груп е вашият доверен партньор за продажба на трактори и ATV. Предлагаме широка гама техника с гарантирано качество.",

  // За нас
  about_title: "Петрал Груп - Вашият доверен партньор",
  about_text1:
    "Петрал Груп е водеща компания в продажбата на трактори и ATV в България. С дългогодишен опит в бранша, ние предлагаме широка гама от качествена техника за земеделие и отдих.",
  about_text2:
    "Нашата мисия е да предоставим на нашите клиенти най-доброто съотношение цена-качество, съчетано с професионално обслужване и поддръжка.",
  about_text3:
    "Работим с утвърдени световни марки и гарантираме качеството на всеки продукт, който предлагаме. Нашият екип от специалисти е винаги готов да ви помогне да изберете правилната техника за вашите нужди.",
  about_value1_title: "Клиентът на първо място",
  about_value1_text:
    "Всеки клиент е важен за нас. Отделяме време да разберем нуждите ви и да предложим най-подходящото решение.",
  about_value2_title: "Надеждност",
  about_value2_text:
    "Предлагаме само проверена и сертифицирана техника, в която можете да имате пълно доверие.",
  about_value3_title: "Иновация",
  about_value3_text:
    "Следим последните тенденции в техниката и постоянно обновяваме нашата гама с модерни модели.",

  // Защо Петрал Груп
  feature1_title: "Гарантирано качество",
  feature1_text: "Всички наши продукти са внимателно подбрани и проверени.",
  feature2_title: "Конкурентни цени",
  feature2_text:
    "Предлагаме най-добрите цени на пазара с гъвкави условия.",
  feature3_title: "Сервиз и поддръжка",
  feature3_text: "Пълно сервизно обслужване и поддръжка на техниката.",

  // Обща информация
  company_description:
    "Вашият доверен партньор за трактори и ATV. Качествена техника за земеделие и отдих.",

  // Цветове
  color_primary: "#1B5E20",
  color_primary_light: "#2E7D32",
  color_primary_dark: "#0D3B12",
};

export async function getContentMap(keys: string[]): Promise<Record<string, string>> {
  noStore();
  const rows = await prisma.siteContent.findMany({
    where: { key: { in: keys } },
  });

  const map: Record<string, string> = {};
  for (const key of keys) {
    const row = rows.find((r) => r.key === key);
    map[key] = row?.value ?? defaultContent[key] ?? "";
  }
  return map;
}

export async function getAllContent(): Promise<Record<string, string>> {
  noStore();
  const rows = await prisma.siteContent.findMany();
  const map: Record<string, string> = { ...defaultContent };
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return map;
}
