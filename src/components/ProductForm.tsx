"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Toast from "@/components/Toast";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";
import { parseImages, serializeImages } from "@/lib/images";
import { formatPrice } from "@/lib/currency";
import Link from "next/link";
import { PROMOTION_STATUS_CLASS, PROMOTION_STATUS_LABEL, type PromotionStatus } from "@/lib/promotion";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), { ssr: false });

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number | null;
  category: string;
  brand: string;
  year: number | null;
  horsepower: string;
  engine: string;
  weight: string;
  viscosity: string;
  volumeValue: number | null;
  volumeUnit: "L" | "kg" | "";
  images: string;
  address: string;
  lat: number | null;
  lon: number | null;
  featured: boolean;
  hidden: boolean;
  sortOrder: number;
  colorIds: number[];
  colorImageMap: Record<number, string>;
  colorPriceMap: Record<number, number | null>;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: number;
  /** Promotion the product currently belongs to (edit mode only). */
  promotion?: { id: number; title: string; status: PromotionStatus } | null;
}

interface ColorOption {
  id: number;
  name: string;
  hex: string;
  order: number;
}

const defaultData: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  price: null,
  category: "TRACTOR",
  brand: "",
  year: new Date().getFullYear(),
  horsepower: "",
  engine: "",
  weight: "",
  viscosity: "",
  volumeValue: null,
  volumeUnit: "",
  images: "[]",
  address: "",
  lat: null,
  lon: null,
  featured: false,
  hidden: false,
  sortOrder: 0,
  colorIds: [],
  colorImageMap: {},
  colorPriceMap: {},
};

export default function ProductForm({ initialData, productId, promotion = null }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(() => ({
    ...defaultData,
    ...(initialData || {}),
    colorIds: initialData?.colorIds ?? [],
    colorImageMap: initialData?.colorImageMap ?? {},
    colorPriceMap: initialData?.colorPriceMap ?? {},
  }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const clearToast = useCallback(() => setToast(null), []);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [availableColors, setAvailableColors] = useState<ColorOption[]>([]);
  const [newColor, setNewColor] = useState({ name: "", hex: "#000000" });
  const [creatingColor, setCreatingColor] = useState(false);

  useEffect(() => {
    fetch("/api/admin/colors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAvailableColors(data);
      })
      .catch(() => {});
  }, []);

  const toggleColor = (id: number) => {
    setForm((prev) => {
      const removing = prev.colorIds.includes(id);
      return {
        ...prev,
        colorIds: removing
          ? prev.colorIds.filter((x) => x !== id)
          : [...prev.colorIds, id],
        colorImageMap: removing
          ? Object.fromEntries(Object.entries(prev.colorImageMap).filter(([key]) => Number(key) !== id))
          : prev.colorImageMap,
        colorPriceMap: removing
          ? Object.fromEntries(Object.entries(prev.colorPriceMap).filter(([key]) => Number(key) !== id))
          : prev.colorPriceMap,
      };
    });
  };

  const setColorImage = (colorId: number, imageUrl: string) => {
    setForm((prev) => ({
      ...prev,
      colorImageMap: {
        ...prev.colorImageMap,
        [colorId]: imageUrl,
      },
    }));
  };

  const setColorPrice = (colorId: number, price: number | null) => {
    setForm((prev) => ({
      ...prev,
      colorPriceMap: {
        ...prev.colorPriceMap,
        [colorId]: price,
      },
    }));
  };

  const createColor = async () => {
    const name = newColor.name.trim();
    if (!name) {
      setToast({ type: "error", text: "Въведете име на цвета." });
      return;
    }

    setCreatingColor(true);
    try {
      const res = await fetch("/api/admin/colors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          hex: newColor.hex,
          order: availableColors.length + 1,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setToast({ type: "error", text: data.error || "Грешка при добавяне на цвят." });
        return;
      }

      const created = data.color as ColorOption;
      setAvailableColors((prev) => [...prev, created].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)));
      setForm((prev) => ({ ...prev, colorIds: [...prev.colorIds, created.id] }));
      setNewColor({ name: "", hex: "#000000" });
      setToast({ type: "success", text: "Цветът е добавен и избран." });
    } catch {
      setToast({ type: "error", text: "Грешка при добавяне на цвят." });
    } finally {
      setCreatingColor(false);
    }
  };

  const isEdit = !!productId;

  const imageList = parseImages(form.images);

  const setImages = (imgs: string[]) => {
    // #25: dedupe URLs so two identical image URLs can't collide as React keys
    // (the colorImageMap <select> options are keyed by URL).
    const unique = Array.from(new Set(imgs));
    setForm((prev) => ({ ...prev, images: serializeImages(unique) }));
  };

  // Bulgarian Cyrillic → Latin transliteration so Cyrillic product names yield a
  // valid, non-empty slug matching the server's productSchema regex.
  const CYRILLIC_MAP: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
    р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch",
    ш: "sh", щ: "sht", ъ: "a", ь: "y", ю: "yu", я: "ya",
  };

  const transliterate = (input: string) =>
    input.replace(/[Ѐ-ӿ]/g, (ch) => {
      const lower = ch.toLowerCase();
      const mapped = CYRILLIC_MAP[lower];
      if (mapped === undefined) return "";
      return ch === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1);
    });

  const generateSlug = (name: string) => {
    const slug = transliterate(name)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    // Never return empty for a non-empty name (edge case: name was all symbols).
    return slug || (name.trim() ? "produkt" : "");
  };

  const handleNameChange = (name: string) => {
    setForm({ ...form, name, slug: generateSlug(name) });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (res.ok) {
          newUrls.push(data.url);
        } else {
          setError(data.error || "Грешка при качване.");
        }
      } catch {
        setError("Грешка при качване.");
      }
    }

    if (newUrls.length > 0) {
      setImages([...imageList, ...newUrls]);
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    setImages([...imageList, url]);
    setUrlInput("");
    setShowUrlInput(false);
  };

  const removeImage = (index: number) => {
    const removedUrl = imageList[index];
    setForm((prev) => {
      const nextImages = parseImages(prev.images).filter((_, i) => i !== index);
      // #26: drop any per-color image link that pointed at the removed image so
      // a color doesn't reference a deleted URL. Per-color prices stay untouched.
      const colorImageMap = Object.fromEntries(
        Object.entries(prev.colorImageMap).filter(([, url]) => url !== removedUrl)
      );
      return { ...prev, images: serializeImages(nextImages), colorImageMap };
    });
  };

  const setAsDefault = (index: number) => {
    if (index === 0) return;
    const newList = [...imageList];
    const [img] = newList.splice(index, 1);
    newList.unshift(img);
    setImages(newList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/products/${productId}` : "/api/admin/products";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setToast({ type: "success", text: isEdit ? "Продуктът е обновен успешно!" : "Продуктът е създаден успешно!" });
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Грешка при запазване.");
        setToast({ type: "error", text: data.error || "Грешка при запазване" });
      }
    } catch {
      setError("Грешка при запазване.");
      setToast({ type: "error", text: "Грешка при запазване" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
    {toast && <Toast message={toast.text} type={toast.type} onClose={clearToast} />}
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Име *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Описание *</label>
        <RichTextEditor
          value={form.description}
          onChange={(val) => setForm({ ...form, description: val })}
        />
        {/* Hidden input to track description value */}
        <input
          type="text"
          value={form.description.replace(/<[^>]*>/g, '').trim()}
          onChange={() => {}}
          tabIndex={-1}
          aria-hidden
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-1">Цена (€)</label>
          <input
            id="product-price"
            type="number"
            min={0}
            value={form.price ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              setForm({ ...form, price: val === "" ? null : parseFloat(val) });
            }}
            placeholder="Оставете празно за '-'"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Категория *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {CATEGORY_KEYS.map((key) => (
              <option key={key} value={key}>{CATEGORIES[key].label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Марка *</label>
          <input
            type="text"
            required
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {CATEGORIES[form.category as keyof typeof CATEGORIES]?.fields.oil ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Вискозитет</label>
            <input
              type="text"
              value={form.viscosity}
              onChange={(e) => setForm({ ...form, viscosity: e.target.value })}
              placeholder="напр. 10W40 или ISO VG 68"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Празно = &quot;Други&quot;</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Опаковка (количество)</label>
            <input
              type="number"
              step="0.01"
              min={0}
              value={form.volumeValue ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setForm({ ...form, volumeValue: val === "" ? null : parseFloat(val) });
              }}
              placeholder="напр. 209"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Мерна единица</label>
            <select
              value={form.volumeUnit}
              onChange={(e) => setForm({ ...form, volumeUnit: e.target.value as "L" | "kg" | "" })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">—</option>
              <option value="L">литри (L)</option>
              <option value="kg">килограми (kg)</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Година</label>
            <input
              type="number"
              value={form.year ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setForm({ ...form, year: null });
                } else {
                  const n = parseInt(val, 10);
                  // #24: keep 0 (parseInt(val)||null would drop it) and reject
                  // non-numeric input like "1990abc" by requiring a finite number.
                  setForm({ ...form, year: Number.isFinite(n) ? n : null });
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Мощност</label>
            <input
              type="text"
              value={form.horsepower}
              onChange={(e) => setForm({ ...form, horsepower: e.target.value })}
              placeholder="120 к.с."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Двигател</label>
            <input
              type="text"
              value={form.engine}
              onChange={(e) => setForm({ ...form, engine: e.target.value })}
              placeholder="4.5L дизел"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Тегло</label>
            <input
              type="text"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              placeholder="5200 кг"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Image Manager */}
      <section className="border-t border-gray-200 pt-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Снимки</h2>
          <p className="text-sm text-gray-500">
            Качете снимките на продукта и изберете главната снимка.
          </p>
        </div>

        {imageList.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {imageList.map((img, i) => (
              <div
                key={i}
                onClick={() => setAsDefault(i)}
                className={`relative group w-24 h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                  i === 0 ? "border-green-500" : "border-gray-200 hover:border-gray-400"
                }`}
                title={i === 0 ? "Главна снимка" : "Кликни за главна"}
              >
                <img src={img} alt={`Снимка ${i + 1}`} className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-[10px] text-center py-0.5">
                    Главна
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                  className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Премахни снимка"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {uploading ? "Качване..." : "Качи снимка"}
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Добави линк
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP, GIF (макс. 5MB)</p>

        {showUrlInput && (
          <div className="flex gap-2 mt-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addUrl(); } }}
              placeholder="https://example.com/image.jpg"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addUrl}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Добави
            </button>
          </div>
        )}
      </section>

      {/* Colors */}
      <section className="border-t border-gray-200 pt-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Цветове</h2>
          <p className="text-sm text-gray-500">
            Добавете или изберете налични цветове и вържете всеки цвят с конкретна снимка.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_auto] gap-2 mb-3">
          <input
            type="text"
            value={newColor.name}
            onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
            placeholder="Име на нов цвят, напр. Пепел от рози"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={newColor.hex}
              onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
              className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              aria-label="Избери цвят"
            />
            <input
              type="text"
              value={newColor.hex}
              onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
              className="min-w-0 flex-1 border border-gray-300 rounded-lg px-2 py-2 text-xs font-mono"
              aria-label="Hex код"
            />
          </div>
          <button
            type="button"
            onClick={createColor}
            disabled={creatingColor}
            className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {creatingColor ? "Добавяне..." : "Добави цвят"}
          </button>
        </div>
        {availableColors.length === 0 ? (
          <p className="text-sm text-gray-500">
            Няма добавени цветове. Добавете в{" "}
            <a href="/admin/colors" className="text-green-700 underline">
              Цветове
            </a>
            .
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => {
              const checked = form.colorIds.includes(color.id);
              return (
                <label
                  key={color.id}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer text-sm transition-colors ${
                    checked
                      ? "border-green-600 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleColor(color.id)}
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
        )}
        {form.colorIds.length > 0 && (
          <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700">
              Снимка и надценка към избран цвят
            </div>
            <div className="hidden md:grid grid-cols-[160px_1fr_150px] gap-3 px-3 py-2 border-t border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <span>Цвят</span>
              <span>Снимка</span>
              <span>Надценка (€)</span>
            </div>
            <div className="divide-y divide-gray-100">
              {form.colorIds.map((colorId) => {
                const color = availableColors.find((item) => item.id === colorId);
                if (!color) return null;

                return (
                  <div key={colorId} className="grid grid-cols-1 md:grid-cols-[160px_1fr_150px] gap-3 p-3 md:items-center">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                      <span
                        className="inline-block w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </div>
                    <div>
                      <span className="md:hidden block text-xs font-medium text-gray-500 mb-1">Снимка</span>
                      {imageList.length === 0 ? (
                        <p className="text-sm text-gray-500">Първо добавете снимки за връзка със снимка.</p>
                      ) : (
                        <select
                          value={form.colorImageMap[colorId] ?? ""}
                          onChange={(e) => setColorImage(colorId, e.target.value)}
                          aria-label={`Снимка за ${color.name}`}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Без конкретна снимка</option>
                          {imageList.map((img, i) => (
                            <option key={i} value={img}>
                              Снимка {i + 1}{i === 0 ? " (главна)" : ""}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div>
                      <span className="md:hidden block text-xs font-medium text-gray-500 mb-1">Надценка (€)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={form.colorPriceMap[colorId] ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          const n = parseFloat(val);
                          setColorPrice(colorId, val === "" || !Number.isFinite(n) ? null : n);
                        }}
                        placeholder="напр. 500 или -300"
                        aria-label={`Надценка за ${color.name} (€)`}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      {form.price == null ? (
                        <p className="text-xs text-gray-400 mt-1">Задайте основна цена горе</p>
                      ) : Number.isFinite(form.colorPriceMap[colorId] as number) ? (
                        <p className="text-xs text-gray-500 mt-1">
                          = {formatPrice(form.price + (form.colorPriceMap[colorId] as number), { showBgn: false })}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="bg-gray-50 px-3 py-2 text-xs text-gray-500">
              Надценка (€): сума, която се добавя към основната цена (или се изважда, ако е с −). Празно = основната цена.
            </p>
          </div>
        )}
      </section>

      <section className="border-t border-gray-200 pt-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Представяне</h2>
          <p className="text-sm text-gray-500">
            Управлява къде и как продуктът се показва в сайта.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="product-sort-order" className="block text-sm font-medium text-gray-700 mb-1">
              Подредба (0–99)
            </label>
            <input
              id="product-sort-order"
              type="number"
              min={0}
              max={99}
              step={1}
              value={form.sortOrder}
              onChange={(e) => {
                const val = e.target.value;
                const n = val === "" ? 0 : Math.floor(parseInt(val, 10));
                setForm({ ...form, sortOrder: Number.isFinite(n) ? Math.min(99, Math.max(0, n)) : 0 });
              }}
              className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              По-голямо число = по-напред в каталога. 0 = най-отзад.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Представен продукт (показва се на началната страница)
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="hidden"
              checked={form.hidden}
              onChange={(e) => setForm({ ...form, hidden: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <label htmlFor="hidden" className="text-sm font-medium text-gray-700">
              Скрит продукт (не се показва никъде на сайта)
            </label>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 pt-6" data-testid="product-promotion-section">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Промоция</h2>
          <p className="text-sm text-gray-500">
            Промо цена или процент, червена лента върху първата снимка и текст под цената, с валидност от–до.
          </p>
        </div>
        {!isEdit ? (
          <p className="text-sm text-gray-500">Първо запазете продукта, после му добавете промоция.</p>
        ) : promotion ? (
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${PROMOTION_STATUS_CLASS[promotion.status]}`}>
              {PROMOTION_STATUS_LABEL[promotion.status]}
            </span>
            <span className="font-medium text-gray-900">{promotion.title}</span>
            <Link href={`/admin/promotions/${promotion.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">
              Редактирай промоцията
            </Link>
            <Link href={`/admin/promotions/new?products=${productId}`} className="text-gray-600 hover:text-gray-800">
              Нова промоция за този продукт
            </Link>
          </div>
        ) : (
          <Link
            href={`/admin/promotions/new?products=${productId}`}
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Добави промоция
          </Link>
        )}
      </section>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? "Запазване..." : isEdit ? "Запази промените" : "Създай продукт"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="text-gray-600 hover:text-gray-800 font-medium px-6 py-2"
        >
          Отказ
        </button>
      </div>
    </form>
    </>
  );
}
