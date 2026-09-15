import type { Metadata } from "next";
import "./globals.css";
import "./legacy-globals.css";

export const metadata: Metadata = {
  title: "QHUN22 Mobile - Điện thoại chính hãng",
  description: "Mua điện thoại iPhone, Samsung, Xiaomi, OPPO chính hãng tại QHUN22 Mobile.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Signika:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
