"use client";

import { useState } from "react";
import Link from "next/link";
import Toast from "@/components/Toast";

type ImportResult = {
  brand: string;
  created: number;
  updated: number;
  skipped: number;
  errors: { row: number; name: string; reason: string }[];
};

export default function OilsImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/oils/import", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setToast({ message: data.error || "Грешка при импорт.", type: "error" });
      } else {
        setResult(data);
        setToast({
          message: `Готово: ${data.created} нови, ${data.updated} обновени.`,
          type: "success",
        });
      }
    } catch {
      setToast({ message: "Мрежова грешка.", type: "error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Импорт на масла от Excel</h1>
        <Link href="/admin/products" className="text-sm text-gray-600 hover:text-gray-900">
          ← Към продуктите
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excel файл (.xlsx)
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="text-xs text-gray-500 mt-2">
              Марката се извлича от името на файла. Очаквана структура: колона A — име,
              колона B — клиентска цена в лв/л без ДДС (автоматично се конвертира в евро).
              Вискозитет и опаковка се извличат автоматично от името на всеки ред.
            </p>
          </div>

          <button
            type="submit"
            disabled={!file || busy}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium px-6 py-2 rounded-lg"
          >
            {busy ? "Импортиране..." : "Импортирай"}
          </button>
        </form>

        {result && (
          <div className="mt-6 border-t pt-6">
            <h2 className="font-semibold text-gray-900 mb-3">Резултат</h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <dt className="text-gray-600">Марка</dt>
              <dd className="font-medium">{result.brand}</dd>
              <dt className="text-gray-600">Нови продукти</dt>
              <dd className="font-medium text-green-700">{result.created}</dd>
              <dt className="text-gray-600">Обновени</dt>
              <dd className="font-medium text-blue-700">{result.updated}</dd>
              <dt className="text-gray-600">Пропуснати</dt>
              <dd className="font-medium text-gray-700">{result.skipped}</dd>
              <dt className="text-gray-600">Грешки</dt>
              <dd className="font-medium text-red-700">{result.errors.length}</dd>
            </dl>

            {result.errors.length > 0 && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-red-700">
                  Покажи грешките
                </summary>
                <ul className="mt-2 text-xs text-gray-700 space-y-1 max-h-60 overflow-auto">
                  {result.errors.map((err, i) => (
                    <li key={i} className="font-mono">
                      ред {err.row}: {err.name} — {err.reason}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
