const db = require('../config/database');

// ════════════════════════════════════════════════════════════════════
//  BLOG NAVIGATION CONTROLLER
// ════════════════════════════════════════════════════════════════════

// GET /api/blog/posts/:slug/navigation
exports.getNavigation = (req, res) => {
  try {
    const post = db.prepare(
      "SELECT id, created_at FROM blog_posts WHERE slug = ? AND status = 'published'"
    ).get(req.params.slug);

    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });

    const next = db.prepare(`
      SELECT id, slug, title FROM blog_posts
      WHERE status = 'published' AND created_at > ?
      ORDER BY created_at ASC LIMIT 1
    `).get(post.created_at);

    const prev = db.prepare(`
      SELECT id, slug, title FROM blog_posts
      WHERE status = 'published' AND created_at < ?
      ORDER BY created_at DESC LIMIT 1
    `).get(post.created_at);

    res.json({ success: true, data: { prev: prev || null, next: next || null } });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching navigation.' });
  }
};
