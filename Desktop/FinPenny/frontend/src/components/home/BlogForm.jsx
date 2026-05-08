import React, { useState, useEffect } from 'react';
import { X, Image, Eye, Save, Loader, AlertCircle, CheckCircle } from 'lucide-react';

const BlogForm = ({ postId = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category_id: '',
    cover_image: '',
    status: 'draft',
    tags: '',
    image_width: 1200,
    image_height: 630,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [preview, setPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchCategories();
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/blog/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (e) {
      console.error('Error fetching categories:', e);
    }
  };

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/admin/blog/posts/${postId}`);
      const data = await res.json();
      if (data.success) {
        setFormData(data.data);
        setImagePreview(data.data.cover_image);
      }
    } catch (e) {
      setError('Failed to load post');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In production, you'd upload to a server or cloud storage
      // For now, create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setFormData(prev => ({
          ...prev,
          cover_image: imageUrl
        }));
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Please enter a title');
      return false;
    }
    if (!formData.content.trim()) {
      setError('Please enter content');
      return false;
    }
    if (!formData.category_id) {
      setError('Please select a category');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const url = postId
        ? `http://localhost:8000/api/blog/posts/${postId}`
        : 'http://localhost:8000/api/blog/posts';
      
      const method = postId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(postId ? 'Post updated successfully!' : 'Post created successfully!');
        setTimeout(() => {
          onSave?.(data);
        }, 1500);
      } else {
        setError(data.message || 'Failed to save post');
      }
    } catch (e) {
      setError('Error saving post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#2B5A84] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2B5A84] to-[#1a3a5a] px-8 py-8 text-white flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {postId ? 'Edit Article' : 'Create New Article'}
          </h1>
          <p className="text-blue-100 mt-2">
            {postId ? 'Update your existing article' : 'Publish a new blog post to share your insights'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X size={28} />
        </button>
      </div>

      {/* Form Content */}
      <div className="p-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-green-800">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content - Left Side (2 columns) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Article Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter an engaging title for your article"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:border-[#2B5A84] focus:outline-none text-lg font-medium transition-colors"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Excerpt (Summary)
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Write a brief summary of your article (2-3 sentences)"
                  rows="3"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:border-[#2B5A84] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Article Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your article content here. You can use HTML tags for formatting."
                  rows="12"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:border-[#2B5A84] focus:outline-none font-mono text-sm transition-colors resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Tip: You can use basic HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt; for formatting
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., Investment, Mutual Funds, SIP, Tax Saving"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:border-[#2B5A84] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-8">
              
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category *
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:border-[#2B5A84] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg focus:border-[#2B5A84] focus:outline-none transition-colors bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cover Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageInput"
                  />
                  <label
                    htmlFor="imageInput"
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2B5A84] hover:bg-blue-50 transition-all"
                  >
                    <Image className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Upload Image</span>
                    <span className="text-xs text-gray-500 mt-1">or paste image URL below</span>
                  </label>
                </div>

                {/* Image URL Input */}
                <input
                  type="text"
                  value={formData.cover_image}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, cover_image: e.target.value }));
                    setImagePreview(e.target.value);
                  }}
                  placeholder="Or paste image URL here"
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2B5A84] focus:outline-none text-sm mt-3 transition-colors"
                />

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Image Dimensions */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">Image Dimensions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Width (px)</label>
                    <input
                      type="number"
                      name="image_width"
                      value={formData.image_width}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#2B5A84] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Height (px)</label>
                    <input
                      type="number"
                      name="image_height"
                      value={formData.image_height}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#2B5A84] focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-8 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="px-6 py-3 border-2 border-[#2B5A84] text-[#2B5A84] font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Eye size={18} />
                Preview
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-gradient-to-r from-[#2B5A84] to-[#1a3a5a] text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {postId ? 'Update Article' : 'Publish Article'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;