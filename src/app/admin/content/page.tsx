"use client";

import { useEffect, useState } from "react";

type Section = {
  title: string;
  fields: { key: string; label: string; type: "input" | "textarea" | "color" }[];
};

const sections: Section[] = [
  {
    title: "Контакти",
    fields: [
      { key: "contact_address", label: "Адрес", type: "input" },
      { key: "contact_phone", label: "Телефон", type: "input" },
      { key: "contact_email", label: "Имейл", type: "input" },
      { key: "contact_hours", label: "Работно време", type: "textarea" },
    ],
  },
  {
    title: "Hero секция",
    fields: [
      { key: "hero_title", label: "Заглавие", type: "input" },
      { key: "hero_subtitle", label: "Подзаглавие", type: "textarea" },
    ],
  },
  {
    title: "За нас",
    fields: [
      { key: "about_title", label: "Заглавие", type: "input" },
      { key: "about_text1", label: "Текст 1", type: "textarea" },
      { key: "about_text2", label: "Текст 2", type: "textarea" },
      { key: "about_text3", label: "Текст 3", type: "textarea" },
      { key: "about_value1_title", label: "Ценност 1 - заглавие", type: "input" },
      { key: "about_value1_text", label: "Ценност 1 - текст", type: "textarea" },
      { key: "about_value2_title", label: "Ценност 2 - заглавие", type: "input" },
      { key: "about_value2_text", label: "Ценност 2 - текст", type: "textarea" },
      { key: "about_value3_title", label: "Ценност 3 - заглавие", type: "input" },
      { key: "about_value3_text", label: "Ценност 3 - текст", type: "textarea" },
    ],
  },
  {
    title: "Защо PetralGroup",
    fields: [
      { key: "feature1_title", label: "Предимство 1 - заглавие", type: "input" },
      { key: "feature1_text", label: "Предимство 1 - текст", type: "textarea" },
      { key: "feature2_title", label: "Предимство 2 - заглавие", type: "input" },
      { key: "feature2_text", label: "Предимство 2 - текст", type: "textarea" },
      { key: "feature3_title", label: "Предимство 3 - заглавие", type: "input" },
      { key: "feature3_text", label: "Предимство 3 - текст", type: "textarea" },
    ],
  },
  {
    title: "Обща информация",
    fields: [
      { key: "company_description", label: "Описание на компанията (Footer)", type: "textarea" },
    ],
  },
  {
    title: "Цветове",
    fields: [
      { key: "color_primary", label: "Основен цвят (Primary)", type: "color" },
      { key: "color_primary_light", label: "Светъл вариант (Primary Light)", type: "color" },
      { key: "color_primary_dark", label: "Тъмен вариант (Primary Dark)", type: "color" },
    ],
  },
];

export default function AdminContentPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        setValues(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function saveSection(section: Section) {
    setSaving(section.title);
    setMessage(null);

    const body: Record<string, string> = {};
    for (const field of section.fields) {
      body[field.key] = values[field.key] ?? "";
    }

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();
      setMessage({ type: "success", text: `"${section.title}" е запазена успешно.` });
    } catch {
      setMessage({ type: "error", text: "Грешка при запазване." });
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return <p className="text-gray-500">Зареждане...</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Съдържание на сайта</h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={3}
                      value={values[field.key] ?? ""}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                  ) : field.type === "color" ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        className="h-10 w-14 cursor-pointer rounded border border-gray-300"
                        value={values[field.key] ?? "#000000"}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                        }
                      />
                      <input
                        type="text"
                        className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={values[field.key] ?? ""}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                        }
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={values[field.key] ?? ""}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => saveSection(section)}
                disabled={saving !== null}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
              >
                {saving === section.title ? "Запазване..." : "Запази"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
