"use client";

import { useState } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function Footer() {
  const [showToast, setShowToast] = useState(false);

  const handleKakaoShare = () => {
    if (typeof window === "undefined" || !window.Kakao?.Share) {
      alert("카카오톡 공유하기를 사용할 수 없습니다.");
      return;
    }

    const metaTag = document.querySelector('meta[property="og:image"]');
    const imageUrl = metaTag
      ? metaTag.getAttribute("content")
      : "/images/couple-thumbnail.jpg";
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";

    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "승찬 ♥️ 은혜의 결혼식에 초대합니다",
          description:
            "2025년 06월 06일 금요일 오후 12:30\n더베일리하우스 삼성 2층",
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: "청첩장 보기",
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Kakao share error:", error);
      alert("카카오톡 공유하기에 실패했습니다.");
    }
  };

  const handleLinkShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <footer className="border-t border-gray-200 py-4 px-4">
      <div className="max-w-sm mx-auto flex justify-center space-x-4">
        {/* <button
          onClick={handleKakaoShare}
          className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-[#000000] hover:bg-gray-50"
        >
          <img
            src="/images/kakao-share.svg"
            alt="카카오톡"
            width={24}
            height={24}
            className="mr-2"
          />
          카카오톡 공유하기
        </button> */}
        <button
          onClick={handleLinkShare}
          className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          링크 복사하기
        </button>
      </div>
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md text-sm">
          링크가 복사되었습니다
        </div>
      )}
    </footer>
  );
}
