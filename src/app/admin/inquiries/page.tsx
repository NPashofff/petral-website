import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    include: { product: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Запитвания за оферти</h1>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{inq.name}</h3>
                <p className="text-sm text-gray-500">{inq.email} {inq.phone && `| ${inq.phone}`}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                  {inq.product.name}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(inq.createdAt).toLocaleString("bg-BG")}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{inq.message}</p>
          </div>
        ))}
        {inquiries.length === 0 && (
          <p className="text-center text-gray-400 py-8">Няма запитвания.</p>
        )}
      </div>
    </>
  );
}
