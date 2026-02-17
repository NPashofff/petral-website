import type { Metadata } from "next";
import { getContentMap } from "@/lib/content";

export const metadata: Metadata = {
  title: "За нас - PetralGroup",
  description: "Научете повече за PetralGroup - вашият доверен партньор за продажба на трактори и АТВ-та.",
};

export default async function AboutPage() {
  const content = await getContentMap([
    "about_title", "about_text1", "about_text2", "about_text3",
    "about_value1_title", "about_value1_text",
    "about_value2_title", "about_value2_text",
    "about_value3_title", "about_value3_text",
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">За нас</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="rounded-2xl overflow-hidden h-80 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/tractors/tractor-3.jpg')",
            }}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {content.about_title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {content.about_text1}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {content.about_text2}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {content.about_text3}
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
          Нашите ценности
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-2">{content.about_value1_title}</h3>
            <p className="text-gray-600">{content.about_value1_text}</p>
          </div>
          <div className="text-center p-8 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-2">{content.about_value2_title}</h3>
            <p className="text-gray-600">{content.about_value2_text}</p>
          </div>
          <div className="text-center p-8 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-2">{content.about_value3_title}</h3>
            <p className="text-gray-600">{content.about_value3_text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
