const db = require('../config/database');

// ════════════════════════════════════════════════════════════════════
//  SUBSCRIBER CONTROLLER  (public-facing subscriber management)
// ════════════════════════════════════════════════════════════════════

// GET /api/subscribers
exports.getSubscribers = (req, res) => {
  try {
    const subs = db.prepare("SELECT * FROM newsletter_subscribers ORDER BY created_at DESC").all();
    res.json({ success: true, total: subs.length, data: subs });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching subscribers.' });
  }
};

// DELETE /api/subscribers/:id
exports.deleteSubscriber = (req, res) => {
  try {
    db.prepare("DELETE FROM newsletter_subscribers WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: 'Subscriber removed.' });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error deleting subscriber.' });
  }
};
