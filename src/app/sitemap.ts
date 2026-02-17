import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    select: { id: true, createdAt: true },
  });

  const productUrls = products.map((product) => ({
    url: `https://petralgroup.bg/catalog/${product.id}`,
    lastModified: product.createdAt,
  }));

  return [
    {
      url: "https://petralgroup.bg",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "https://petralgroup.bg/catalog",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: "https://petralgroup.bg/about",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://petralgroup.bg/contact",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...productUrls,
  ];
}
