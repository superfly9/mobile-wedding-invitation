"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { GALLERY_IMAGES } from "@/constants/wedding";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImage < GALLERY_IMAGES.length - 1) {
      setSelectedImage((prev) => prev + 1);
    }

    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage((prev) => prev - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && selectedImage > 0) {
        setSelectedImage((prev) => prev - 1);
      }
      if (e.key === "ArrowRight" && selectedImage < GALLERY_IMAGES.length - 1) {
        setSelectedImage((prev) => prev + 1);
      }
    },
    [selectedImage]
  );

  return (
    <section className="w-full py-12 px-4 bg-white">
      <h2 className="text-2xl text-center serif-font mb-8 decorative-line">
        우리의 추억
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {GALLERY_IMAGES.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer"
            onClick={() => {
              setSelectedImage(index);
              setOpen(true);
            }}
          >
            <Image
              src={image.src}
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
            {GALLERY_IMAGES[selectedImage].alt}
          </DialogTitle>
          <div className="absolute left-4 top-4 z-50 text-white font-medium">
            {selectedImage + 1}/{GALLERY_IMAGES.length}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-sm text-white opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
          <div
            className="relative w-full h-screen"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={GALLERY_IMAGES[selectedImage].src}
              alt={GALLERY_IMAGES[selectedImage].alt}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
            {selectedImage > 0 && (
              <button
                onClick={() => setSelectedImage((prev) => prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/50 text-white"
                aria-label="이전 이미지"
              >
                ←
              </button>
            )}
            {selectedImage < GALLERY_IMAGES.length - 1 && (
              <button
                onClick={() => setSelectedImage((prev) => prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/50 text-white"
                aria-label="다음 이미지"
              >
                →
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
