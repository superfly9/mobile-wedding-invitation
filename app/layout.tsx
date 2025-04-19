import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/footer";

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        <Script
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID}&submodules=geocoder`}
          strategy="beforeInteractive"
        />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
          integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script id="kakao-init" strategy="afterInteractive">
          {`
            window.Kakao = window.Kakao || {};
            if (!window.Kakao.isInitialized()) {
              window.Kakao.init('${process.env.NEXT_PUBLIC_KAKAO_KEY}');
              console.log('Kakao init:', window.Kakao.isInitialized());
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
