const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/subscriberController');

router.get('/subscribers',       ctrl.getSubscribers);
router.delete('/subscribers/:id', ctrl.deleteSubscriber);

module.exports = router;
