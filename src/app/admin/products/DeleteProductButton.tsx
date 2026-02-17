"use client";

import { useRouter } from "next/navigation";

export default function DeleteProductButton({ productId, productName }: { productId: number; productName: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Сигурни ли сте, че искате да изтриете "${productName}"?`)) return;

    const res = await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-800 font-medium">
      Изтрий
    </button>
  );
}
