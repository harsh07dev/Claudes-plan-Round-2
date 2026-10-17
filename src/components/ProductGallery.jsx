import React, { useState } from 'react';

export function ProductGallery({ mainImage, hoverImage, title }) {
  const images = [
    mainImage,
    hoverImage,
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80"
  ];

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={`w-14 h-14 rounded border-2 overflow-hidden flex-shrink-0 transition-all ${
              activeImage === img ? 'border-navy shadow-sm' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <img src={img} alt={`${title} view ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main hero image */}
      <div className="flex-1 aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center">
        <img src={activeImage} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
