import type {Metadata} from "next";
import {Noto_Sans_JP, Noto_Serif_JP} from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap"
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap"
});

export const metadata: Metadata = {
  title: "語り部 kataribe",
  description:
    "つくり手の言葉を、旅の言葉で。店頭の商品の物語を多言語で伝えるモバイルWebアプリ"
};

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

