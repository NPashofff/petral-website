"use client";

import { useCallback, useRef, useState } from "react";
import Toast from "@/components/Toast";

type Scope = "db" | "inquiries" | "uploads";

const SCOPE_LABELS: Record<Scope, string> = {
  db: "База (продукти, цветове, съдържание, админи, контакти)",
  inquiries: "Запитвания",
  uploads: "Снимки (public/uploads)",
};

const ALL_SCOPES: Scope[] = ["db", "inquiries", "uploads"];

export default function BackupPage() {
  const [backupScopes, setBackupScopes] = useState<Set<Scope>>(new Set(ALL_SCOPES));
  const [restoreScopes, setRestoreScopes] = useState<Set<Scope>>(new Set(ALL_SCOPES));
  const [restoreFile, setRestoreFile] = useState<File | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const clearToast = useCallback(() => setToast(null), []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleScope = (
    scopes: Set<Scope>,
    setter: (s: Set<Scope>) => void,
    scope: Scope
  ) => {
    const next = new Set(scopes);
    if (next.has(scope)) next.delete(scope);
    else next.add(scope);
    setter(next);
  };

  const toggleAll = (
    scopes: Set<Scope>,
    setter: (s: Set<Scope>) => void
  ) => {
    if (scopes.size === ALL_SCOPES.length) setter(new Set());
    else setter(new Set(ALL_SCOPES));
  };

  async function handleDownload() {
    if (backupScopes.size === 0) {
      setToast({ type: "error", text: "Изберете поне един обхват." });
      return;
    }
    setDownloading(true);
    try {
      const scopes = Array.from(backupScopes).join(",");
      const res = await fetch(`/api/admin/backup?scopes=${scopes}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setToast({ type: "error", text: data.error || "Грешка при създаване на бекъп" });
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const dateStr = new Date().toISOString().slice(0, 10);
      const a = document.createElement("a");
      a.href = url;
      a.download = `petral-backup-${dateStr}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setToast({ type: "success", text: "Бекъпът е свален." });
    } catch {
      setToast({ type: "error", text: "Мрежова грешка." });
    } finally {
      setDownloading(false);
    }
  }

  async function handleRestore() {
    if (!restoreFile) {
      setToast({ type: "error", text: "Изберете ZIP файл." });
      return;
    }
    if (restoreScopes.size === 0) {
      setToast({ type: "error", text: "Изберете поне един обхват." });
      return;
    }

    const scopesList = Array.from(restoreScopes)
      .map((s) => SCOPE_LABELS[s])
      .join("\n • ");
    const confirmed = window.confirm(
      `⚠️ Възстановяването ще ЗАМЕНИ съществуващите данни в следните обхвати:\n\n • ${scopesList}\n\nПродължаваш ли?`
    );
    if (!confirmed) return;

    setRestoring(true);
    try {
      const form = new FormData();
      form.append("file", restoreFile);
      form.append("scopes", Array.from(restoreScopes).join(","));

      const res = await fetch("/api/admin/backup/restore", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setToast({ type: "error", text: data.error || "Грешка при възстановяване" });
        return;
      }
      const parts: string[] = [];
      for (const [key, val] of Object.entries(data.restored || {})) {
        parts.push(`${key}: ${val}`);
      }
      setToast({
        type: "success",
        text: `Възстановено: ${parts.join(", ") || "успешно"}`,
      });
      setRestoreFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setToast({ type: "error", text: "Мрежова грешка." });
    } finally {
      setRestoring(false);
    }
  }

  const renderScopeRow = (
    scopes: Set<Scope>,
    setter: (s: Set<Scope>) => void,
    idPrefix: string
  ) => (
    <div className="space-y-2">
      <label className="flex items-center gap-3 cursor-pointer font-medium text-gray-900">
        <input
          type="checkbox"
          checked={scopes.size === ALL_SCOPES.length}
          onChange={() => toggleAll(scopes, setter)}
          className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        Всичко
      </label>
      <div className="pl-7 space-y-2">
        {ALL_SCOPES.map((scope) => (
          <label
            key={scope}
            htmlFor={`${idPrefix}-${scope}`}
            className="flex items-center gap-3 cursor-pointer text-sm text-gray-700"
          >
            <input
              id={`${idPrefix}-${scope}`}
              type="checkbox"
              checked={scopes.has(scope)}
              onChange={() => toggleScope(scopes, setter, scope)}
              className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            {SCOPE_LABELS[scope]}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {toast && <Toast message={toast.text} type={toast.type} onClose={clearToast} />}
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Бекъп и възстановяване</h1>
        <p className="text-gray-500 mb-8">
          Създавайте ZIP архиви на базата и файловете и ги възстановявайте при нужда.
        </p>

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Създай бекъп</h2>
          {renderScopeRow(backupScopes, setBackupScopes, "backup")}
          <button
            onClick={handleDownload}
            disabled={downloading || backupScopes.size === 0}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:bg-green-300"
          >
            {downloading ? "Създаване..." : "⬇️ Изтегли бекъп"}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Възстанови от бекъп</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP файл с бекъп
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".zip,application/zip"
              onChange={(e) => setRestoreFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {restoreFile && (
              <p className="text-xs text-gray-500 mt-1">
                Избран: {restoreFile.name} ({Math.round(restoreFile.size / 1024)} KB)
              </p>
            )}
          </div>

          {renderScopeRow(restoreScopes, setRestoreScopes, "restore")}

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            ⚠️ Внимание: възстановяването ЗАМЕНЯ всички данни в избраните обхвати. Действието не може да бъде отменено.
          </div>

          <button
            onClick={handleRestore}
            disabled={restoring || !restoreFile || restoreScopes.size === 0}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:bg-red-300"
          >
            {restoring ? "Възстановяване..." : "♻️ Възстанови"}
          </button>
        </div>
      </div>
    </>
  );
}
