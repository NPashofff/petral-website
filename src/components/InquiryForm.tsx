"use client";

import { useState, useCallback } from "react";
import Toast from "@/components/Toast";

interface Color {
  id: number;
  name: string;
  hex: string;
}

interface InquiryFormProps {
  productId: number;
  productName: string;
  colors?: Color[];
}

export default function InquiryForm({ productId, productName, colors = [] }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Здравейте, интересувам се от ${productName}. Моля, изпратете ми оферта.`,
  });
  const [consent, setConsent] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const clearToast = useCallback(() => setToast(null), []);

  const hasColors = colors.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasColors && selectedColorId === null) {
      setToast({ type: "error", text: "Моля, изберете цвят." });
      return;
    }

    setStatus("sending");

    const selectedColor = colors.find((c) => c.id === selectedColorId);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId,
          selectedColorName: selectedColor?.name ?? null,
          selectedColorHex: selectedColor?.hex ?? null,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setToast({ type: "success", text: "Запитването е изпратено успешно!" });
      } else {
        setStatus("error");
        setToast({ type: "error", text: "Грешка при изпращане на запитването" });
      }
    } catch {
      setStatus("error");
      setToast({ type: "error", text: "Грешка при изпращане на запитването" });
    }
  };

  if (status === "sent") {
    return (
      <>
      {toast && <Toast message={toast.text} type={toast.type} onClose={clearToast} />}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <p className="text-green-800 font-semibold text-lg">Запитването е изпратено!</p>
        <p className="text-green-600 mt-2">Ще се свържем с вас в рамките на 24 часа.</p>
      </div>
      </>
    );
  }

  return (
    <>
    {toast && <Toast message={toast.text} type={toast.type} onClose={clearToast} />}
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Поискай оферта</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Име *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Имейл *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {hasColors && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Цвят *</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const active = selectedColorId === color.id;
              return (
                <label
                  key={color.id}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer text-sm transition-colors ${
                    active
                      ? "border-green-600 bg-green-50 ring-2 ring-green-200"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="inquiry-color"
                    value={color.id}
                    checked={active}
                    onChange={() => setSelectedColorId(color.id)}
                    className="sr-only"
                  />
                  <span
                    className="inline-block w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Съобщение *</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="inquiry-consent"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <label htmlFor="inquiry-consent" className="text-xs text-gray-600 leading-relaxed">
          Съгласявам се предоставените от мен лични данни (име, имейл, телефон) да бъдат обработвани от Петрал Груп ООД с цел обработка на моето запитване и изпращане на оферта. Данните ще бъдат съхранявани до приключване на кореспонденцията и няма да бъдат предоставяни на трети лица. Имате правото да оттеглите съгласието си по всяко време, като се свържете с нас.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending" || !consent}
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Изпращане..." : "Изпрати запитване"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm text-center">Грешка при изпращане. Опитайте отново.</p>
      )}
    </form>
    </>
  );
}
