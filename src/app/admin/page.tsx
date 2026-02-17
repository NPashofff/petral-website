import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [productCount, inquiryCount, contactCount] = await Promise.all([
    prisma.product.count(),
    prisma.inquiry.count(),
    prisma.contact.count(),
  ]);

  const stats = [
    { label: "Продукти", value: productCount, href: "/admin/products", color: "bg-green-500" },
    { label: "Запитвания", value: inquiryCount, href: "/admin/inquiries", color: "bg-blue-500" },
    { label: "Съобщения", value: contactCount, href: "/admin/contacts", color: "bg-orange-500" },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Табло</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4`}>
              {stat.value}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{stat.label}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}
