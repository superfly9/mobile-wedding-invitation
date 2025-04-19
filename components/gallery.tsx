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
              "absolute left-4 top-4 z-50 text-white/80 font-medium px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm transition-opacity duration-300 opacity-100"
            }
          >
            {selectedImage + 1}/{GALLERY_IMAGES.length}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-full bg-black/30 backdrop-blur-sm p-2 text-white/80 transition-all hover:bg-black/50 hover:text-white"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>

          <Swiper
            initialSlide={selectedImage}
            className="w-full h-full"
            style={
              {
                "--swiper-navigation-color": "#fff",
                "--swiper-navigation-size": "24px",
                "--swiper-navigation-sides-offset": "20px",
                "--swiper-navigation-background-color": "rgba(0, 0, 0, 0.3)",
                "--swiper-navigation-backdrop-filter": "blur(4px)",
                "--swiper-navigation-padding": "12px",
                "--swiper-navigation-border-radius": "9999px",
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
