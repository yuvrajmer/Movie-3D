const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/newsletterController');

// ── Public ────────────────────────────────────────────────────────
router.post('/newsletter/subscribe',                        ctrl.subscribe);
router.get('/newsletter/verify/:token',                     ctrl.verifyEmail);

// ── Admin ─────────────────────────────────────────────────────────
router.get('/admin/newsletter/subscribers',                 ctrl.getAllSubscribers);
router.get('/admin/newsletter/spam',                        ctrl.getSpamSubscribers);
router.put('/admin/newsletter/subscribers/:id/approve',     ctrl.approveSubscriber);
router.put('/admin/newsletter/subscribers/:id/block',       ctrl.blockSubscriber);
router.put('/admin/newsletter/subscribers/:id/unblock',     ctrl.unblockSubscriber);
router.delete('/admin/newsletter/subscribers/:id',          ctrl.deleteSubscriber);

module.exports = router;
