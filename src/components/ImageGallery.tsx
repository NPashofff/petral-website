"use client";

import { useState, useEffect, useCallback } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const openLightbox = (index: number) => {
    setSelected(index);
    setLightbox(true);
  };

  const closeLightbox = useCallback(() => {
    setLightbox(false);
  }, []);

  const prev = useCallback(() => {
    setSelected((s) => (s > 0 ? s - 1 : images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setSelected((s) => (s < images.length - 1 ? s + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (!lightbox) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox, closeLightbox, prev, next]);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
        Няма снимка
      </div>
    );
  }

  return (
    <div>
      <div
        className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 mb-3 cursor-pointer"
        onClick={() => openLightbox(selected)}
      >
        <img
          src={images[selected]}
          alt={`${alt} - снимка ${selected + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                i === selected ? "border-[var(--color-primary)]" : "border-transparent"
              }`}
            >
              <img src={img} alt={`${alt} - миниатюра ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 text-white text-4xl leading-none hover:text-gray-300 z-10"
            aria-label="Затвори"
          >
            &times;
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl leading-none hover:text-gray-300 z-10"
                aria-label="Предишна"
              >
                &#8249;
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl leading-none hover:text-gray-300 z-10"
                aria-label="Следваща"
              >
                &#8250;
              </button>
            </>
          )}

          <img
            src={images[selected]}
            alt={`${alt} - снимка ${selected + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <div className="absolute bottom-4 text-white text-sm">
              {selected + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
