import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Съобщения от контактна форма</h1>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.email} {contact.phone && `| ${contact.phone}`}</p>
              </div>
              <p className="text-xs text-gray-400">
                {new Date(contact.createdAt).toLocaleString("bg-BG")}
              </p>
            </div>
            <p className="text-gray-600 text-sm">{contact.message}</p>
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="text-center text-gray-400 py-8">Няма съобщения.</p>
        )}
      </div>
    </>
  );
}
