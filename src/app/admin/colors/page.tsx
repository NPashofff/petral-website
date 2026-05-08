"use client";

import { useCallback, useEffect, useState } from "react";
import Toast from "@/components/Toast";

interface Color {
  id: number;
  name: string;
  hex: string;
  order: number;
  productCount: number;
  isUsed: boolean;
}

export default function ColorsPage() {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", hex: "#000000", order: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", hex: "#000000", order: 0 });
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const clearToast = useCallback(() => setToast(null), []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/colors");
      const data = await res.json();
      setColors(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/colors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setForm({ name: "", hex: "#000000", order: colors.length + 1 });
      setToast({ type: "success", text: "Цветът е добавен." });
      load();
    } else {
      setToast({ type: "error", text: data.error || "Грешка" });
    }
  }

  function startEdit(color: Color) {
    setEditingId(color.id);
    setEditForm({ name: color.name, hex: color.hex, order: color.order });
  }

  async function handleUpdate(id: number) {
    const res = await fetch(`/api/admin/colors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    const data = await res.json();
    if (res.ok) {
      setEditingId(null);
      setToast({ type: "success", text: "Запазено." });
      load();
    } else {
      setToast({ type: "error", text: data.error || "Грешка" });
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`Сигурен ли си, че искаш да изтриеш "${name}"?`)) return;
    const res = await fetch(`/api/admin/colors/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      setToast({ type: "success", text: "Изтрито." });
      load();
    } else {
      setToast({ type: "error", text: data.error || "Грешка" });
    }
  }

  return (
    <>
      {toast && <Toast message={toast.text} type={toast.type} onClose={clearToast} />}
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Цветове</h1>
        <p className="text-gray-500 mb-8">
          Централна палитра от цветове, която се използва при създаване на продукти и при запитвания от клиенти.
        </p>

        <form onSubmit={handleCreate} className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Добави нов цвят</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,1fr)_220px_120px_auto] gap-4 items-end">
            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Име *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="напр. Тъмно син"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Цвят *</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.hex}
                  onChange={(e) => setForm({ ...form, hex: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={form.hex}
                  onChange={(e) => setForm({ ...form, hex: e.target.value })}
                  className="min-w-0 flex-1 border border-gray-300 rounded-lg px-2 py-2 text-xs font-mono"
                />
              </div>
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Подредба</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg lg:self-end"
            >
              Добави
            </button>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Цвят</th>
                <th className="text-left px-4 py-3 font-medium">Име</th>
                <th className="text-left px-4 py-3 font-medium">Hex</th>
                <th className="text-left px-4 py-3 font-medium">Подредба</th>
                <th className="text-left px-4 py-3 font-medium">Използване</th>
                <th className="text-right px-4 py-3 font-medium">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Зареждане...
                  </td>
                </tr>
              )}
              {!loading && colors.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Няма добавени цветове.
                  </td>
                </tr>
              )}
              {colors.map((color) =>
                editingId === color.id ? (
                  <tr key={color.id} className="bg-yellow-50">
                    <td className="px-4 py-3">
                      <input
                        type="color"
                        value={editForm.hex}
                        onChange={(e) => setEditForm({ ...editForm, hex: e.target.value })}
                        className="w-10 h-10 rounded border cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={editForm.hex}
                        onChange={(e) => setEditForm({ ...editForm, hex: e.target.value })}
                        className="border border-gray-300 rounded px-2 py-1 w-24 text-xs font-mono"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={editForm.order}
                        onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                        className="border border-gray-300 rounded px-2 py-1 w-16"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <UsageBadge color={color} />
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleUpdate(color.id)}
                        className="text-green-700 hover:text-green-800 font-medium text-xs"
                      >
                        Запази
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-500 hover:text-gray-700 text-xs"
                      >
                        Отказ
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={color.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span
                        className="inline-block w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{color.name}</td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">{color.hex}</td>
                    <td className="px-4 py-3 text-gray-600">{color.order}</td>
                    <td className="px-4 py-3">
                      <UsageBadge color={color} />
                    </td>
                    <td className="px-4 py-3 text-right space-x-3">
                      <button
                        onClick={() => startEdit(color)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Редактирай
                      </button>
                      <button
                        onClick={() => handleDelete(color.id, color.name)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Изтрий
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function UsageBadge({ color }: { color: Color }) {
  if (!color.isUsed) {
    return (
      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
        Не се използва
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
      Използва се в {color.productCount} продукт{color.productCount === 1 ? "" : "а"}
    </span>
  );
}
