import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db";
import { getContentMap } from "@/lib/content";

export default async function HomePage() {
  const [featuredProducts, content] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    getContentMap([
      "feature1_title", "feature1_text",
      "feature2_title", "feature2_text",
      "feature3_title", "feature3_text",
    ]),
  ]);

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Нашите категории
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/catalog?category=TRACTOR"
              className="group relative rounded-2xl overflow-hidden h-64 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/tractors/tractor-1.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <h3 className="text-3xl font-bold">Трактори</h3>
                <p className="mt-2 text-gray-200">Разгледай всички модели</p>
              </div>
            </Link>
            <Link
              href="/catalog?category=ATV"
              className="group relative rounded-2xl overflow-hidden h-64 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/atvs/atv-1.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <h3 className="text-3xl font-bold">АТВ-та</h3>
                <p className="mt-2 text-gray-200">Разгледай всички модели</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Представени продукти
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/catalog"
                className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Виж целия каталог
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About snippet */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Защо PetralGroup?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">{content.feature1_title}</h3>
              <p className="text-gray-600">{content.feature1_text}</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">{content.feature2_title}</h3>
              <p className="text-gray-600">{content.feature2_text}</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">{content.feature3_title}</h3>
              <p className="text-gray-600">{content.feature3_text}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
