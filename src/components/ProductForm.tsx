"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Toast from "@/components/Toast";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/categories";

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
  colorIds: number[];
}

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: number;
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
  colorIds: [],
};

export default function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(() => ({
    ...defaultData,
    ...(initialData || {}),
    colorIds: initialData?.colorIds ?? [],
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

  useEffect(() => {
    fetch("/api/admin/colors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAvailableColors(data);
      })
      .catch(() => {});
  }, []);

  const toggleColor = (id: number) => {
    setForm((prev) => ({
      ...prev,
      colorIds: prev.colorIds.includes(id)
        ? prev.colorIds.filter((x) => x !== id)
        : [...prev.colorIds, id],
    }));
  };

  const isEdit = !!productId;

  const imageList: string[] = (() => {
    try {
      const parsed = JSON.parse(form.images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const setImages = (imgs: string[]) => {
    setForm((prev) => ({ ...prev, images: JSON.stringify(imgs) }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
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
    setImages(imageList.filter((_, i) => i !== index));
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
                setForm({ ...form, year: val === "" ? null : parseInt(val) || null });
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Снимки</label>

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
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Налични цветове
        </label>
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
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
          Представен продукт (показва се на началната страница)
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="hidden"
          checked={form.hidden}
          onChange={(e) => setForm({ ...form, hidden: e.target.checked })}
          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
        />
        <label htmlFor="hidden" className="text-sm font-medium text-gray-700">
          Скрит продукт (не се показва никъде на сайта)
        </label>
      </div>

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
