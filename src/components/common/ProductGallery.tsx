"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  showedImage?: string;
  images: string[];
};

const ProductGallery = ({ showedImage, images }: ProductGalleryProps) => {
  const [activeImage, setActiveImage] = useState<string>(() =>
    showedImage || (images && images.length > 0) ? images[0] : ""
  );

  console.log("activeImage: ", activeImage);

  const handleImageClick = useCallback((image: string) => {
    setActiveImage(image);
  }, []);

  useEffect(() => {
    if (showedImage) {
      setActiveImage(showedImage);
    }
  }, [showedImage]);

  if (!images || images.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg h-[464px]">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4">
        <Image src={activeImage || images[0]} alt="Product main view" width={450} height={324} priority />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => {
          const isActive = image === activeImage;
          return (
            <button
              key={index}
              onClick={() => handleImageClick(image)}
              className={`relative flex-shrink-0 rounded-md overflow-hidden transition-all duration-200`}
              aria-label={`View image ${index + 1} of ${images.length}`}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                width={64}
                height={64}
                className={`w-24 h-24 object-cover cursor-pointer transition-opacity ${
                  isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ProductGallery);
