import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { absoluteUrl } from "@/lib/site";

// #28: kept dynamic on purpose — the sitemap enumerates every visible product
// straight from the DB and isn't wired into the product revalidation paths, so
// it must be regenerated per request to stay accurate for crawlers.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    where: { hidden: false },
    select: { id: true, createdAt: true },
  });

  const productUrls = products.map((product) => ({
    url: absoluteUrl(`/catalog/${product.id}`),
    lastModified: product.createdAt,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: absoluteUrl("/catalog"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...productUrls,
  ];
}
