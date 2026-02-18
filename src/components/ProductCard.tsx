import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  brand: string;
  year: number;
  images: string;
}

export default function ProductCard({
  id,
  name,
  price,
  category,
  brand,
  year,
  images,
}: ProductCardProps) {
  const imageList: string[] = JSON.parse(images);
  const firstImage = imageList[0] || "/images/placeholder.jpg";

  return (
    <Link href={`/catalog/${id}`} className="group block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={firstImage}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                category === "TRACTOR"
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {category === "TRACTOR" ? "Трактор" : "АТВ"}
            </span>
            <span className="text-xs text-gray-500">{year}</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[var(--color-primary)] transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{brand}</p>
          <p className="text-xl font-bold text-[var(--color-primary)] mt-2">
            {price.toLocaleString("bg-BG")} лв.
          </p>
        </div>
      </div>
    </Link>
  );
}
