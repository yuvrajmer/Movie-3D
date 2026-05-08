const db = require('../config/database');

// ════════════════════════════════════════════════════════════════════
//  BLOG TAG CONTROLLER
// ════════════════════════════════════════════════════════════════════

function extractAllTags() {
  const posts = db.prepare("SELECT tags FROM blog_posts WHERE status = 'published' AND tags != ''").all();
  const tagsSet = new Set();
  posts.forEach(p => {
    if (p.tags) {
      p.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(t => tagsSet.add(t));
    }
  });
  return Array.from(tagsSet).sort();
}

// GET /api/blog/tags
exports.getTags = (req, res) => {
  try {
    res.json({ success: true, data: extractAllTags() });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching tags.' });
  }
};

// GET /api/blog/tags/suggest/:prefix
exports.suggestTags = (req, res) => {
  try {
    const prefix = req.params.prefix.toLowerCase();
    const filtered = extractAllTags().filter(t => t.toLowerCase().startsWith(prefix));
    res.json({ success: true, data: filtered });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching suggestions.' });
  }
};
