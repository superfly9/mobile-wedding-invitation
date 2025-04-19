"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { GALLERY_IMAGES } from "@/constants/wedding";

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
          <div className="relative w-full h-screen">
            <Image
              src={GALLERY_IMAGES[selectedImage].src}
              alt={GALLERY_IMAGES[selectedImage].alt}
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
