"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/Toast";
import { formatPrice } from "@/lib/currency";
import { grossToNet, PROMOTION_TYPES, PROMOTION_TYPE_LABEL, type PromotionType } from "@/lib/promotion";
import { categoryLabel } from "@/lib/categories";

export interface PromotionFormData {
  title: string;
  type: PromotionType;
  promoPriceGross: number | null;
  percent: number | null;
  ribbonText: string;
  comment: string;
  startsAt: string;
  endsAt: string;
  active: boolean;
  productIds: number[];
}

export interface PromotionProductOption {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number | null;
  /** OILS: the price is per unit (L/kg) of this package size. */
  volumeValue: number | null;
  volumeUnit: string | null;
  /** Promotion the product currently belongs to (if any). */
  promotionId: number | null;
  promotionTitle: string | null;
}

interface PromotionFormProps {
  initialData?: Partial<PromotionFormData>;
  promotionId?: number;
  products: PromotionProductOption[];
}

const defaultData: PromotionFormData = {
  title: "",
  type: "PERCENT",
  promoPriceGross: null,
  percent: null,
  ribbonText: "ПРОМОЦИЯ",
  comment: "",
  startsAt: "",
  endsAt: "",
  active: true,
  productIds: [],
};

function parseNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export default function PromotionForm({ initialData, promotionId, products }: PromotionFormProps) {
  const router = useRouter();
  const isEdit = promotionId != null;
  const [form, setForm] = useState<PromotionFormData>({ ...defaultData, ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [filter, setFilter] = useState("");

  const selected = useMemo(() => new Set(form.productIds), [form.productIds]);

  const visibleProducts = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [products, filter]);

  const toggleProduct = (id: number) => {
    setForm((prev) => ({
      ...prev,
      productIds: prev.productIds.includes(id)
        ? prev.productIds.filter((x) => x !== id)
        : [...prev.productIds, id],
    }));
  };

  const setVisible = (checked: boolean) => {
    setForm((prev) => {
      const ids = new Set(prev.productIds);
      for (const p of visibleProducts) {
        if (checked) ids.add(p.id);
        else ids.delete(p.id);
      }
      return { ...prev, productIds: Array.from(ids) };
    });
  };

  const netPreview =
    form.type === "PRICE" && form.promoPriceGross != null && form.promoPriceGross > 0
      ? grossToNet(form.promoPriceGross)
      : null;

  // Oils are priced per litre/kg: a fixed promo price is a per-unit price too,
  // so warn the admin and preview the package total for the selected oils.
  const selectedOils = useMemo(
    () => products.filter((p) => selected.has(p.id) && p.category === "OILS"),
    [products, selected]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Въведете име на промоцията.");
      return;
    }
    if (form.type === "PRICE" && (form.promoPriceGross == null || form.promoPriceGross <= 0)) {
      setError("Въведете промо цена с ДДС (> 0).");
      return;
    }
    if (form.type === "PERCENT" && (form.percent == null || form.percent <= 0 || form.percent > 100)) {
      setError("Процентът трябва да е между 0 и 100.");
      return;
    }
    if (form.startsAt && form.endsAt && form.endsAt < form.startsAt) {
      setError("Крайната дата е преди началната.");
      return;
    }
    if (form.productIds.length === 0) {
      setError("Изберете поне един продукт.");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/promotions/${promotionId}` : "/api/admin/promotions";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          startsAt: form.startsAt || null,
          endsAt: form.endsAt || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Грешка при запазване.");
        return;
      }
      setToast({ type: "success", text: isEdit ? "Промоцията е обновена." : "Промоцията е създадена." });
      router.push("/admin/promotions");
      router.refresh();
    } catch {
      setError("Грешка при връзка със сървъра.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {toast && <Toast message={toast.text} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-8">
        {/* Basics */}
        <section className="space-y-4">
          <div>
            <label htmlFor="promo-title" className="block text-sm font-medium text-gray-700 mb-1">
              Име на промоцията *
            </label>
            <input
              id="promo-title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="напр. Есенна промоция 2026"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Само за админ панела — не се показва на сайта.</p>
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">Тип на отстъпката *</legend>
            <div className="flex flex-wrap gap-6">
              {PROMOTION_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="promo-type"
                    value={type}
                    checked={form.type === type}
                    onChange={() => setForm({ ...form, type })}
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                  />
                  {PROMOTION_TYPE_LABEL[type]}
                </label>
              ))}
            </div>
          </fieldset>

          {form.type === "PERCENT" ? (
            <div>
              <label htmlFor="promo-percent" className="block text-sm font-medium text-gray-700 mb-1">
                Отстъпка (%) *
              </label>
              <input
                id="promo-percent"
                type="number"
                min={0}
                max={100}
                step="0.01"
                value={form.percent ?? ""}
                onChange={(e) => setForm({ ...form, percent: parseNumber(e.target.value) })}
                className="w-40 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Прилага се върху основната цена (без ДДС) на всеки избран продукт. Надценките за цвят се добавят след отстъпката.
              </p>
            </div>
          ) : form.type === "OTHER" ? (
            <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              Цената остава без промяна. Показват се само лентата върху снимката и текстът под цената —
              подходящо за „На изплащане“, „Безплатна доставка“, „Подарък“ и т.н.
            </p>
          ) : (
            <div>
              <label htmlFor="promo-price-gross" className="block text-sm font-medium text-gray-700 mb-1">
                Промо цена с ДДС (€) *
              </label>
              <input
                id="promo-price-gross"
                type="number"
                min={0}
                step="0.01"
                value={form.promoPriceGross ?? ""}
                onChange={(e) => setForm({ ...form, promoPriceGross: parseNumber(e.target.value) })}
                className="w-40 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                {netPreview != null ? (
                  <>
                    На сайта ще се покаже <strong>{formatPrice(netPreview)}</strong> без ДДС
                    (20% ДДС). Надценките за цвят се добавят върху промо цената.
                  </>
                ) : (
                  "Въвежда се крайната цена с 20% ДДС; на сайта се показва без ДДС, по текущите правила."
                )}
              </p>
              {selectedOils.length > 0 && (
                <div
                  className="mt-2 text-xs text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2"
                  data-testid="oil-unit-warning"
                >
                  <p className="font-semibold">Внимание: при маслата цената е за 1 л / 1 кг, не за опаковка.</p>
                  {netPreview != null && (
                    <ul className="mt-1 space-y-0.5">
                      {selectedOils.slice(0, 5).map((o) => (
                        <li key={o.id}>
                          {o.name}: {formatPrice(netPreview, { unit: o.volumeUnit, showBgn: false })}
                          {o.volumeValue != null && o.volumeUnit
                            ? ` → ${formatPrice(netPreview * o.volumeValue, { showBgn: false })} за опаковка ${o.volumeValue} ${o.volumeUnit}`
                            : ""}
                        </li>
                      ))}
                      {selectedOils.length > 5 && <li>… и още {selectedOils.length - 5}</li>}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Presentation */}
        <section className="border-t border-gray-200 pt-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Показване</h2>
          <div>
            <label htmlFor="promo-ribbon" className="block text-sm font-medium text-gray-700 mb-1">
              Надпис на лентата
            </label>
            <input
              id="promo-ribbon"
              type="text"
              maxLength={40}
              value={form.ribbonText}
              onChange={(e) => setForm({ ...form, ribbonText: e.target.value })}
              placeholder={form.type === "OTHER" ? "напр. НА ИЗПЛАЩАНЕ" : "ПРОМОЦИЯ"}
              className="w-72 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Червената лента върху първата снимка. Кратък текст (до 40 знака).</p>
          </div>
          <div>
            <label htmlFor="promo-comment" className="block text-sm font-medium text-gray-700 mb-1">
              Текст на промоцията
            </label>
            <textarea
              id="promo-comment"
              rows={3}
              maxLength={1000}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              placeholder="Свободен текст — показва се под цената в страницата на продукта."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </section>

        {/* Validity */}
        <section className="border-t border-gray-200 pt-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Валидност</h2>
          <div className="flex flex-wrap gap-6">
            <div>
              <label htmlFor="promo-starts" className="block text-sm font-medium text-gray-700 mb-1">От дата</label>
              <input
                id="promo-starts"
                type="date"
                value={form.startsAt}
                onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="promo-ends" className="block text-sm font-medium text-gray-700 mb-1">До дата (вкл.)</label>
              <input
                id="promo-ends"
                type="date"
                value={form.endsAt}
                onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">Празна дата = без ограничение.</p>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="promo-active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <label htmlFor="promo-active" className="text-sm font-medium text-gray-700">
              Активна (махнете отметката, за да спрете промоцията временно)
            </label>
          </div>
        </section>

        {/* Products */}
        <section className="border-t border-gray-200 pt-6 space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Продукти *</h2>
              <p className="text-sm text-gray-500">
                Избрани: <strong data-testid="promo-selected-count">{form.productIds.length}</strong>.
                Един продукт може да е само в една промоция — избирането му тук го премества от предишната.
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Търси по име/марка"
                aria-label="Търсене на продукти"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button type="button" onClick={() => setVisible(true)} className="text-sm text-blue-600 hover:text-blue-800">
                Избери видимите
              </button>
              <button type="button" onClick={() => setVisible(false)} className="text-sm text-gray-600 hover:text-gray-800">
                Изчисти
              </button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg max-h-80 overflow-y-auto divide-y divide-gray-100">
            {visibleProducts.length === 0 && (
              <p className="text-sm text-gray-400 px-3 py-4 text-center">Няма продукти.</p>
            )}
            {visibleProducts.map((p) => {
              const inOther = p.promotionId != null && p.promotionId !== promotionId;
              return (
                <label
                  key={p.id}
                  className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.has(p.id)}
                    onChange={() => toggleProduct(p.id)}
                    data-product-id={p.id}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="flex-1 min-w-0">
                    <span className="font-medium text-gray-900">{p.name}</span>
                    <span className="text-gray-500"> · {p.brand} · {categoryLabel(p.category)}</span>
                    {inOther && (
                      <span className="ml-2 text-xs text-yellow-700 bg-yellow-50 px-1.5 py-0.5 rounded">
                        в „{p.promotionTitle}“
                      </span>
                    )}
                  </span>
                  <span className="text-gray-500 whitespace-nowrap">
                    {p.price != null
                      ? formatPrice(p.price, { unit: p.category === "OILS" ? p.volumeUnit : null, showBgn: false })
                      : "—"}
                    {p.category === "OILS" && p.volumeValue != null && p.volumeUnit
                      ? ` · ${p.volumeValue} ${p.volumeUnit}`
                      : ""}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Запазване..." : isEdit ? "Запази промените" : "Създай промоция"}
          </button>
          <Link href="/admin/promotions" className="text-gray-600 hover:text-gray-800 font-medium px-6 py-2">
            Отказ
          </Link>
        </div>
      </form>
    </>
  );
}
