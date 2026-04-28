"use client";

import { useState, useCallback } from "react";
import Toast from "@/components/Toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const clearToast = useCallback(() => setToast(null), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setToast({ type: "success", text: "Съобщението е изпратено успешно!" });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Грешка при изпращане. Опитайте отново.");
        setStatus("error");
        setToast({ type: "error", text: data.error || "Грешка при изпращане" });
      }
    } catch {
      setErrorMessage("Грешка при изпращане. Опитайте отново.");
      setStatus("error");
      setToast({ type: "error", text: "Грешка при изпращане" });
    }
  };

  if (status === "sent") {
    return (
      <>
      {toast && <Toast message={toast.text} type={toast.type} onClose={clearToast} />}
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-green-800 font-semibold text-lg">Съобщението е изпратено!</p>
        <p className="text-green-600 mt-2">Благодарим ви. Ще се свържем с вас скоро.</p>
      </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Име *</label>
        <input
          id="contact-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Имейл *</label>
        <input
          id="contact-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
        <input
          id="contact-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Съобщение *</label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="contact-consent"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <label htmlFor="contact-consent" className="text-xs text-gray-600 leading-relaxed">
          Съгласявам се предоставените от мен лични данни (име, имейл, телефон) да бъдат обработвани от Петрал Груп ООД с цел обработка на моето запитване. Данните ще бъдат съхранявани до приключване на кореспонденцията и няма да бъдат предоставяни на трети лица. Имате правото да оттеглите съгласието си по всяко време, като се свържете с нас.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending" || !consent}
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Изпращане..." : "Изпрати съобщение"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm text-center">{errorMessage}</p>
      )}
    </form>
  );
}
