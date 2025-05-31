import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "../ui/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "だけんちゅ - 日本語タイピング練習",
  description:
    "だけんちゅ（dakenjin）は日本語タイピング練習のためのWebアプリケーションです。ひらがな、カタカナ、漢字の入力練習ができます。",
  keywords: [
    "タイピング",
    "日本語",
    "練習",
    "ひらがな",
    "カタカナ",
    "漢字",
    "だけんちゅ",
    "dakenjin",
  ],
  authors: [{ name: "aku11i" }],
  creator: "aku11i",
  publisher: "aku11i",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "だけんちゅ - 日本語タイピング練習",
    description: "日本語タイピング練習のためのWebアプリケーション",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "だけんちゅ - 日本語タイピング練習",
    description: "日本語タイピング練習のためのWebアプリケーション",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header title="だけんちゅ" subtitle="日本語タイピング練習" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
