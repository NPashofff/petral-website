import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ProductMapLoader from "@/components/ProductMapLoader";
import { getContentMap } from "@/lib/content";

// #28: content-only page — statically rendered, refreshed via the 'site-content'
// cache tag that the admin content PUT route revalidates. No force-dynamic.

export const metadata: Metadata = {
  title: "Контакти - Петрал Груп",
  description: "Свържете се с Петрал Груп. Телефон, имейл и адрес за контакт.",
};

export default async function ContactPage() {
  const content = await getContentMap([
    "contact_address",
    "contact_phone",
    "contact_email",
    "contact_hours",
    "contact_lat",
    "contact_lon",
  ]);

  const hoursLines = content.contact_hours.split("\n");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Контакти</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact form */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Изпратете ни съобщение
          </h2>
          <ContactForm />
        </div>

        {/* Contact info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Данни за контакт
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Адрес</h3>
                  <p className="text-gray-600">{content.contact_address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Телефон</h3>
                  <p className="text-gray-600">{content.contact_phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Имейл</h3>
                  <p className="text-gray-600">{content.contact_email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Работно време</h3>
                  {hoursLines.map((line, i) => (
                    <p key={i} className="text-gray-600">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <ProductMapLoader
            address={content.contact_address}
            lat={content.contact_lat ? parseFloat(content.contact_lat) : null}
            lon={content.contact_lon ? parseFloat(content.contact_lon) : null}
          />
        </div>
      </div>
    </div>
  );
}
