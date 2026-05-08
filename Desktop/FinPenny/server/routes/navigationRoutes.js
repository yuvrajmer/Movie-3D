const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/navigationController');

router.get('/blog/posts/:slug/navigation', ctrl.getNavigation);

module.exports = router;
