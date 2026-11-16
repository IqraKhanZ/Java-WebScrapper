import React from 'react';

/**
 * Metric summary cards showing total extracted counts and page title.
 */
export default function StatsCards({ data }) {
  const stats = [
    { label: 'Images Found', value: data.totalImages || 0, icon: 'fa-image', color: 'from-blue-500 to-cyan-500' },
    { label: 'Videos Found', value: data.totalVideos || 0, icon: 'fa-video', color: 'from-purple-500 to-pink-500' },
    { label: 'Links Extracted', value: data.totalLinks || 0, icon: 'fa-link', color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="mt-8">
      {/* Page Title Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
            <i className="fa-solid fa-globe text-sm"></i>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Target Page Title</p>
            <h3 className="text-lg font-bold text-slate-800 truncate">{data.title || 'Untitled Page'}</h3>
            <p className="text-xs text-indigo-600 truncate mt-0.5 font-medium">{data.url}</p>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-xl shadow-md`}>
              <i className={`fa-solid ${s.icon}`}></i>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
              <h4 className="text-2xl font-black text-slate-800">{s.value}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
