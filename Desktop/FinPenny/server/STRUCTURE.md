# Finpenny Backend — MVC Structure

```
server/
├── server.js               ← Entry point, middleware, route mounting
├── .env.example            ← Copy to .env and fill in credentials
│
├── config/
│   ├── database.js         ← SQLite setup & table creation (Model layer)
│   └── email.js            ← Email/SMTP config (reads .env)
│
├── controllers/            ← Business logic (Controller layer) ✅ NEW
│   ├── blogController.js
│   ├── categoryController.js
│   ├── contactController.js
│   ├── navigationController.js
│   ├── newsletterController.js
│   ├── subscriberController.js
│   └── tagController.js
│
├── routes/                 ← Thin route definitions (View/Router layer)
│   ├── blogRoutes.js
│   ├── categoryRoutes.js
│   ├── contactRoutes.js
│   ├── navigationRoutes.js
│   ├── newsletterRoutes.js
│   ├── subscriberRoutes.js
│   └── tagRoutes.js
│
├── services/               ← Shared services (email sending, broadcasts)
│   ├── blogService.js      ← Newsletter broadcast on new post
│   └── emailService.js     ← Nodemailer transporter + templates
│
├── utils/
│   ├── htmlTemplates.js    ← Verification page HTML generator
│   └── spamDetection.js    ← Email spam pattern checker
│
└── public/
    └── admin/
        └── index.html      ← Admin panel SPA
```

## MVC Separation

| Layer       | Folder         | Responsibility                              |
|-------------|----------------|---------------------------------------------|
| Model       | config/        | Database schema, table creation             |
| Controller  | controllers/   | Business logic, DB queries, responses       |
| View/Router | routes/        | URL definitions, delegates to controllers  |
| Service     | services/      | Cross-cutting concerns (email, broadcast)   |

## Environment Variables (.env)

Copy `.env.example` to `.env` and fill in your values:

```
PORT=8000
BASE_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
EMAIL_FROM_NAME=Finpenny
EMAIL_FROM=you@gmail.com
SMTP_USER=you@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
```
