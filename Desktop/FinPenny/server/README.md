# Finpenny Backend 🚀

A well-structured Node.js/Express backend for the Finpenny financial platform with contact forms, newsletter management, spam detection, and blog functionality.

---

## 📁 Folder Structure

```
finpenny-backend/
│
├── config/                          # Configuration files
│   ├── database.js                 # Database setup & schema
│   └── email.js                    # Email configuration
│
├── routes/                          # Express route handlers
│   ├── contactRoutes.js            # Contact form submissions
│   ├── newsletterRoutes.js         # Newsletter subscription & verification
│   ├── categoryRoutes.js           # Blog categories CRUD
│   ├── blogRoutes.js               # Blog posts CRUD
│   ├── tagRoutes.js                # Blog tags
│   ├── navigationRoutes.js         # Blog navigation (prev/next)
│   └── subscriberRoutes.js         # Subscriber management
│
├── services/                        # Business logic & external services
│   ├── emailService.js             # Email sending logic
│   └── blogService.js              # Blog post broadcast service
│
├── utils/                          # Utility functions
│   ├── spamDetection.js            # Email spam detection
│   └── htmlTemplates.js            # Email HTML templates
│
├── public/                         # Static files (admin panel, etc.)
│   └── [your html/css files here]
│
├── server.js                       # Main Express application
├── package.json                    # Dependencies & scripts
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or navigate to the project
cd finpenny-backend

# Install dependencies
npm install
```

### 2. Configure Email

Edit `config/email.js` with your Gmail credentials:

```javascript
module.exports = {
  from_name:    'Finpenny',
  from_email:   'your-email@gmail.com',
  smtp_user:    'your-email@gmail.com',
  smtp_pass:    'your-app-password',  // 16-character Gmail App Password
  base_url:     'http://localhost:8000',
};
```

**Get Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device)
3. Copy the 16-character password

### 3. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:8000`

---

## 📋 API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/trash` - Get deleted contacts
- `PUT /api/contacts/:id/read` - Mark as read
- `PUT /api/contacts/:id/trash` - Move to trash
- `PUT /api/contacts/:id/restore` - Restore from trash
- `DELETE /api/contacts/:id` - Permanently delete
- `DELETE /api/contacts/trash/empty` - Empty trash

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/verify/:token` - Verify email
- `GET /api/admin/newsletter/subscribers` - Get all subscribers
- `GET /api/admin/newsletter/spam` - Get spam flagged emails
- `PUT /api/admin/newsletter/subscribers/:id/approve` - Approve subscriber
- `PUT /api/admin/newsletter/subscribers/:id/block` - Block subscriber
- `PUT /api/admin/newsletter/subscribers/:id/unblock` - Unblock subscriber
- `DELETE /api/admin/newsletter/subscribers/:id` - Remove subscriber

### Blog Categories
- `GET /api/blog/categories` - Get all categories
- `POST /api/blog/categories` - Create category
- `PUT /api/blog/categories/:id` - Update category
- `DELETE /api/blog/categories/:id` - Delete category

### Blog Posts
- `GET /api/blog/posts` - Get published posts (with search & pagination)
- `GET /api/admin/blog/posts` - Get all posts (admin)
- `GET /api/blog/posts/:slug` - Get single post by slug
- `GET /api/admin/blog/posts/:id` - Get post by ID (admin)
- `POST /api/blog/posts` - Create post
- `PUT /api/blog/posts/:id` - Update post
- `DELETE /api/blog/posts/:id` - Delete post

### Blog Tags
- `GET /api/blog/tags` - Get all tags
- `GET /api/blog/tags/suggest/:prefix` - Get tag suggestions

### Blog Navigation
- `GET /api/blog/posts/:slug/navigation` - Get prev/next posts

### Subscribers
- `GET /api/subscribers` - Get all subscribers
- `DELETE /api/subscribers/:id` - Delete subscriber

---

## 🔒 Features

### ✅ Contact Management
- Form submission handling
- Read/Unread status tracking
- Soft delete (Recycle Bin)
- Permanent deletion
- Empty trash functionality

### ✅ Newsletter Management
- Email verification with secure tokens
- Automatic spam detection
- Email blacklist management
- Admin approval workflow
- Subscriber broadcasting

### ✅ Spam Protection
- Pattern-based spam detection
- Temporary email detection
- Admin override capability
- Flagged subscriber tracking

### ✅ Blog Management
- CRUD operations for posts
- Multiple categories
- Tag system
- Cover images with dimensions
- Draft/Published status
- Auto-publish notifications to subscribers
- Post navigation (prev/next)
- Search & filtering
- Pagination support

### ✅ Email Service
- Newsletter verification emails
- Blog post notifications
- HTML email templates
- Gmail App Password support

### ✅ Database
- SQLite with WAL mode
- Automatic migrations
- Default categories seeding
- Relationships between posts and categories

---

## 🛠 Technology Stack

- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Email**: Nodemailer + Gmail
- **CORS**: Cross-origin requests
- **UUID**: Unique token generation
- **Node**: 14+

---

## 📧 Email Configuration

### CORS Configuration
The server allows requests from:
- `http://localhost:5173` (Frontend dev)
- `http://127.0.0.1:5173` (Frontend alt)

Update `server.js` for production:

```javascript
app.use(cors({
  origin: ['https://yourdomain.com'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));
```

### Email Base URL
In `config/email.js`, change for production:

```javascript
base_url: 'https://yourdomain.com',  // Production domain
```

---

## 🗄️ Database Schema

### contacts
```sql
- id (PRIMARY KEY)
- first_name, last_name
- email, phone
- message
- status (new/read)
- trashed (0/1)
- deleted_at, created_at
```

### newsletter_subscribers
```sql
- id (PRIMARY KEY)
- email (UNIQUE)
- token (UNIQUE)
- status (pending/approved/blocked/spam)
- subscribed_at
- flagged_as_spam (0/1)
- is_spam_flagged_date
- created_at
```

### blog_posts
```sql
- id (PRIMARY KEY)
- title, slug (UNIQUE)
- content (HTML)
- excerpt
- category_id (FOREIGN KEY)
- cover_image, author
- status (draft/published)
- tags
- image_width, image_height
- created_at, updated_at
```

### blog_categories
```sql
- id (PRIMARY KEY)
- name, slug (UNIQUE)
- created_at
```

---

## 🔍 Spam Detection Patterns

The system detects and flags:
- Excessive random characters: `/^[0-9a-z]{10,}@/i`
- Common test emails: `test@`, `spam@`, `fake@`
- No-reply addresses: `noreply@`, `no-reply@`
- Temporary email services: `@temp`, `@guerrillamail`, `@10minutemail`, `@mailinator`, `@throwaway`
- Example domains: `@example`

Flagged emails require manual admin approval before subscription.

---

## 📝 Environment Variables (Optional)

Create a `.env` file:

```env
PORT=8000
NODE_ENV=development
```

---

## 🐛 Troubleshooting

### "Cannot connect to Gmail"
- Verify Gmail App Password (16 characters)
- Enable 2-Factor Authentication on Gmail
- Regenerate App Password

### "Database locked"
- Delete `contacts.db-shm` and `contacts.db-wal` files
- Restart the server

### "CORS errors"
- Check frontend origin in `server.js`
- Verify `allowedHeaders` include `Content-Type`

### "Email not sending"
- Check console logs
- Verify SMTP credentials
- Test with `npm run dev` for detailed errors

---

## 📞 Support

For issues or questions, please refer to the code comments or check the console logs when running `npm run dev`.

---

## 📄 License

ISC License - See package.json

---

**Finpenny Backend** | Built with ❤️ for financial education
