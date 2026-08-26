import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "かたりべ KATARIBE",
  description:
    "つくり手の言葉を、旅の言葉で。店頭の商品の物語を多言語で伝えるモバイルWebアプリ"
};

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
