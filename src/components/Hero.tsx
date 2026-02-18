import Link from "next/link";
import Image from "next/image";
import { getContentMap } from "@/lib/content";

export default async function Hero() {
  const content = await getContentMap(["hero_title", "hero_subtitle"]);

  return (
    <section className="relative bg-[var(--color-primary-dark)] text-white">
      <div className="relative min-h-[500px] lg:min-h-[600px] flex items-center">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl">
            {content.hero_title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl">
            {content.hero_subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Разгледай каталога
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Свържете се с нас
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
