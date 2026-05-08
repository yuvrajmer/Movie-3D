const db = require('../config/database');
const { broadcastNewPost } = require('../services/blogService');

// ════════════════════════════════════════════════════════════════════
//  BLOG POST CONTROLLER
// ════════════════════════════════════════════════════════════════════

// GET /api/blog/posts  — published posts with filtering & pagination
exports.getPosts = (req, res) => {
  try {
    const { category, search, limit, offset } = req.query;
    let query = `
      SELECT p.id, p.title, p.slug, p.content, p.excerpt, p.category_id,
             p.cover_image, p.status, p.tags, p.image_width, p.image_height,
             p.created_at, p.updated_at,
             c.name as category_name, c.slug as category_slug
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      WHERE p.status = 'published'
    `;
    const params = [];
    if (category) { query += ' AND c.slug = ?';                          params.push(category); }
    if (search)   { query += ' AND (p.title LIKE ? OR p.excerpt LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    query += ' ORDER BY p.created_at DESC';

    // Count total (without pagination)
    const countQuery = query.replace(/SELECT.*?FROM/s, 'SELECT COUNT(*) as count FROM');
    const total = db.prepare(countQuery).get(...params).count;

    if (limit && offset) {
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
    }

    const posts = db.prepare(query).all(...params);
    res.json({ success: true, total, data: posts });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Error fetching posts.' });
  }
};

// GET /api/admin/blog/posts  — all posts (admin)
exports.getAdminPosts = (req, res) => {
  try {
    const posts = db.prepare(`
      SELECT p.id, p.title, p.slug, p.content, p.excerpt, p.category_id,
             p.cover_image, p.status, p.tags, p.image_width, p.image_height,
             p.created_at, p.updated_at, c.name as category_name
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `).all();
    res.json({ success: true, total: posts.length, data: posts });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching posts.' });
  }
};

// GET /api/blog/posts/:slug
exports.getPostBySlug = (req, res) => {
  try {
    const post = db.prepare(`
      SELECT p.id, p.title, p.slug, p.content, p.excerpt, p.category_id,
             p.cover_image, p.status, p.tags, p.image_width, p.image_height,
             p.created_at, p.updated_at,
             c.name as category_name, c.slug as category_slug
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      WHERE p.slug = ? AND p.status = 'published'
    `).get(req.params.slug);

    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });
    res.json({ success: true, data: post });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching post.' });
  }
};

// GET /api/admin/blog/posts/:id
exports.getAdminPostById = (req, res) => {
  try {
    const post = db.prepare(`
      SELECT p.id, p.title, p.slug, p.content, p.excerpt, p.category_id,
             p.cover_image, p.status, p.tags, p.image_width, p.image_height,
             p.created_at, p.updated_at, c.name as category_name
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      WHERE p.id = ?
    `).get(req.params.id);

    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });
    res.json({ success: true, data: post });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching post.' });
  }
};

// POST /api/blog/posts
exports.createPost = async (req, res) => {
  try {
    const { title, content, excerpt, category_id, cover_image, status, tags, image_width, image_height } = req.body;

    if (!title || !content)
      return res.status(400).json({ success: false, message: 'Title and content are required.' });

    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const existing = db.prepare("SELECT id FROM blog_posts WHERE slug = ?").get(slug);
    if (existing) slug = `${slug}-${Date.now()}`;

    const result = db.prepare(`
      INSERT INTO blog_posts (title, slug, content, excerpt, category_id, cover_image, status, tags, image_width, image_height)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, slug, content,
      excerpt || '', category_id || null,
      cover_image || '', status || 'draft',
      tags || '', image_width || 1200, image_height || 630
    );

    if (status === 'published') {
      broadcastNewPost({ title, slug, excerpt });
    }

    res.status(201).json({
      success: true,
      message: 'Post created successfully.',
      id: result.lastInsertRowid,
      slug,
    });
  } catch (e) {
    console.error('Database Error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
};

// PUT /api/blog/posts/:id
exports.updatePost = async (req, res) => {
  try {
    const { title, content, excerpt, category_id, cover_image, status, tags, image_width, image_height } = req.body;
    const { id } = req.params;

    const currentPost = db.prepare("SELECT status FROM blog_posts WHERE id = ?").get(id);
    if (!currentPost) return res.status(404).json({ success: false, message: 'Post not found.' });

    db.prepare(`
      UPDATE blog_posts
      SET title = ?, content = ?, excerpt = ?, category_id = ?, cover_image = ?,
          status = ?, tags = ?, image_width = ?, image_height = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, content, excerpt, category_id, cover_image, status, tags, image_width, image_height, id);

    // Broadcast only on draft → published transition
    if (status === 'published' && currentPost.status !== 'published') {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      broadcastNewPost({ title, slug, excerpt });
    }

    res.json({ success: true, message: 'Post updated successfully.' });
  } catch (e) {
    console.error('Error updating post:', e);
    res.status(500).json({ success: false, message: e.message });
  }
};

// DELETE /api/blog/posts/:id
exports.deletePost = (req, res) => {
  try {
    db.prepare("DELETE FROM blog_posts WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: 'Post deleted.' });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error deleting post.' });
  }
};
