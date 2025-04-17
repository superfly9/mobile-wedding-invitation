"use client";

import { Calendar } from "lucide-react";

export default function DateInfo() {
  return (
    <section className="w-full py-16 px-4">
      <h2 className="text-2xl text-center serif-font mb-12 decorative-line">
        예식 일시
      </h2>

      <div className="text-center space-y-4 mb-8">
        <div className="text-lg">2025년 06월 06일 (금) 오후 12시 30분</div>
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50">
          <Calendar className="w-4 h-4" />
          캘린더에 저장
        </button>
      </div>
    </section>
  );
}
