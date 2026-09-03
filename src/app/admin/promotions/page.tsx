import Link from "next/link";
import { prisma } from "@/lib/db";
import DeleteRowButton from "@/components/DeleteRowButton";
import { formatPrice } from "@/lib/currency";
import {
  promotionStatus,
  promotionDiscountLabel,
  PROMOTION_STATUS_CLASS,
  PROMOTION_STATUS_LABEL,
} from "@/lib/promotion";
import { formatDateBg } from "@/lib/dates";
import { toIsoDate } from "@/lib/promotion-admin";

export const dynamic = "force-dynamic";

export default async function AdminPromotionsPage() {
  const promotions = await prisma.promotion.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: { _count: { select: { products: true } } },
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Промоции</h1>
        <Link
          href="/admin/promotions/new"
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Нова промоция
        </Link>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        За промоция на конкретни продукти маркирайте ги в{" "}
        <Link href="/admin/products" className="text-blue-600 hover:underline">списъка с продукти</Link>{" "}
        и натиснете „Промоция за избраните“.
      </p>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Име</th>
              <th className="text-left px-4 py-3 font-medium">Лента</th>
              <th className="text-left px-4 py-3 font-medium">Отстъпка</th>
              <th className="text-center px-4 py-3 font-medium">Продукти</th>
              <th className="text-left px-4 py-3 font-medium">Валидност</th>
              <th className="text-left px-4 py-3 font-medium">Статус</th>
              <th className="text-right px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {promotions.map((promo) => {
              const status = promotionStatus(promo);
              const discount = promotionDiscountLabel(promo, (eur) => formatPrice(eur, { showBgn: false }));
              const from = formatDateBg(toIsoDate(promo.startsAt));
              const to = formatDateBg(toIsoDate(promo.endsAt));
              return (
                <tr key={promo.id} className="hover:bg-gray-50" data-testid="promotion-row">
                  <td className="px-4 py-3 text-gray-500">{promo.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{promo.title}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-red-600 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
                      {promo.ribbonText}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{discount}</td>
                  <td className="px-4 py-3 text-center">{promo._count.products}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {from || to ? `${from ?? "…"} – ${to ?? "…"}` : "без ограничение"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${PROMOTION_STATUS_CLASS[status]}`}>
                      {PROMOTION_STATUS_LABEL[status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <Link href={`/admin/promotions/${promo.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">
                      Редактирай
                    </Link>
                    <DeleteRowButton
                      endpoint={`/api/admin/promotions/${promo.id}`}
                      confirmTitle="Изтриване на промоция"
                      confirmMessage={`Сигурни ли сте, че искате да изтриете „${promo.title}“? Продуктите остават, но без промоция.`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {promotions.length === 0 && (
          <p className="text-center text-gray-400 py-8">Няма промоции.</p>
        )}
      </div>
    </>
  );
}
