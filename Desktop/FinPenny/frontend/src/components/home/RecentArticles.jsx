import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ShieldCheck } from "lucide-react";

const API = "http://localhost:8000/api";

const RecentArticles = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fixed: Added isVisible state and sectionRef
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetchRecentPosts();

    // Fixed: Added IntersectionObserver to track scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const res = await fetch(`${API}/blog/posts?limit=6`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data.slice(0, 6));
      }
    } catch (e) {
      console.error("Error fetching posts:", e);
    }
    setLoading(false);
  };

  const stripHtml = (html) => {
    return html
      ? html
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      : "";
  };

  return (
    // Fixed: Attached ref={sectionRef} to the section
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          {/* Red Badge Header */}
          <div
            className={`flex items-center justify-center space-x-3 text-[#D9231D] transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="bg-[#D9231D] p-1.5 rounded-full shadow-md">
              <ShieldCheck size={19} className="text-white" />
            </div>
            <span className="uppercase tracking-[0.2em] font-bold text-[14px]">
              Latest Blog
            </span>
          </div>

          <h2 className="text-4xl md:text-4xl text-[#2B5A84] ">
            Read our latest <span className="font-bold "> blog posts</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#2B5A84] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No articles available yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post, index) => {
                const excerpt = post.excerpt
                  ? post.excerpt.substring(0, 100) + "..."
                  : stripHtml(post.content).substring(0, 100) + "...";

                const imgWidth = post.image_width || 1200;
                const imgHeight = post.image_height || 630;

                return (
                  <div
                    key={post.id}
                    className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-1000 transform border border-gray-100 group flex flex-col h-full ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Image Container */}
                    <div
                      className="relative overflow-hidden bg-gradient-to-br from-[#e8f1f8] to-[#c8dff0]"
                      style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}
                    >
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2B5A84] to-[#1a3a5a]">
                          <span className="text-white opacity-30 text-5xl font-bold">
                            F
                          </span>
                        </div>
                      )}

                      {/* Category Badge */}
                      {post.category_name && (
                        <div className="absolute bottom-4 left-4">
                          <span className="inline-block bg-[#D9231D] text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                            {post.category_name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                        <Calendar size={14} />
                        {new Date(post.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>

                      <hr className="border-gray-100 mb-4" />

                      <Link to={`/blog/${post.slug}`}>
                        <h3 className="text-lg font-bold text-[#2B5A84] mb-3 group-hover:text-[#D9231D] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                        {excerpt}
                      </p>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-[#2B5A84] font-semibold text-sm hover:text-[#D9231D] group/link transition-all"
                      >
                        Read Article
                        <ArrowRight
                          size={16}
                          className="group-hover/link:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Line Section */}
            <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 mb-10">
              <style>
                {`
                    .running-line {
                      position: relative;
                      text-decoration: none !important;
                    }
                    .running-line::after {
                      content: '';
                      position: absolute;
                      width: 100%;
                      transform: scaleX(0);
                      height: 2px;
                      bottom: -4px;
                      left: 0;
                      background-color: #D9231D;
                      transform-origin: bottom right;
                      transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
                    }
                    .running-line:hover::after {
                      transform: scaleX(1);
                      transform-origin: bottom left;
                    }
                  `}
              </style>

              {/* Left Link */}
              <div className="flex items-center space-x-3 text-[#2B5A84]">
                <div className="flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#2B5A84] font-medium text-[17px]">
                    Need Investment Guidance?
                  </span>
                  <Link
                    to="/contact"
                    className="running-line text-[#2B5A84] font-bold text-[17px] hover:text-[#D9231D] transition-colors duration-300"
                  >
                    Connect with Us Today
                  </Link>
                </div>
              </div>

              {/* Right Link */}
              <div className="flex items-center space-x-3 text-[#2B5A84]">
                <div className="flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#2B5A84] font-medium text-[17px]">
                    Stay Connected
                  </span>
                  <a
                    href="https://www.instagram.com/finpenny_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="running-line text-[#2B5A84] font-bold text-[17px] hover:text-[#D9231D] transition-colors duration-300"
                  >
                    Follow Us on Instagram
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RecentArticles;
