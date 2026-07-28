import React, { useState, useEffect } from 'react';
import { getBlogs } from '../api/api'; 

// Local Asset Import
import resourcesHeroBg from '../assets/premium-contact-hero.png'; 

const Resources = () => {
  // Hardcoded initialArticles removed; state initialized as empty array
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Blogs strictly from Backend API on Mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getBlogs();
        
        // Handle both response styles: direct array or { data: [...] }
        const blogData = Array.isArray(res) ? res : res?.data || [];
        
        if (blogData && blogData.length > 0) {
          // Backend data mapped to frontend structure
          const formattedBlogs = blogData.map((item, index) => ({
            id: item._id || index + 1,
            title: item.title || 'Untitled Article',
            description: item.description || item.content || 'No description available.',
            category: item.category || 'Blog',
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
            image: item.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            slug: item.slug || item._id || `blog-${index}`,
          }));
          setArticles(formattedBlogs);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Failed to fetch blogs from API:", err);
        setError("Could not load blogs from the server. Please try again later.");
        setArticles([]); // Strictly keeping it empty on error
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Frontend Filter Logic
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F8FAFC] font-sans text-slate-800 selection:bg-[#2a73ff] selection:text-white min-h-screen flex flex-col">
      
      {/* 1. HERO SECTION - Clean, Cinematic & Deep */}
      <section
        className="relative h-[38vh] min-h-[280px] flex items-center justify-center text-center px-6 bg-cover bg-center bg-no-repeat overflow-hidden group shadow-inner"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${resourcesHeroBg})`,
        }}
      >
        <div className="max-w-[1200px] mx-auto text-white w-full transition-all duration-500 group-hover:-translate-y-1">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-900/40 border border-blue-400/30 px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
            Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
            Insights &amp; <span className="bg-gradient-to-r from-white via-blue-200 to-slate-300 bg-clip-text text-transparent">Resources</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-[650px] mx-auto font-normal leading-relaxed opacity-90">
            Expert legal guidance, regulatory updates, and actionable corporate governance strategies.
          </p>
        </div>
      </section>

      {/* 2. TOOLBAR & SEARCH SECTION */}
      <section className="bg-white/90 backdrop-blur-md border-b border-gray-200/80 py-6 px-6 sticky top-16 md:top-20 z-30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 md:gap-6">
          
          {/* Search Box */}
          <div className="relative w-full md:max-w-[450px]">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-[#2a73ff]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or title..."
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm md:text-base text-gray-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#2a73ff] focus:ring-4 focus:ring-[#2a73ff]/10 transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'all'
                  ? 'bg-[#2a73ff] text-white shadow-md shadow-[#2a73ff]/25 scale-[1.02]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>All Insights</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('blog')}
              className={`px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'blog'
                  ? 'bg-[#2a73ff] text-white shadow-md shadow-[#2a73ff]/25 scale-[1.02]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>Blog</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('governance')}
              className={`px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'governance'
                  ? 'bg-[#2a73ff] text-white shadow-md shadow-[#2a73ff]/25 scale-[1.02]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>Governance</span>
            </button>
          </div>

        </div>
      </section>

      {/* Error Notice */}
      {error && (
        <div className="max-w-[1200px] mx-auto mt-6 px-6 w-full">
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium flex items-center gap-2">
            <span>⚠️ {error}</span>
          </div>
        </div>
      )}

      {/* 3. MAIN ARTICLES GRID SECTION */}
      <section className="py-16 px-6 flex-grow max-w-[1200px] w-full mx-auto">
        {loading ? (
          /* Loading State */
          <div className="text-center py-24 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#2a73ff] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 font-semibold text-base">Loading insights...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200/80 p-8 max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-[#2a73ff] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 className="text-slate-800 font-bold text-lg mb-1">No Articles Found</h3>
            <p className="text-slate-500 text-sm mb-6">We couldn't find any resources at the moment or matching your filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-5 py-2.5 bg-[#2a73ff] text-white font-semibold rounded-lg text-sm hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Blog Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_35px_-5px_rgba(42,115,255,0.12)] border border-gray-200/60 transition-all duration-300 flex flex-col group hover:-translate-y-2 cursor-pointer"
              >
                {/* Article Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/95 backdrop-blur-sm text-[#2a73ff] border border-blue-100 font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2.5">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <span>{article.date}</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-extrabold text-[#0F172A] group-hover:text-[#2a73ff] transition-colors line-clamp-2 mb-3 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 font-normal">
                      {article.description}
                    </p>
                  </div>

                  {/* Footer Link */}
                  <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                    <a
                      href={`https://legisproadvisors.com/${article.slug}/`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2a73ff] group-hover:text-[#1d4ed8] transition-colors"
                    >
                      <span>Read Full Article</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 4. DYNAMIC PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-semibold text-slate-700 hover:border-[#2a73ff] hover:text-[#2a73ff] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
            >
              Previous
            </button>
            
            <span className="w-10 h-10 flex items-center justify-center bg-[#2a73ff] text-white font-bold rounded-lg text-sm shadow-md shadow-blue-500/20">
              {currentPage}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-semibold text-slate-700 hover:border-[#2a73ff] hover:text-[#2a73ff] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* 5. FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/918368383581"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebd5a] text-white p-3.5 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:shadow-[0_0_25px_rgba(37,211,102,0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.883-.733-1.48-1.638-1.653-1.935-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.884-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
};

export default Resources;