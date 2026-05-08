const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/tagController');

router.get('/blog/tags',                  ctrl.getTags);
router.get('/blog/tags/suggest/:prefix',  ctrl.suggestTags);

module.exports = router;
