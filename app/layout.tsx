import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "김은혜 ♥️ 송승찬 결혼합니다",
  description: "2025년 6월 6일 금요일 오후 12시 30분, 더베일리하우스 삼성",
  openGraph: {
    title: "김은혜 ♥️ 송승찬 결혼합니다",
    description: "2025년 6월 6일 금요일 오후 12시 30분, 더베일리하우스 삼성",
    images: ["/images/main-portrait.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
