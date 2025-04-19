"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ThumbnailUploader() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileInputRef.current?.files?.[0]) {
      setMessage({ type: "error", text: "이미지를 선택해주세요." });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);

      const response = await fetch("/api/thumbnail", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "업로드 중 오류가 발생했습니다.");
      }

      setMessage({
        type: "success",
        text: "썸네일 이미지가 성공적으로 변경되었습니다. 변경사항을 확인하려면 페이지를 새로고침하세요.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "이미지 업로드 중 오류가 발생했습니다.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          썸네일 이미지 (권장 크기: 1200 x 630px)
        </label>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            이미지 선택
          </Button>
          <span className="text-sm text-gray-500">
            {fileInputRef.current?.files?.[0]?.name || "선택된 파일 없음"}
          </span>
        </div>

        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {previewImage && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">미리보기:</p>
          <div className="relative w-full aspect-[1200/630] bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={previewImage}
              alt="썸네일 미리보기"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      {message && (
        <div
          className={`p-3 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-[#d4b78f] hover:bg-[#c0a57d]"
        disabled={isUploading || !previewImage}
      >
        {isUploading ? "업로드 중..." : "썸네일 이미지 변경"}
      </Button>
    </form>
  );
}
