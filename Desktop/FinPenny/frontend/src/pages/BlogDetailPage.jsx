import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, User, Calendar, Tag, ArrowLeft, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const API = 'http://localhost:8000/api';

function stripHtml(html) {
  return html ? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [navigation, setNavigation] = useState({ prev: null, next: null });
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchSidebar();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/blog/posts/${slug}`);
      const data = await res.json();
      if (data.success) {
        setPost(data.data);
        if (data.data.tags) {
          const tagList = data.data.tags.split(',').map(t => t.trim()).filter(t => t);
          setTags(tagList);
        }
        const navRes = await fetch(`${API}/blog/posts/${slug}/navigation`);
        const navData = await navRes.json();
        if (navData.success) setNavigation(navData.data);
      } else navigate('/blog');
    } catch (e) { navigate('/blog'); }
    setLoading(false);
  };

  const fetchSidebar = async () => {
    try {
      const postsRes = await fetch(`${API}/blog/posts`);
      const postsData = await postsRes.json();
      
      if (postsData.success) {
        setRecentPosts(postsData.data.slice(0, 5));

        const categoryMap = {};
        
        postsData.data.forEach(p => {
          if (p.category_name && p.category_slug) {
            if (!categoryMap[p.category_slug]) {
              categoryMap[p.category_slug] = {
                name: p.category_name,
                slug: p.category_slug,
                count: 0
              };
            }
            categoryMap[p.category_slug].count += 1;
          }
        });
        
        const uniqueCategories = Object.values(categoryMap);
        setCategories(uniqueCategories);
      }
    } catch (e) {
        console.error("Sidebar fetch error:", e);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#2B5A84] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[550px] w-full flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a3a5a 0%, #2B5A84 60%, #1a3a5a 100%)',
          minHeight: 240,
        }}
      >
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `url('/images/Untitled-design-12.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container px-22 relative pt-40 z-10 mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-white text-6xl md:text-6xl font-bold  mb-5 tracking-tight">
              Blog
            </h1>
            <div className="flex items-center space-x-3 text-white/90 font-medium text-lg">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <div className="flex items-center">
                <div className="w-8 h-[1px] bg-white/60"></div>
                <ChevronRight size={18} className="-ml-1" />
              </div>
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <div className="flex items-center">
                <div className="w-8 h-[1px] bg-white/60"></div>
                <ChevronRight size={18} className="-ml-1" />
              </div>
              <span className="text-white/80 line-clamp-1 max-w-[300px]">
                {post.title}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mb-40 mx-auto px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10">

            <div className="flex-1 min-w-0 overflow-y-auto" >
              <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                {post.cover_image && (
                  <div style={{ aspectRatio: `${post.image_width || 1200} / ${post.image_height || 630}` }} className="relative overflow-hidden w-full bg-gray-100">
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-8">
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.slice(0, 7).map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#2B5A84] px-3 py-1.5 rounded-full">
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {post.category_name && (
                    <Link
                      to={`/blog?category=${post.category_slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B5A84] mb-4 hover:underline"
                    >
                      <Tag size={12} />
                      {post.category_name}
                    </Link>
                  )}

                  <h1 className="text-2xl lg:text-3xl font-bold text-[#2B5A84] leading-tight mb-5">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100 flex-wrap">
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <Calendar size={14} />
                      <span>
                        {new Date(post.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'long', year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div
                    className="blog-content prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    style={{ lineHeight: 1.85, color: '#374151', fontSize: '15px' }}
                  />

                  {/* Navigation Section Update */}
                  <div className="mt-16 pt-10 border-t border-gray-100">
                    <div className="flex flex-wrap items-center justify-between gap-8">
                      
                      {/* Previous Button */}
                      {navigation.prev ? (
                        <Link to={`/blog/${navigation.prev.slug}`} className="flex items-center gap-4 group max-w-[320px]">
                          <div className="w-14 h-14 rounded-full border border-[#D1DBE8] bg-white flex items-center justify-center text-[#2B5A84]/60 group-hover:border-red-500 group-hover:bg-[#FFF5F5] group-hover:text-red-600 group-hover:scale-105 group-hover:-translate-x-1 transition-all duration-300">
                            <ChevronLeft size={24} strokeWidth={3} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-[#2B5A84]/50 uppercase tracking-[2px] mb-1 group-hover:text-red-400 transition-colors duration-300">Prev Service</span>
                            <span className="text-lg font-black text-[#2B5A84]/80 uppercase leading-tight group-hover:text-red-700 transition-colors duration-300">
                              {navigation.prev.title}
                            </span>
                          </div>
                        </Link>
                      ) : <div />}

                      {/* Next Button */}
                      {navigation.next ? (
                        <Link to={`/blog/${navigation.next.slug}`} className="flex items-center gap-4 group text-right ml-auto max-w-[320px]">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-[#2B5A84]/50 uppercase tracking-[2px] mb-1 group-hover:text-red-400 transition-colors duration-300">Next Service</span>
                            <span className="text-lg font-black text-[#2B5A84]/80 uppercase leading-tight group-hover:text-red-700 transition-colors duration-300">
                              {navigation.next.title}
                            </span>
                          </div>
                          <div className="w-14 h-14 rounded-full border border-[#D1DBE8] bg-white flex items-center justify-center text-[#2B5A84]/60 group-hover:border-red-500 group-hover:bg-[#FFF5F5] group-hover:text-red-600 group-hover:scale-105 group-hover:translate-x-1 transition-all duration-300">
                            <ChevronRight size={24} strokeWidth={3} />
                          </div>
                        </Link>
                      ) : <div />}
                    </div>

                    <div className="mt-12 text-center">
                      <Link to="/blog" className="inline-flex items-center gap-2 text-[#2B5A84] text-sm font-semibold hover:text-red-600 transition-all duration-300 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to All Posts
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <aside className="w-full lg:w-72 flex-shrink-0 space-y-6 lg:sticky lg:top-10 lg:h-fit">
              {/* Search */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="flex-1 px-4 py-3 text-sm outline-none text-gray-700"
                  />
                  <button
                    onClick={() => searchQuery.trim() && navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`)}
                    className="px-4 text-gray-400 hover:text-[#2B5A84] transition-colors"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>

              {/* Categories Widget */}
              {categories.length > 0 && (
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                  <div className="bg-[#487199] p-4">
                    <h3 className="text-white text-base font-bold tracking-wide">
                      Categories
                    </h3>
                  </div>
                  <div className="p-2 space-y-1">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/blog?category=${c.slug}`}
                        className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold text-[#2B5A84] hover:bg-slate-50 transition-colors"
                      >
                        <span>{c.name}</span>
                        <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          ({c.count})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Articles */}
              {recentPosts.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-[#2B5A84] text-white px-5 py-3 font-semibold text-sm">Recent Articles</div>
                  <div className="p-4 space-y-4">
                    {recentPosts.map(p => (
                      <Link key={p.id} to={`/blog/${p.slug}`} className="flex gap-3 group">
                        <div className="flex-shrink-0 w-14 h-12 rounded-lg overflow-hidden bg-[#e8f1f8]">
                          {p.cover_image ? (
                            <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#2B5A84] text-xs font-bold opacity-40">F</div>
                          )}
                        </div>
                        <div>
                          <p className={`text-xs font-medium leading-snug group-hover:underline line-clamp-2 ${p.slug === slug ? 'text-[#D9231D]' : 'text-[#2B5A84]'}`}>
                            {p.title}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-1">
                            {new Date(p.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .blog-content h1,.blog-content h2,.blog-content h3,.blog-content h4{
          color:#2B5A84;font-weight:700;margin-top:1.6em;margin-bottom:0.6em;line-height:1.3
        }
        .blog-content h1{font-size:1.8em}
        .blog-content h2{font-size:1.4em}
        .blog-content h3{font-size:1.15em}
        .blog-content h4{font-size:1em}
        .blog-content p{margin-bottom:1.1em}
        .blog-content ul,.blog-content ol{padding-left:1.5em;margin-bottom:1.1em}
        .blog-content li{margin-bottom:0.4em}
        .blog-content a{color:#2B5A84;text-decoration:underline}
        .blog-content a:hover{color:#1a3a5a}
        .blog-content strong{color:#1a2332;font-weight:600}
        .blog-content blockquote{border-left:4px solid #2B5A84;background:#f0f7ff;padding:12px 18px;border-radius:0 8px 8px 0;margin:1.2em 0;color:#374151;font-style:italic}
        .blog-content code{background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:0.88em;color:#1a3a5a}
        .blog-content pre{background:#1a2332;color:#e2e8f0;padding:16px;border-radius:8px;overflow-x:auto;margin:1.2em 0}
        .blog-content img{max-width:100%;border-radius:10px;margin:1em 0}
        .blog-content hr{border:none;border-top:1px solid #e8edf3;margin:1.8em 0}
      `}</style>
    </>
  );
};

export default BlogDetailPage;