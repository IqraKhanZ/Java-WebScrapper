import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import StatsCards from './components/StatsCards.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import VideoGallery from './components/VideoGallery.jsx';
import LinksList from './components/LinksList.jsx';

/**
 * Main Root Component for the Java Web Scraper React UI.
 * 
 * @author Iqra Khan (https://github.com/IqraKhanZ)
 */
export default function App() {
  // State hooks
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('images');

  // Trigger web scraping request to Spring Boot API
  const handleScrape = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a website URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Connect to Spring Boot REST API
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(url.trim())}`);
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const result = await response.json();

      if (result.success === false) {
        setError(result.message || 'Scraping failed.');
      } else {
        setData(result);
        if (result.images && result.images.length > 0) {
          setActiveTab('images');
        } else if (result.links && result.links.length > 0) {
          setActiveTab('links');
        }
      }
    } catch (err) {
      setError('Failed to reach backend server. Make sure Spring Boot is running on port 8181.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 mb-3">
            Fast &bull; Clean &bull; Full-Stack Extractor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Web Content Extractor
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Enter any website address to inspect and extract all hosted images, media clips, and hyperlinks in real time.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          url={url}
          setUrl={setUrl}
          onSubmit={handleScrape}
          loading={loading}
        />

        {/* Error Alert Box */}
        {error && (
          <div className="max-w-3xl mx-auto mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-3 text-red-800 text-sm">
            <i className="fa-solid fa-circle-exclamation text-red-500 text-base mt-0.5"></i>
            <div>
              <p className="font-semibold">Unable to scrape</p>
              <p className="text-xs text-red-700 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Scraped Results Display */}
        {data && (
          <div className="mt-6">
            <StatsCards data={data} />

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 mt-8 mb-6 space-x-2">
              <button
                onClick={() => setActiveTab('images')}
                className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center space-x-2 ${
                  activeTab === 'images'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <i className="fa-regular fa-image"></i>
                <span>Images</span>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                  {data.totalImages || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center space-x-2 ${
                  activeTab === 'videos'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <i className="fa-solid fa-video"></i>
                <span>Videos</span>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                  {data.totalVideos || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('links')}
                className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center space-x-2 ${
                  activeTab === 'links'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <i className="fa-solid fa-link"></i>
                <span>Links</span>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                  {data.totalLinks || 0}
                </span>
              </button>
            </div>

            {/* Active Tab View */}
            <div>
              {activeTab === 'images' && <ImageGallery images={data.images} />}
              {activeTab === 'videos' && <VideoGallery videos={data.videos} />}
              {activeTab === 'links' && <LinksList links={data.links} />}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Developed by <span className="font-semibold text-slate-700">Iqra Khan</span> &bull;{' '}
            <a href="https://github.com/IqraKhanZ" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
              @IqraKhanZ
            </a>
          </p>
          <p className="text-slate-400">Powered by Spring Boot 3 &bull; Jsoup &bull; React</p>
        </div>
      </footer>
    </div>
  );
}
