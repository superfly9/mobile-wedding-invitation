"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { WEDDING_LOCATION } from "@/constants/wedding";

declare global {
  interface Window {
    naver: any;
  }
}

export default function LocationInfo() {
  const [copied, setCopied] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const copyAddress = () => {
    navigator.clipboard.writeText(`${WEDDING_LOCATION.ADDRESS.ROAD}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || mapInstance.current) return;

      const latitude = 37.510232;
      const longitude = 127.063196;

      try {
        // 네이버 지도 초기화
        const mapOptions = {
          center: new window.naver.maps.LatLng(latitude, longitude), // 위도(latitude), 경도(longitude)
          zoom: 15,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
        };

        mapInstance.current = new window.naver.maps.Map(
          mapRef.current,
          mapOptions
        );

        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latitude, longitude),
          map: mapInstance.current,
          title: WEDDING_LOCATION.NAME,
        });
      } catch (error) {
        console.error("네이버 지도 초기화 실패:", error);
      }
    };

    initMap();
  }, []);

  return (
    <section className="w-full py-12 px-4">
      <h2 className="text-2xl text-center serif-font mb-6">오시는 길</h2>

      <div className="text-center space-y-2 mb-8">
        <div className="text-lg font-medium">{WEDDING_LOCATION.NAME}</div>
        <div className="text-gray-600">{WEDDING_LOCATION.ADDRESS.ROAD}</div>
        <div className="text-gray-600">{WEDDING_LOCATION.PHONE}</div>
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
          href={`tel:${WEDDING_LOCATION.PHONE}`}
          className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
        >
          <Phone className="w-4 h-4" />
          전화
        </a>
      </div>

      <div
        ref={mapRef}
        className="w-full h-[300px] rounded-md overflow-hidden mb-8"
      />

      <div className="flex justify-center gap-4 mb-8">
        <a
          href={WEDDING_LOCATION.MAP_LINKS.KAKAO}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Image
            src="/images/icons/icon_kakao.png"
            alt="카카오맵"
            width={24}
            height={24}
            className="rounded-full"
          />
          카카오내비
        </a>
        <a
          href={WEDDING_LOCATION.MAP_LINKS.NAVER}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Image
            src="/images/icons/icon_navermap.png"
            alt="네이버지도"
            width={24}
            height={24}
            className="rounded-full"
          />
          네이버 지도
        </a>
      </div>

      <Tabs defaultValue="subway" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subway">지하철</TabsTrigger>
          <TabsTrigger value="bus">버스</TabsTrigger>
          <TabsTrigger value="car">주차</TabsTrigger>
        </TabsList>
        <TabsContent value="subway" className="p-4 bg-white rounded-md mt-2">
          <p className="text-sm">지하철 2호선 삼성역 7번출구 바로 앞</p>
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
              * 더 베일리하우스는 대중교통을 이용하시기 매우 편리합니다.
              <br />
              주변 교통이 혼잡하여 주차 시간이 많이 소요될 수 있으니
              <br />
              가급적 편리한 대중교통을 이용해 주시기 바랍니다.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="car" className="p-4 bg-white rounded-md mt-2">
          <p className="text-sm">
            주차는 더베일리하우스 근처 대화빌딩에 가능합니다.
            <br />
            (식장 도보 3분)
          </p>
        </TabsContent>
      </Tabs>
    </section>
  );
}
