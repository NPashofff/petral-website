"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  colorImages?: {
    colorId: number;
    name: string;
    hex: string;
    imageUrl: string;
  }[];
}

export default function ImageGallery({ images, alt, colorImages = [] }: ImageGalleryProps) {
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

  useEffect(() => {
    const handleColorSelected = (event: Event) => {
      const colorId = (event as CustomEvent<{ colorId: number }>).detail?.colorId;
      const match = colorImages.find((item) => item.colorId === colorId);
      if (!match) return;

      const index = images.findIndex((img) => img === match.imageUrl);
      if (index >= 0) setSelected(index);
    };

    window.addEventListener("petral:color-selected", handleColorSelected);
    return () => window.removeEventListener("petral:color-selected", handleColorSelected);
  }, [colorImages, images]);

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
        className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 mb-3 cursor-pointer"
        onClick={() => openLightbox(selected)}
      >
        <Image
          src={images[selected]}
          alt={`${alt} - снимка ${selected + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="relative">
          <div
            className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory scroll-smooth"
            role="tablist"
            aria-label="Миниатюри"
          >
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === selected}
                aria-label={`Снимка ${i + 1} от ${images.length}`}
                onClick={() => setSelected(i)}
                className={`flex-shrink-0 snap-start w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === selected ? "border-[var(--color-primary)]" : "border-transparent"
                }`}
              >
                <Image src={img} alt={`${alt} - миниатюра ${i + 1}`} width={80} height={80} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {images.length > 3 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent md:hidden"
            />
          )}
        </div>
      )}

      {colorImages.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Снимки по цвят</p>
          <div className="flex flex-wrap gap-2">
            {colorImages.map((color) => {
              const imageIndex = images.findIndex((img) => img === color.imageUrl);
              const active = imageIndex >= 0 && selected === imageIndex;

              return (
                <button
                  key={color.colorId}
                  type="button"
                  onClick={() => {
                    if (imageIndex >= 0) setSelected(imageIndex);
                    window.dispatchEvent(new CustomEvent("petral:color-selected", { detail: { colorId: color.colorId } }));
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors ${
                    active
                      ? "border-green-600 bg-green-50 ring-2 ring-green-200"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <span
                    className="inline-block w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-12 h-12 flex items-center justify-center text-white text-4xl leading-none hover:text-gray-300 z-10"
            aria-label="Затвори"
          >
            &times;
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white text-5xl leading-none hover:text-gray-300 z-10"
                aria-label="Предишна"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white text-5xl leading-none hover:text-gray-300 z-10"
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
