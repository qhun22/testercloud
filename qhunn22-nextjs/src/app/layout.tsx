import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QHUN22 Mobile - Điện thoại chính hãng",
  description: "Mua điện thoại iPhone, Samsung, Xiaomi, OPPO chính hãng tại QHUN22 Mobile.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
