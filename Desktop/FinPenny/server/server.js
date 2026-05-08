require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const path       = require('path');

// Import configuration
const db         = require('./config/database');
const EMAIL_CONFIG = require('./config/email');

// Import routes
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const tagRoutes = require('./routes/tagRoutes');
const navigationRoutes = require('./routes/navigationRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');

const app  = express();
const PORT = process.env.PORT || 8000;

// ════════════════════════════════════════════════════════════════════
//  MIDDLEWARE CONFIGURATION
// ════════════════════════════════════════════════════════════════════

// Security Headers - Updated to allow Google reCAPTCHA
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.quilljs.com https://cdn.jsdelivr.net https://www.google.com https://www.gstatic.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.quilljs.com https://cdn.jsdelivr.net; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "frame-src 'self' https://www.google.com; " + // Required for the reCAPTCHA iframe
    "connect-src 'self' http://localhost:* ws://localhost:* https://unpkg.com https://cdn.quilljs.com https://www.google.com"
  );
  next();
});

app.use(cors({
  origin: ['http://localhost:5173','http://127.0.0.1:5173'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));
app.options('*', cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Inject runtime config for admin panel (avoids hardcoded URLs in HTML)
app.get('/admin/config.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`var FRONTEND_URL = "${process.env.FRONTEND_URL || 'http://localhost:5173'}";`);
});

// Serve admin panel at /admin route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// ════════════════════════════════════════════════════════════════════
//  API ROUTES
// ════════════════════════════════════════════════════════════════════

// Contact Routes
app.use('/api', contactRoutes);

// Newsletter Routes
app.use('/api', newsletterRoutes);

// Blog Category Routes
app.use('/api', categoryRoutes);

// Blog Post Routes
app.use('/api', blogRoutes);

// Blog Tag Routes
app.use('/api', tagRoutes);

// Blog Navigation Routes
app.use('/api', navigationRoutes);

// Subscriber Routes
app.use('/api', subscriberRoutes);


// ════════════════════════════════════════════════════════════════════
//  SERVER STARTUP
// ════════════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`✅ Environment Check: PORT is ${process.env.PORT ? 'LOADED' : 'NOT LOADED'}`);
  console.log(`✅ reCAPTCHA Check: ${process.env.RECAPTCHA_SECRET_KEY ? 'SECRET KEY FOUND' : 'SECRET KEY MISSING'}`);
  console.log('');
  console.log('🚀 Finpenny Backend Server is running!');
  console.log(`📡 API URL     : http://localhost:${PORT}/api`);
  console.log(`🔑 Admin Panel : http://localhost:${PORT}/admin`);
  console.log('');
  console.log('📧 Email setup: Edit EMAIL_CONFIG in config/email.js with your Gmail App Password');
  console.log('   Guide: https://myaccount.google.com/apppasswords');
  console.log('');
});