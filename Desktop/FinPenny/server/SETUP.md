# Finpenny Backend - Complete Setup Guide 📚

## 📦 What You Have

A production-ready Node.js/Express backend with the following structure:

```
finpenny-backend/
│
├── 📂 config/
│   ├── database.js          ← Database initialization & schema
│   └── email.js             ← Gmail email configuration
│
├── 📂 routes/
│   ├── contactRoutes.js     ← Contact form API endpoints
│   ├── newsletterRoutes.js  ← Newsletter subscription & verification
│   ├── categoryRoutes.js    ← Blog category management
│   ├── blogRoutes.js        ← Blog posts CRUD operations
│   ├── tagRoutes.js         ← Blog tags management
│   ├── navigationRoutes.js  ← Blog post navigation
│   └── subscriberRoutes.js  ← Subscriber list management
│
├── 📂 services/
│   ├── emailService.js      ← Email sending logic & templates
│   └── blogService.js       ← Blog broadcast notifications
│
├── 📂 utils/
│   ├── spamDetection.js     ← Spam email detection logic
│   └── htmlTemplates.js     ← HTML email & page templates
│
├── 📂 public/
│   └── [Add your admin.html here]
│
├── server.js                ← Main Express application
├── package.json             ← Dependencies
├── .gitignore               ← Git ignore rules
└── README.md                ← Full documentation
```

---

## 🚀 Installation Steps

### Step 1: Navigate to Project Folder

```bash
cd finpenny-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web framework
- `cors` - Cross-origin requests
- `nodemailer` - Email sending
- `better-sqlite3` - Database
- `uuid` - Token generation

### Step 3: Configure Email (IMPORTANT!)

Edit `config/email.js`:

```javascript
module.exports = {
  from_name:    'Finpenny',
  from_email:   'your-email@gmail.com',      // ← YOUR EMAIL
  smtp_user:    'your-email@gmail.com',      // ← YOUR EMAIL
  smtp_pass:    'xxxx xxxx xxxx xxxx',       // ← YOUR APP PASSWORD
  base_url:     'http://localhost:8000',     // ← FOR PRODUCTION: https://yourdomain.com
};
```

**How to get Gmail App Password:**

1. Go to https://myaccount.google.com/apppasswords
2. If you don't see "App passwords":
   - Enable 2-Step Verification first
   - Then return to App passwords
3. Select "Mail" and "Windows Computer"
4. Google generates a 16-character password
5. Copy and paste it into `config/email.js`

### Step 4: Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

You'll see:
```
🚀 Finpenny Backend Server is running!
📡 API URL     : http://localhost:8000/api
🔑 Admin Panel : http://localhost:8000/admin
```

---

## 🔌 How to Use the Backend

### 1. Frontend Connection

Update your frontend API URLs to:

```javascript
const API = 'http://localhost:8000/api';
```

### 2. Add Admin Panel

The admin panel you created should be placed in the `public/` folder:

```bash
# Copy your admin.html to public folder
cp ../path/to/admin.html public/admin.html
```

Then access it at:
- `http://localhost:8000/admin.html` (if named admin.html)
- `http://localhost:8000/` (if renamed to index.html)

### 3. All API Endpoints Are Ready

Your frontend JavaScript already works! The admin panel can now:
- View & manage contact submissions
- View recycle bin
- Manage newsletter subscribers
- Create & edit blog posts
- Manage blog categories
- View spam-flagged emails

---

## 🧪 Test the Backend

### Test with cURL or Postman

**Subscribe to Newsletter:**
```bash
curl -X POST http://localhost:8000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Submit Contact Form:**
```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "phone":"1234567890",
    "message":"Hello!"
  }'
```

**Get All Contacts:**
```bash
curl http://localhost:8000/api/contacts
```

**Create Blog Post:**
```bash
curl -X POST http://localhost:8000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title":"My First Post",
    "content":"<p>Hello World</p>",
    "excerpt":"A great post",
    "status":"published"
  }'
```

---

## 📋 All Features Explained

### ✅ Contact Management
- Users submit via contact form
- Admin receives & can mark as read
- Soft delete to recycle bin
- Permanent deletion
- Search functionality

### ✅ Newsletter
- Email verification with tokens
- Automatic spam detection
- Manual approval workflow
- Broadcast to all subscribers
- Email blacklist

### ✅ Blog System
- Create, edit, delete posts
- Categories & tags
- Cover images
- Draft & published states
- Auto-notify subscribers on publish
- Search & pagination
- Previous/Next navigation

### ✅ Email Sending
- Verification emails
- Spam notification emails
- Blog publish notifications
- HTML email templates
- Gmail via nodemailer

### ✅ Spam Detection
Automatically flags emails with:
- Temporary email domains
- Random character patterns
- Common spam keywords
- Test email addresses

---

## 🚨 Important Notes

### Development vs Production

**Development:**
```javascript
// config/email.js
base_url: 'http://localhost:8000'

// server.js CORS origins
origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
```

**Production:**
```javascript
// config/email.js
base_url: 'https://yourdomain.com'

// server.js CORS origins
origin: ['https://yourdomain.com']
```

### Database File
- SQLite creates `contacts.db` in root folder
- Never commit to git (in `.gitignore`)
- Keep backups of this file!

### Security
- Email credentials in `config/email.js` (add to `.env` later)
- No authentication on routes yet
- Add middleware for admin protection in production

---

## 🐛 Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Problem: "Gmail authentication failed"
**Solution:**
1. Verify Gmail App Password is 16 characters
2. Check 2-Factor Authentication is enabled
3. Regenerate App Password in Google Account

### Problem: "Database locked"
**Solution:**
```bash
# Delete lock files
rm contacts.db-shm contacts.db-wal
# Restart server
npm run dev
```

### Problem: "CORS error from frontend"
**Solution:**
Update `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true
}));
```

### Problem: "Port 8000 already in use"
**Solution:**
```bash
# Use different port
PORT=3000 npm run dev
```

---

## 📝 File Descriptions

| File | Purpose |
|------|---------|
| `server.js` | Main Express app, middleware setup |
| `config/database.js` | SQLite schema & initialization |
| `config/email.js` | Gmail configuration |
| `services/emailService.js` | Email sending logic |
| `services/blogService.js` | Blog broadcast notifications |
| `utils/spamDetection.js` | Spam pattern detection |
| `utils/htmlTemplates.js` | Email & page HTML templates |
| `routes/*.js` | API endpoint handlers |

---

## 🔄 Workflow Example

### Newsletter Subscription Flow:
1. User enters email in frontend
2. Frontend sends `POST /api/newsletter/subscribe`
3. Backend checks for spam patterns
4. If clean: Send verification email
5. User clicks verification link
6. Backend updates status to "approved"
7. User now receives blog notifications

### Blog Publishing Flow:
1. Admin creates post via admin panel
2. Admin publishes post
3. Backend detects publish action
4. Backend sends emails to all approved subscribers
5. Subscribers receive notification with blog link

---

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure email: Edit `config/email.js`
3. ✅ Start server: `npm run dev`
4. ✅ Add admin panel: Copy to `public/` folder
5. ✅ Test APIs: Use cURL or Postman
6. ✅ Connect frontend: Update API URLs
7. ✅ Deploy: Use production settings

---

## 📚 Useful Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Install packages
npm install

# Check if server is running
curl http://localhost:8000/api/contacts

# View database
sqlite3 contacts.db

# Kill process on port 8000
lsof -i :8000
kill -9 <PID>
```

---

## 🎓 Learn More

- Express.js: https://expressjs.com/
- SQLite: https://www.sqlite.org/
- Nodemailer: https://nodemailer.com/
- REST API Best Practices: https://restfulapi.net/

---

## ✨ You're All Set!

Your backend is now organized, scalable, and ready for production. All your original functionality is preserved with a clean folder structure.

**Happy coding! 🚀**

---

**Questions?** Check the README.md in the root folder for detailed API documentation.
