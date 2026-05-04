"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

type ErrorLog = {
  id: number;
  level: string;
  message: string;
  stack: string | null;
  route: string | null;
  method: string | null;
  statusCode: number | null;
  context: string | null;
  createdAt: string;
};

const levelStyle: Record<string, string> = {
  error: "bg-red-100 text-red-700",
  warn: "bg-yellow-100 text-yellow-700",
  info: "bg-blue-100 text-blue-700",
};

export default function LogsPage() {
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState("all");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (level !== "all") params.set("level", level);
    if (q) params.set("q", q);
    const res = await fetch(`/api/admin/logs?${params.toString()}`);
    const data = await res.json();
    setLogs(data.logs ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [level, q]);

  useEffect(() => {
    load();
  }, [load]);

  async function clearAll() {
    if (!confirm("Сигурни ли сте, че искате да изтриете ВСИЧКИ логове?")) return;
    await fetch("/api/admin/logs", { method: "DELETE" });
    load();
  }

  async function deleteOne(id: number) {
    await fetch(`/api/admin/logs?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Логове</h1>
          <p className="text-sm text-gray-500 mt-1">
            Общо: {total} {loading && "(зареждане...)"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Опресни
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Изтрий всички
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex gap-4 flex-wrap">
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="all">Всички нива</option>
          <option value="error">Error</option>
          <option value="warn">Warn</option>
          <option value="info">Info</option>
        </select>
        <input
          type="text"
          placeholder="Търсене в съобщение / route / stack..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          className="flex-1 min-w-[240px] border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {logs.length === 0 && !loading ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
          Няма записани грешки. 🎉
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Време</th>
                <th className="px-4 py-3">Ниво</th>
                <th className="px-4 py-3">Метод</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Съобщение</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <Fragment key={log.id}>
                  <tr className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {new Date(log.createdAt).toLocaleString("bg-BG")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          levelStyle[log.level] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {log.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{log.method ?? "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-700 max-w-[220px] truncate">
                      {log.route ?? "—"}
                    </td>
                    <td className="px-4 py-3 max-w-[400px] truncate">{log.message}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                        className="text-blue-600 hover:underline text-xs mr-3"
                      >
                        {expanded === log.id ? "Скрий" : "Детайли"}
                      </button>
                      <button
                        onClick={() => deleteOne(log.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Изтрий
                      </button>
                    </td>
                  </tr>
                  {expanded === log.id && (
                    <tr className="bg-gray-50 border-t border-gray-100">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="space-y-3 text-xs">
                          <div>
                            <div className="font-semibold text-gray-700 mb-1">Съобщение</div>
                            <div className="font-mono whitespace-pre-wrap break-all bg-white p-2 rounded border border-gray-200">
                              {log.message}
                            </div>
                          </div>
                          {log.stack && (
                            <div>
                              <div className="font-semibold text-gray-700 mb-1">Stack trace</div>
                              <pre className="font-mono whitespace-pre-wrap break-all bg-white p-2 rounded border border-gray-200 max-h-96 overflow-auto">
                                {log.stack}
                              </pre>
                            </div>
                          )}
                          {log.context && (
                            <div>
                              <div className="font-semibold text-gray-700 mb-1">Контекст</div>
                              <pre className="font-mono whitespace-pre-wrap break-all bg-white p-2 rounded border border-gray-200">
                                {log.context}
                              </pre>
                            </div>
                          )}
                          {log.statusCode && (
                            <div>
                              <span className="font-semibold text-gray-700">Status:</span>{" "}
                              {log.statusCode}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
