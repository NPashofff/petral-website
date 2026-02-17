"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const adminLinks = [
  { href: "/admin", label: "Табло" },
  { href: "/admin/products", label: "Продукти" },
  { href: "/admin/inquiries", label: "Запитвания" },
  { href: "/admin/contacts", label: "Съобщения" },
  { href: "/admin/content", label: "Съдържание" },
  { href: "/admin/admins", label: "Админи" },
  { href: "/admin/settings", label: "Настройки" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-8">
            <Link href="/admin" className="font-bold text-lg">
              Petral<span className="text-green-400">Admin</span>
            </Link>
            <div className="flex gap-6 text-sm">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-green-300 transition-colors ${
                    pathname === link.href ? "text-green-400" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                Към сайта
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                {loggingOut ? "Излизане..." : "Изход"}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
