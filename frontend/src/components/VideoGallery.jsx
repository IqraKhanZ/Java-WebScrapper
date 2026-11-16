import React from 'react';

/**
 * Video list displaying HTML5 video players for extracted media.
 */
export default function VideoGallery({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
        <i className="fa-regular fa-circle-play text-4xl text-slate-300 mb-3"></i>
        <p className="text-slate-500 font-medium">No direct video files detected on this page.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((vid, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <video src={vid} controls className="w-full bg-black aspect-video"></video>
          <div className="p-3 bg-white flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-500 truncate mr-2 font-mono">{vid}</span>
            <a
              href={vid}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 shrink-0"
            >
              Open Direct
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
