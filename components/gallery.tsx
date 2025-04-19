"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { GALLERY_IMAGES } from "@/constants/wedding";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

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
              sizes="(max-width: 768px) 50vw, 33vw"
              quality={75}
              loading={index < 4 ? "eager" : "lazy"}
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">
            {GALLERY_IMAGES[selectedImage].alt}
          </DialogTitle>
          <div
            className={
              "absolute left-4 top-2 z-50 text-white font-medium px-3 py-1.5 transition-opacity duration-300 opacity-100"
            }
          >
            {selectedImage + 1}/{GALLERY_IMAGES.length}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-2 z-50 p-2 text-white transition-all hover:text-white/80"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>

          <Swiper
            initialSlide={selectedImage}
            className="w-full h-full"
            modules={[]}
            onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
            style={
              {
                // Navigation 스타일 속성 제거
              } as React.CSSProperties
            }
          >
            {GALLERY_IMAGES.map((image, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100vw"
                    quality={90}
                    priority={Math.abs(index - selectedImage) <= 1}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </DialogContent>
      </Dialog>
    </section>
  );
}
