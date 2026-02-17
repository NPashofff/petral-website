import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContentMap } from "@/lib/content";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "PetralGroup",
  description: "PetralGroup - Вашият доверен партньор за продажба на трактори и АТВ-та. Качествена техника за земеделие и отдих.",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const colors = await getContentMap([
    "color_primary",
    "color_primary_light",
    "color_primary_dark",
  ]);

  const colorStyle = {
    "--color-primary": colors.color_primary,
    "--color-primary-light": colors.color_primary_light,
    "--color-primary-dark": colors.color_primary_dark,
  } as React.CSSProperties;

  return (
    <html lang="bg" style={colorStyle}>
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
