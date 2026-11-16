import React from 'react';

/**
 * Search and URL input form with demo suggestions.
 */
export default function SearchBar({ url, setUrl, onSubmit, loading }) {
  const demoUrls = [
    { label: 'Wikipedia (India)', url: 'https://en.wikipedia.org/wiki/India' },
    { label: 'Hacker News', url: 'https://news.ycombinator.com' },
    { label: 'GitHub Explore', url: 'https://github.com/explore' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Demo Pill Buttons */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-slate-400 font-medium">Try an example:</span>
        {demoUrls.map((demo, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setUrl(demo.url)}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 font-medium transition-colors"
          >
            {demo.label}
          </button>
        ))}
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={onSubmit} className="bg-white rounded-2xl p-3 shadow-lg shadow-slate-200/50 border border-slate-200">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i className="fa-solid fa-link text-sm"></i>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter target URL (e.g., https://example.com)"
              className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-md transition-all flex items-center justify-center space-x-2 shrink-0 ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                <span>Scraping...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-magnifying-glass text-sm"></i>
                <span>Scrape Website</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
