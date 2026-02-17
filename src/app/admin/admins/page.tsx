"use client";

import { useState, useEffect } from "react";

interface Admin {
  id: number;
  username: string;
  name: string;
  createdAt: string;
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadAdmins() {
    const res = await fetch("/api/admin/admins");
    if (res.ok) setAdmins(await res.json());
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return;
      }

      setSuccess("Админът е създаден успешно");
      setUsername("");
      setPassword("");
      setName("");
      loadAdmins();
    } catch {
      setError("Грешка при създаване");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, adminUsername: string) {
    if (!confirm(`Сигурни ли сте, че искате да изтриете "${adminUsername}"?`)) return;

    const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
    if (res.ok) {
      loadAdmins();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Управление на админи</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Добавяне на нов админ</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleCreate} className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Име</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm w-48"
              placeholder="Иван Иванов"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Потребителско име</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm w-40"
              placeholder="ivan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Парола</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="border border-gray-300 rounded px-3 py-2 text-sm w-40"
              placeholder="мин. 6 символа"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            {loading ? "Създаване..." : "Добави"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Име</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Потребителско име</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Създаден</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b last:border-0">
                <td className="px-4 py-3 text-gray-500">{admin.id}</td>
                <td className="px-4 py-3">{admin.name}</td>
                <td className="px-4 py-3 font-mono text-gray-600">{admin.username}</td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(admin.createdAt).toLocaleDateString("bg-BG")}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(admin.id, admin.username)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Изтрий
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
