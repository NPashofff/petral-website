"use client";

import { useState, useRef, useEffect } from "react";
import type { ImageLayout } from "@/lib/tiptap-image-float";

interface ImageInsertModalProps {
  onInsert: (url: string, layout: ImageLayout, alt: string) => void;
  onClose: () => void;
}

export default function ImageInsertModal({ onInsert, onClose }: ImageInsertModalProps) {
  const [tab, setTab] = useState<"upload" | "gallery">("upload");
  const [layout, setLayout] = useState<ImageLayout>("full-width");
  const [alt, setAlt] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load gallery images when tab switches
  useEffect(() => {
    if (tab === "gallery" && galleryImages.length === 0) {
      setLoadingGallery(true);
      fetch("/api/admin/uploads")
        .then((r) => r.json())
        .then((data) => setGalleryImages(data.images || []))
        .catch(() => {})
        .finally(() => setLoadingGallery(false));
    }
  }, [tab, galleryImages.length]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setSelectedUrl(data.url);
        // Add to gallery cache
        setGalleryImages((prev) => [data.url, ...prev]);
      }
    } catch {
      // ignore
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleInsert() {
    if (!selectedUrl) return;
    onInsert(selectedUrl, layout, alt);
  }

  const layoutOptions: { value: ImageLayout; label: string; icon: string }[] = [
    { value: "float-left", label: "Ляво", icon: "◧" },
    { value: "full-width", label: "Цял ред", icon: "▣" },
    { value: "float-right", label: "Дясно", icon: "◨" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Вмъкни снимка</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-6">
          <button
            onClick={() => setTab("upload")}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === "upload"
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Качи снимка
          </button>
          <button
            onClick={() => setTab("gallery")}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === "gallery"
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Галерия
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === "upload" && (
            <div className="text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 w-full hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer disabled:opacity-50"
              >
                {uploading ? (
                  <div className="text-gray-500">Качване...</div>
                ) : (
                  <div>
                    <div className="text-4xl mb-2">📁</div>
                    <div className="text-gray-700 font-medium">Кликни за избор на файл</div>
                    <div className="text-gray-400 text-sm mt-1">JPG, PNG, WebP, GIF (макс. 5MB)</div>
                  </div>
                )}
              </button>

              {selectedUrl && (
                <div className="mt-4 border rounded-xl p-3 bg-green-50">
                  <img src={selectedUrl} alt="Предпреглед" className="max-h-48 mx-auto rounded-lg" />
                  <p className="text-sm text-green-700 mt-2">Снимката е качена</p>
                </div>
              )}
            </div>
          )}

          {tab === "gallery" && (
            <div>
              {loadingGallery ? (
                <div className="text-center text-gray-400 py-8">Зареждане...</div>
              ) : galleryImages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">Няма качени снимки</div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {galleryImages.map((url) => (
                    <button
                      key={url}
                      onClick={() => setSelectedUrl(url)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedUrl === url
                          ? "border-green-600 ring-2 ring-green-200"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {selectedUrl === url && (
                        <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
                          <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer: Layout + Alt + Insert */}
        <div className="border-t px-6 py-4 space-y-3">
          {/* Layout selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 w-20">Подредба:</span>
            <div className="flex gap-1">
              {layoutOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLayout(opt.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    layout === opt.value
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-green-500"
                  }`}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alt text */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 w-20">Описание:</span>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Кратко описание на снимката (опция)"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Insert button */}
          <button
            onClick={handleInsert}
            disabled={!selectedUrl}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-2.5 rounded-xl transition-colors"
          >
            Вмъкни снимка
          </button>
        </div>
      </div>
    </div>
  );
}
