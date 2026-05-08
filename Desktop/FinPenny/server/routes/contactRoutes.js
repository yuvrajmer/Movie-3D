const express = require('express');
const router  = express.Router();
const axios   = require('axios'); // Ensure axios is installed: npm install axios
const ctrl    = require('../controllers/contactController');

// ── Google reCAPTCHA Verification Middleware ──────────────────────
const verifyCaptcha = async (req, res, next) => {
  const { captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ success: false, message: "Please complete the reCAPTCHA." });
  }

  try {
    // Replace with your actual Secret Key or use process.env.RECAPTCHA_SECRET_KEY
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || "YOUR_SECRET_AUTHORIZATION_KEY_HERE";
    
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`
    );

    if (response.data.success) {
      next(); // Success! Move to the controller
    } else {
      res.status(400).json({ success: false, message: "reCAPTCHA verification failed. Please try again." });
    }
  } catch (error) {
    console.error("reCAPTCHA Error:", error);
    res.status(500).json({ success: false, message: "Internal server error during verification." });
  }
};

// ── Contact Form ──────────────────────────────────────────────────
// Added verifyCaptcha middleware before the controller function
router.post('/contact', verifyCaptcha, ctrl.submitContact);

// ── Admin: Contacts ───────────────────────────────────────────────
router.get('/contacts',                  ctrl.getContacts);
router.get('/contacts/trash',            ctrl.getTrash);
router.put('/contacts/:id/read',         ctrl.markRead);
router.put('/contacts/:id/trash',        ctrl.moveToTrash);
router.put('/contacts/:id/restore',      ctrl.restoreContact);
router.delete('/contacts/trash/empty',   ctrl.emptyTrash);
router.delete('/contacts/:id',           ctrl.deleteContact);

module.exports = router;