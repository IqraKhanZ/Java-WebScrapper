import React, { useState } from 'react';

/**
 * Filterable and copyable list of scraped hyperlinks.
 */
export default function LinksList({ links }) {
  const [filter, setFilter] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!links || links.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
        <i className="fa-solid fa-link text-4xl text-slate-300 mb-3"></i>
        <p className="text-slate-500 font-medium">No hyperlinks found on this page.</p>
      </div>
    );
  }

  const filteredLinks = links.filter((l) =>
    l.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCopy = (link, idx) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Showing {filteredLinks.length} of {links.length} Links
        </span>
        <div className="relative w-full sm:w-72">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter links..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
        {filteredLinks.map((link, idx) => (
          <div key={idx} className="p-3 hover:bg-slate-50 flex items-center justify-between gap-4 text-xs">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 hover:text-indigo-600 font-medium truncate flex-1 flex items-center space-x-2"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400"></i>
              <span className="truncate">{link}</span>
            </a>
            <button
              onClick={() => handleCopy(link, idx)}
              className="shrink-0 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors font-medium text-[11px]"
              title="Copy link"
            >
              {copiedIndex === idx ? (
                <span className="text-emerald-600 font-bold">
                  <i className="fa-solid fa-check mr-1"></i> Copied
                </span>
              ) : (
                <span>
                  <i className="fa-regular fa-copy mr-1"></i> Copy
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
