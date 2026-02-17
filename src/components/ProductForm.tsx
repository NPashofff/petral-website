"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  year: number;
  horsepower: string;
  engine: string;
  weight: string;
  images: string;
  featured: boolean;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: number;
}

const defaultData: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  category: "TRACTOR",
  brand: "",
  year: new Date().getFullYear(),
  horsepower: "",
  engine: "",
  weight: "",
  images: "[]",
  featured: false,
};

export default function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(initialData || defaultData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        router.push("/admin/products");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Грешка при запазване.");
      }
    } catch {
      setError("Грешка при запазване.");
    } finally {
      setSaving(false);
    }
  };

  return (
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
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Цена (лв.) *</label>
          <input
            type="number"
            required
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
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
            <option value="TRACTOR">Трактор</option>
            <option value="ATV">АТВ</option>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Година *</label>
          <input
            type="number"
            required
            value={form.year}
            onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 0 })}
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
  );
}
