import React, { useState, useEffect } from 'react';
import { getBlogs } from '../api/api';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from backend on component mount
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await getBlogs();
        
        // Assuming your backend returns { success: true, count: N, data: [...] }
        if (response && response.data) {
          setBlogs(response.data);
        } else if (Array.isArray(response)) {
          setBlogs(response);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch blogs:", err.message);
        setError("Unable to load latest insights at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  // Helper function to format MongoDB ISO dates to a clean string
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="py-20 md:py-28 bg-[#f8fafc] font-sans relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-18">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
            Latest Insights
          </h2>
          <p className="text-[#475569] text-base sm:text-lg leading-relaxed font-normal">
            Thoughtful perspectives on compliance, governance, transactions, and the evolving regulatory landscape.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#2a73ff] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg font-medium">No blog posts published yet. Please check back later!</p>
          </div>
        )}

        {/* Blog Cards Grid */}
        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-14">
            {blogs.map((blog) => (
              <article 
                key={blog._id || blog.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(42,115,255,0.12)] border border-gray-100/80 transition-all duration-300 ease-out hover:-translate-y-2 flex flex-col justify-between"
              >
                
                <div>
                  {/* Image Wrapper with Smooth Hover Zoom */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-gray-100">
                    <img 
                      src={blog.image || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                      alt={blog.title || 'Blog cover'} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                    />
                  </div>

                  {/* Card Content Container */}
                  <div className="p-6 sm:p-8">
                    
                    {/* Meta Info (Category & Date) */}
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider mb-4">
                      <span className="bg-blue-50 text-[#2a73ff] px-3 py-1 rounded-full border border-blue-100">
                        {blog.category || 'Blog'}
                      </span>
                      <span className="text-gray-400 font-semibold">
                        {formatDate(blog.createdAt || blog.date)}
                      </span>
                    </div>

                    {/* Blog Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-3 group-hover:text-[#2a73ff] transition-colors duration-200 line-clamp-2">
                      <a href={blog.url || `/blog/${blog._id || blog.id}`} className="no-underline">
                        {blog.title}
                      </a>
                    </h3>

                    {/* Blog Description */}
                    <p className="text-[#475569] text-base leading-relaxed font-normal line-clamp-3">
                      {blog.description || blog.desc}
                    </p>

                  </div>
                </div>

                {/* Card Footer / Read More Button */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                  <a 
                    href={blog.url || `/blog/${blog._id || blog.id}`} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2a73ff] hover:text-[#1d5bcc] transition-all duration-200 group/link"
                  >
                    <span>Read Article</span>
                    <svg 
                      className="w-4 h-4 stroke-current transition-transform duration-200 group-hover/link:translate-x-1.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>

              </article>
            ))}
          </div>
        )}

        {/* CTA Button Section */}
        <div className="text-center">
          <a 
            href="/resources" 
            className="inline-block bg-[#2a73ff] hover:bg-[#1d5bcc] text-white font-semibold px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-base active:scale-95 cursor-pointer"
          >
            View All Insights
          </a>
        </div>

      </div>
    </section>
  );
}

export default Blogs;