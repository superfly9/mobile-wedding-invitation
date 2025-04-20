"use client";

import ContactModal from "./contact-modal";
import { useState } from "react";

export default function CoupleInfo() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setContactModalOpen(true)}
        className="w-full bg-white border border-gray-500 rounded-xl p-3 font-medium shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center"
      >
        <span className="mr-2">양가측에 연락하기</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5 4.5H4.5C4.10218 4.5 3.72064 4.65804 3.43934 4.93934C3.15804 5.22064 3 5.60218 3 6V18C3 18.3978 3.15804 18.7794 3.43934 19.0607C3.72064 19.342 4.10218 19.5 4.5 19.5H19.5C19.8978 19.5 20.2794 19.342 20.5607 19.0607C20.842 18.7794 21 18.3978 21 18V6C21 5.60218 20.842 5.22064 20.5607 4.93934C20.2794 4.65804 19.8978 4.5 19.5 4.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6L12 13.5L21 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 연락처 모달 */}
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </>
  );
}
