const db = require('../config/database');

// ════════════════════════════════════════════════════════════════════
//  BLOG CATEGORY CONTROLLER
// ════════════════════════════════════════════════════════════════════

// GET /api/blog/categories
exports.getCategories = (req, res) => {
  try {
    const cats = db.prepare("SELECT * FROM blog_categories ORDER BY name ASC").all();
    res.json({ success: true, data: cats });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching categories.' });
  }
};

// POST /api/blog/categories
exports.createCategory = (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name required.' });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const result = db.prepare("INSERT INTO blog_categories (name, slug) VALUES (?, ?)").run(name, slug);
    res.status(201).json({ success: true, data: { id: result.lastInsertRowid, name, slug } });
  } catch (e) {
    if (e.message.includes('UNIQUE'))
      return res.status(400).json({ success: false, message: 'Category already exists.' });
    res.status(500).json({ success: false, message: 'Error creating category.' });
  }
};

// PUT /api/blog/categories/:id
exports.updateCategory = (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name required.' });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    db.prepare("UPDATE blog_categories SET name = ?, slug = ? WHERE id = ?").run(name, slug, req.params.id);
    res.json({ success: true, data: { id: parseInt(req.params.id), name, slug } });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error updating category.' });
  }
};

// DELETE /api/blog/categories/:id
exports.deleteCategory = (req, res) => {
  try {
    db.prepare("DELETE FROM blog_categories WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: 'Category deleted.' });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error deleting category.' });
  }
};
