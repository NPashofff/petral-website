import Link from "next/link";
import { getContentMap } from "@/lib/content";

export default async function Footer() {
  const content = await getContentMap([
    "contact_address",
    "contact_phone",
    "contact_email",
    "contact_hours",
    "company_description",
  ]);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              Petral<span className="text-green-400">Group</span>
            </h3>
            <p className="text-sm leading-relaxed">
              {content.company_description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Бързи връзки</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link></li>
              <li><Link href="/catalog?category=TRACTOR" className="hover:text-white transition-colors">Трактори</Link></li>
              <li><Link href="/catalog?category=ATV" className="hover:text-white transition-colors">АТВ-та</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">За нас</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Контакти</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Контакти</h4>
            <ul className="space-y-2 text-sm">
              <li>📍 {content.contact_address}</li>
              <li>📞 {content.contact_phone}</li>
              <li>✉️ {content.contact_email}</li>
              <li>🕐 {content.contact_hours.split("\n")[0]}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PetralGroup. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
}
