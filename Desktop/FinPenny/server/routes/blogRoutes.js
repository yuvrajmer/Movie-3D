const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/blogController');

// ── Public ────────────────────────────────────────────────────────
router.get('/blog/posts',                   ctrl.getPosts);
router.get('/blog/posts/:slug',             ctrl.getPostBySlug);

// ── Admin ─────────────────────────────────────────────────────────
router.get('/admin/blog/posts',             ctrl.getAdminPosts);
router.get('/admin/blog/posts/:id',         ctrl.getAdminPostById);
router.post('/blog/posts',                  ctrl.createPost);
router.put('/blog/posts/:id',               ctrl.updatePost);
router.delete('/blog/posts/:id',            ctrl.deletePost);

module.exports = router;
