import React from 'react';

/**
 * Top navigation bar displaying branding and author links.
 */
export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <i className="fa-solid fa-spider text-lg"></i>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
              Java Web Scraper
            </h1>
            <p className="text-xs text-slate-500 font-medium">Spring Boot &bull; Jsoup &bull; React</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <i className="fa-solid fa-code text-indigo-500 mr-1.5"></i> By Iqra Khan
          </span>
          <a
            href="https://github.com/IqraKhanZ/Java-WebScrapper"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-sm text-slate-600 hover:text-indigo-600 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <i className="fa-brands fa-github text-lg"></i>
            <span className="hidden md:inline">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
