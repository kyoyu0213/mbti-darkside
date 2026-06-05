import type { Metadata } from "next";
import { Cinzel, Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import { PromoLinks } from "@/components/PromoLinks";
import "./globals.css";

// ゴシックな雰囲気のラテン見出しフォント。
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

// 日本語の明朝（ゴシック調の重厚さ）。
const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${cinzel.variable} ${notoSerif.variable}`}>
      <body className="font-gothic antialiased">
        {children}
        <PromoLinks />
        <Analytics />
      </body>
    </html>
  );
}
