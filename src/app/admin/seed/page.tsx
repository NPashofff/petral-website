"use client";

import { useState } from "react";
import { seedProducts } from "@/lib/seed-data";

export default function SeedPage() {
  const [mode, setMode] = useState<"keep" | "clear">("keep");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const tractors = seedProducts.filter((p) => p.category === "TRACTOR");
  const atvs = seedProducts.filter((p) => p.category === "ATV");
  const utvs = seedProducts.filter((p) => p.category === "UTV");

  async function handleSeed() {
    if (mode === "clear") {
      const confirmed = window.confirm(
        "⚠️ Това ще изтрие ВСИЧКИ съществуващи продукти и запитвания!\n\nСигурен ли си?"
      );
      if (!confirmed) return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Мрежова грешка." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Посяване на продукти</h1>
      <p className="text-gray-500 mb-8">
        Добавя {seedProducts.length} продукта от soland.bg в базата данни.
      </p>

      {/* Product summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-3xl font-bold text-green-700">{tractors.length}</div>
          <div className="text-sm text-gray-500 mt-1">Трактори TYM</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-3xl font-bold text-green-700">{atvs.length}</div>
          <div className="text-sm text-gray-500 mt-1">АТВ (Hisun / Linhai)</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-3xl font-bold text-green-700">{utvs.length}</div>
          <div className="text-sm text-gray-500 mt-1">UTV (Hisun / Linhai)</div>
        </div>
      </div>

      {/* Mode selector */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Режим на посяване</h2>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="keep"
              checked={mode === "keep"}
              onChange={() => setMode("keep")}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-900">Добави (без изтриване)</div>
              <div className="text-sm text-gray-500">
                Добавя само продуктите, които не съществуват. Съществуващите продукти се запазват непроменени.
              </div>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="clear"
              checked={mode === "clear"}
              onChange={() => setMode("clear")}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-red-700">Изтрий всичко и посей наново</div>
              <div className="text-sm text-gray-500">
                ⚠️ Изтрива ВСИЧКИ продукти и запитвания, след което добавя продуктите наново. Внимавай!
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={handleSeed}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-colors ${
          mode === "clear"
            ? "bg-red-600 hover:bg-red-700 disabled:bg-red-300"
            : "bg-green-600 hover:bg-green-700 disabled:bg-green-300"
        }`}
      >
        {loading
          ? "Посяване..."
          : mode === "clear"
          ? `🗑️ Изтрий всичко и добави ${seedProducts.length} продукта`
          : `➕ Добави нови продукти (${seedProducts.length} налични)`}
      </button>

      {/* Result */}
      {result && (
        <div
          className={`mt-4 p-4 rounded-xl ${
            result.success
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {result.message || result.error}
        </div>
      )}

      {/* Product list preview */}
      <div className="mt-10">
        <h2 className="font-semibold text-gray-900 mb-4">Продукти за посяване</h2>
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Продукт</th>
                <th className="text-left px-4 py-3 font-medium">Категория</th>
                <th className="text-left px-4 py-3 font-medium">Марка</th>
                <th className="text-left px-4 py-3 font-medium">Мощност</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {seedProducts.map((p) => (
                <tr key={p.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      p.category === "TRACTOR" ? "bg-yellow-100 text-yellow-800" :
                      p.category === "ATV" ? "bg-blue-100 text-blue-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.brand}</td>
                  <td className="px-4 py-3 text-gray-600">{p.horsepower}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
