import React from 'react';

/**
 * Responsive image grid showing scraped picture assets with fallback handling.
 */
export default function ImageGallery({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
        <i className="fa-regular fa-image text-4xl text-slate-300 mb-3"></i>
        <p className="text-slate-500 font-medium">No images detected on this page.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((img, i) => (
        <div key={i} className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
          <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
            <img
              src={img}
              alt={`Scraped asset ${i + 1}`}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/300x300?text=Preview+Unavailable';
              }}
            />
          </div>
          <div className="p-2.5 bg-white flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-400 font-mono">#{i + 1}</span>
            <a
              href={img}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>View</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
