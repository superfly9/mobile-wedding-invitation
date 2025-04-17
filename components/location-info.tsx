"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function LocationInfo() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(
      "서울 강남구 영동대로 506\n서울 강남구 삼성동 168-3"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-16 px-4">
      <h2 className="text-2xl text-center serif-font mb-12 decorative-line">
        오시는 길
      </h2>

      <div className="text-center space-y-2 mb-8">
        <div className="text-lg font-medium">더베일리하우스 삼성 2층</div>
        <div className="text-gray-600">서울 강남구 영동대로 506</div>
        <div className="text-gray-600">서울 강남구 삼성동 168-3</div>
        <div className="text-gray-600">02-539-2956</div>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={copyAddress}
          className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
        >
          <MapPin className="w-4 h-4" />
          {copied ? "복사됨" : "주소 복사"}
        </button>
        <a
          href="tel:02-539-2956"
          className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
        >
          <Phone className="w-4 h-4" />
          전화
        </a>
      </div>

      <div className="w-full h-[300px] relative mb-8">
        <Image
          src="/images/map.png"
          alt="더베일리하우스 삼성점 지도"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <a
          href="https://map.kakao.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Image
            src="/images/kakao-map.png"
            alt="카카오맵"
            width={24}
            height={24}
          />
          카카오내비
        </a>
        <a
          href="https://map.naver.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Image
            src="/images/naver-map.png"
            alt="네이버지도"
            width={24}
            height={24}
          />
          네이버 지도
        </a>
        <a
          href="https://tmap.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Image src="/images/tmap.png" alt="티맵" width={24} height={24} />
          티맵
        </a>
      </div>

      <Tabs defaultValue="subway" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subway">지하철</TabsTrigger>
          <TabsTrigger value="bus">버스</TabsTrigger>
          <TabsTrigger value="car">주차</TabsTrigger>
        </TabsList>
        <TabsContent value="subway" className="p-4 bg-white rounded-md mt-2">
          <p className="text-sm">지하철 2호선 삼성중앙 7번출구 바로 앞</p>
        </TabsContent>
        <TabsContent value="bus" className="p-4 bg-white rounded-md mt-2">
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">[간선버스]</span> 143, 146, 301,
              342, 343, 345, 401, 8146, N61(심야)
            </p>
            <p>
              <span className="font-medium">[지선버스]</span> 2413, 2415, 3217,
              3412, 3414, 3417, 4318
            </p>
            <p>
              <span className="font-medium">[광역버스]</span> 9407, 9507, 9607
            </p>
            <p className="text-gray-500 mt-2 text-xs">
              * 더 베일의 하우스는 대중교통을 이용하시기 매우 편리합니다.
              <br />
              주변 교통이 혼잡하여 주차 시간이 많이 소요될 수 있으니
              <br />
              가급적 편리한 대중교통을 이용해 주시기 바랍니다.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="car" className="p-4 bg-white rounded-md mt-2">
          <p className="text-sm">
            주차는 더베일리하우스 앞에서 안내 받으시기 바랍니다.
          </p>
        </TabsContent>
      </Tabs>
    </section>
  );
}
