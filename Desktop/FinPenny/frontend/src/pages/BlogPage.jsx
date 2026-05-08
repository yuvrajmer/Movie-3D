import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft, User, Tag, Calendar } from 'lucide-react';

const API = 'http://localhost:8000/api';
const POSTS_PER_PAGE = 9;

const BlogHero = () => (
  <section
    className="relative h-[550px] w-full flex items-center overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, #1a3a5a 0%, #2B5A84 60%, #1a3a5a 100%)',
      minHeight: 240,
    }}
  >
    <div
      className="absolute inset-0 z-0 opacity-60"
      style={{
        backgroundImage: `url('/images/Untitled-design-12.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <div className="container px-22 relative pt-40 z-10">
      <div className="max-w-4xl">
        {/* Main Heading */}
        <h1 className="text-white text-6xl md:text-6xl font-bold mb-5 tracking-tight">
          Blog
        </h1>

        {/* Breadcrumbs */}
        <div className="flex items-center space-x-3 text-white/90 font-medium text-lg">
          <span className="hover:text-white cursor-pointer transition-colors">Home</span>
          
          <div className="flex items-center">
            <div className="w-8 h-[1px] bg-white/60"></div>
            <ChevronRight size={18} className="-ml-1" />
          </div>

          <span className="text-white/70">Blog</span>
        </div>
      </div>
    </div>
  </section>
);

const BlogCard = ({ post }) => {
  // Limit excerpt to 120 characters for better card layout
  const excerpt = post.excerpt 
    ? post.excerpt.substring(0, 120) + (post.excerpt.length > 120 ? '...' : '') 
    : stripHtml(post.content).substring(0, 120) + '...';
  
  // Get image dimensions for proper aspect ratio
  const imgWidth = post.image_width || 1200;
  const imgHeight = post.image_height || 630;
  const aspectRatio = imgHeight / imgWidth;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
      {/* Cover Image with proper aspect ratio */}
      <div 
        className="relative overflow-hidden bg-gradient-to-br from-[#e8f1f8] to-[#c8dff0]" 
        style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}
      >
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2B5A84] to-[#1a3a5a]">
            <span className="text-white opacity-30 text-6xl font-bold">F</span>
          </div>
        )}
        {/* Category badge over image */}
        {post.category_name && (
          <span
            className="absolute bottom-4 left-4 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm"
            style={{ background: 'rgba(43, 90, 132, 0.9)' }}
          >
            {post.category_name}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(post.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        <hr className="border-gray-100 mb-4" />

        {/* Title */}
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-lg font-bold text-[#2B5A84] leading-tight mb-3 group-hover:text-[#D9231D] line-clamp-2 transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
          {excerpt}
        </p>

        {/* Continue Reading Button */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[#2B5A84] text-sm font-semibold hover:text-[#D9231D] hover:gap-3 transition-all"
        >
          <ArrowRight size={16} />
          Continue Reading
        </Link>
      </div>
    </div>
  );
};

function stripHtml(html) {
  return html ? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchPosts(1);
  }, [activeCategory, searchQuery]);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      let url = `${API}/blog/posts`;
      const params = new URLSearchParams();
      
      if (activeCategory) params.set('category', activeCategory);
      if (searchQuery) params.set('search', searchQuery);
      
      // Add pagination
      params.set('limit', POSTS_PER_PAGE);
      params.set('offset', (page - 1) * POSTS_PER_PAGE);
      
      if (params.toString()) url += '?' + params.toString();

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setPosts(data.data);
        setTotalPosts(data.total);
        
        // Only show categories that have published blogs
        const categoriesInPosts = new Set();
        data.data.forEach(post => {
          if (post.category_name) {
            categoriesInPosts.add(JSON.stringify({ 
              id: post.category_id, 
              name: post.category_name, 
              slug: post.category_slug 
            }));
          }
        });
        
        const uniqueCategories = Array.from(categoriesInPosts).map(c => JSON.parse(c));
        setCategories(uniqueCategories);
      }
    } catch (e) {
      console.error('Error fetching posts:', e);
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchPosts(newPage);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <>
      <BlogHero />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          
          {/* Filters Section */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[#2B5A84] focus:outline-none transition-colors text-gray-700"
              />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-sm font-semibold text-gray-700">Filter by Category:</span>
                <button
                  onClick={() => setActiveCategory('')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all text-sm ${
                    activeCategory === ''
                      ? 'bg-[#2B5A84] text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-[#2B5A84]'
                  }`}
                >
                  All Articles
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all text-sm whitespace-nowrap ${
                      activeCategory === cat.slug
                        ? 'bg-[#D9231D] text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-[#2B5A84]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Posts Grid */}
          <div className="mb-12">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="w-12 h-12 border-4 border-[#2B5A84] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-2xl">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-2xl font-bold text-gray-800 mb-2">No posts found</p>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && !loading && posts.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:border-[#2B5A84] hover:text-[#2B5A84] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-[#2B5A84] text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-[#2B5A84] hover:text-[#2B5A84]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:border-[#2B5A84] hover:text-[#2B5A84] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Pagination Info */}
          {totalPages > 1 && !loading && posts.length > 0 && (
            <div className="text-center mt-8 text-gray-600">
              <p className="text-sm">
                Showing {(currentPage - 1) * POSTS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * POSTS_PER_PAGE, totalPosts)} of {totalPosts} articles
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;