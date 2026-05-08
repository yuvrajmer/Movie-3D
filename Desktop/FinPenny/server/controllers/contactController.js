const db = require('../config/database');

// ════════════════════════════════════════════════════════════════════
//  CONTACT CONTROLLER
// ════════════════════════════════════════════════════════════════════

// POST /api/contact
exports.submitContact = (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !email || !phone || !message)
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });

    const result = db.prepare(`
      INSERT INTO contacts (first_name, last_name, email, phone, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(firstName, lastName || '', email, phone, message);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      id: result.lastInsertRowid,
    });
  } catch (e) {
    console.error('❌ Contact Error:', e.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// GET /api/contacts
exports.getContacts = (req, res) => {
  try {
    const contacts = db.prepare(
      "SELECT * FROM contacts WHERE trashed = 0 ORDER BY created_at DESC"
    ).all();
    res.json({ success: true, total: contacts.length, data: contacts });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching data.' });
  }
};

// GET /api/contacts/trash
exports.getTrash = (req, res) => {
  try {
    const contacts = db.prepare(
      "SELECT * FROM contacts WHERE trashed = 1 ORDER BY deleted_at DESC"
    ).all();
    res.json({ success: true, total: contacts.length, data: contacts });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching trash.' });
  }
};

// PUT /api/contacts/:id/read
exports.markRead = (req, res) => {
  try {
    db.prepare("UPDATE contacts SET status = 'read' WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

// PUT /api/contacts/:id/trash
exports.moveToTrash = (req, res) => {
  try {
    db.prepare(
      "UPDATE contacts SET trashed = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(req.params.id);
    res.json({ success: true, message: 'Moved to recycle bin.' });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

// PUT /api/contacts/:id/restore
exports.restoreContact = (req, res) => {
  try {
    db.prepare(
      "UPDATE contacts SET trashed = 0, deleted_at = NULL WHERE id = ?"
    ).run(req.params.id);
    res.json({ success: true, message: 'Restored successfully.' });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

// DELETE /api/contacts/:id
exports.deleteContact = (req, res) => {
  try {
    db.prepare("DELETE FROM contacts WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: 'Permanently deleted.' });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

// DELETE /api/contacts/trash/empty
exports.emptyTrash = (req, res) => {
  try {
    db.prepare("DELETE FROM contacts WHERE trashed = 1").run();
    res.json({ success: true, message: 'Recycle bin emptied.' });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};
