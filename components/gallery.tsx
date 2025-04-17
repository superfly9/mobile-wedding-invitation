"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    { src: "/images/bride-portrait.jpg", alt: "신부 단독" },
    {
      src: "/images/bride-beige-portrait.jpg",
      alt: "베이지 드레스 신부 단독",
    },
    {
      src: "/images/groom-beige-portrait.jpg",
      alt: "베이지 정장 신랑 단독",
    },
    { src: "/images/couple-beige-hands.jpg", alt: "베이지 드레스 손잡은 커플" },
    {
      src: "/images/couple-beige-facing.jpg",
      alt: "베이지 드레스 마주보는 커플",
    },
    {
      src: "/images/couple-beige-formal.jpg",
      alt: "베이지 드레스 공손히 마주보는 커플",
    },
    { src: "/images/couple-beige-stairs.jpg", alt: "베이지 드레스 계단 커플" },
    { src: "/images/main-portrait.jpg", alt: "메인" },
    { src: "/images/couple-thumbnail.jpg", alt: "커플 썸네일" },
    { src: "/images/couple-black-heart.jpg", alt: "검정 드레스 하트 포즈" },
    { src: "/images/couple-black-smile.jpg", alt: "검정 드레스 웃는 커플" },
    {
      src: "/images/couple-black-facing.jpg",
      alt: "검정 드레스 마주보는 커플",
    },
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
    setOpen(true);
  };

  return (
    <section className="w-full py-16 px-4">
      <h2 className="text-2xl text-center serif-font mb-12 decorative-line">
        갤러리
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer"
            onClick={() => openModal(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-none p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">
            {images[selectedImage].alt}
          </DialogTitle>
          <div className="absolute left-4 top-4 z-50 text-white font-medium">
            {selectedImage + 1}/{images.length}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-sm text-white opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
          <div className="relative w-full h-screen">
            <Image
              src={images[selectedImage].src || "/placeholder.svg"}
              alt={images[selectedImage].alt}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
