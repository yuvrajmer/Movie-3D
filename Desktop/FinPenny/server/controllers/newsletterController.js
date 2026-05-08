const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');
const { isLikelySpamEmail } = require('../utils/spamDetection');
const { sendVerificationEmail, sendSpamFlaggedEmail } = require('../services/emailService');
const { verifyPageHtml } = require('../utils/htmlTemplates');
const EMAIL_CONFIG = require('../config/email');

// ════════════════════════════════════════════════════════════════════
//  NEWSLETTER CONTROLLER
// ════════════════════════════════════════════════════════════════════

// POST /api/newsletter/subscribe
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });

    const isSpam = isLikelySpamEmail(email);
    const existing = db.prepare("SELECT * FROM newsletter_subscribers WHERE email = ?").get(email);

    if (existing) {
      if (existing.status === 'approved')
        return res.status(400).json({ success: false, message: 'This email is already subscribed.' });
      if (existing.status === 'blocked')
        return res.status(400).json({ success: false, message: 'This email cannot be subscribed.' });
      if (existing.status === 'spam')
        return res.status(400).json({ success: false, message: 'This email has been marked as spam.' });
      // Pending — resend verification
      const verifyUrl = `${EMAIL_CONFIG.base_url}/api/newsletter/verify/${existing.token}`;
      await sendVerificationEmail(email, verifyUrl);
      return res.json({ success: true, message: 'Verification email resent. Please check your inbox.', email });
    }

    const token = uuidv4();
    const status = isSpam ? 'spam' : 'pending';

    db.prepare(
      "INSERT INTO newsletter_subscribers (email, token, status, flagged_as_spam, is_spam_flagged_date) VALUES (?, ?, ?, ?, ?)"
    ).run(email, token, status, isSpam ? 1 : 0, isSpam ? new Date().toISOString() : null);

    if (isSpam) {
      await sendSpamFlaggedEmail(email);
      return res.status(201).json({
        success: true,
        message: 'Thank you for your interest! Your subscription requires manual approval from our team.',
        email,
        flagged: true,
      });
    }

    const verifyUrl = `${EMAIL_CONFIG.base_url}/api/newsletter/verify/${token}`;
    await sendVerificationEmail(email, verifyUrl);
    res.status(201).json({ success: true, message: 'Verification email sent! Please check your inbox.', email, flagged: false });
  } catch (e) {
    console.error('Newsletter subscribe error:', e.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// GET /api/newsletter/verify/:token
exports.verifyEmail = (req, res) => {
  try {
    const sub = db.prepare("SELECT * FROM newsletter_subscribers WHERE token = ?").get(req.params.token);
    if (!sub)
      return res.status(404).send(verifyPageHtml('Invalid Link', 'This verification link is invalid or has already been used.', false));
    if (sub.status === 'approved')
      return res.send(verifyPageHtml('Already Verified', 'Your email is already verified and subscribed to Finpenny Newsletter!', true));
    if (sub.status === 'blocked')
      return res.send(verifyPageHtml('Access Denied', 'This email has been restricted from our newsletter.', false));
    if (sub.status === 'spam')
      return res.send(verifyPageHtml('Pending Approval', 'Your subscription is pending manual approval from our team. We will contact you shortly.', false));

    db.prepare(
      "UPDATE newsletter_subscribers SET status = 'approved', subscribed_at = CURRENT_TIMESTAMP WHERE token = ?"
    ).run(req.params.token);

    return res.send(verifyPageHtml(
      'Email Verified! 🎉',
      'Thank you! Your email has been verified. You are now subscribed to the Finpenny Newsletter and will receive the latest financial insights.',
      true
    ));
  } catch (e) {
    res.status(500).send(verifyPageHtml('Server Error', 'Something went wrong. Please try again later.', false));
  }
};

// GET /api/admin/newsletter/subscribers
exports.getAllSubscribers = (req, res) => {
  try {
    const subs = db.prepare("SELECT * FROM newsletter_subscribers ORDER BY created_at DESC").all();
    res.json({ success: true, total: subs.length, data: subs });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching subscribers.' });
  }
};

// GET /api/admin/newsletter/spam
exports.getSpamSubscribers = (req, res) => {
  try {
    const subs = db.prepare(
      "SELECT * FROM newsletter_subscribers WHERE status = 'spam' OR flagged_as_spam = 1 ORDER BY is_spam_flagged_date DESC"
    ).all();
    res.json({ success: true, total: subs.length, data: subs });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Error fetching spam subscribers.' });
  }
};

// PUT /api/admin/newsletter/subscribers/:id/approve
exports.approveSubscriber = (req, res) => {
  try {
    db.prepare(
      "UPDATE newsletter_subscribers SET status = 'approved', subscribed_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(req.params.id);
    res.json({ success: true, message: 'Subscriber approved.' });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

// PUT /api/admin/newsletter/subscribers/:id/block
exports.blockSubscriber = (req, res) => {
  try {
    db.prepare("UPDATE newsletter_subscribers SET status = 'blocked' WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: 'Subscriber blocked.' });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

// PUT /api/admin/newsletter/subscribers/:id/unblock
exports.unblockSubscriber = (req, res) => {
  try {
    db.prepare("UPDATE newsletter_subscribers SET status = 'approved' WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: 'Subscriber approved.' });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

// DELETE /api/admin/newsletter/subscribers/:id
exports.deleteSubscriber = (req, res) => {
  try {
    db.prepare("DELETE FROM newsletter_subscribers WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: 'Subscriber removed.' });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};
