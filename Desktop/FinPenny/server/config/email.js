// ════════════════════════════════════════════════════════════════════
//  EMAIL CONFIG
//  Reads from .env (recommended) or falls back to hardcoded values.
//  Create a .env file in the project root (see .env.example).
// ════════════════════════════════════════════════════════════════════
require('dotenv').config();

module.exports = {
  from_name:  process.env.EMAIL_FROM_NAME  || 'Finpenny',
  from_email: process.env.EMAIL_FROM       || 'yuvrajtimba.cbtlpl@gmail.com',
  smtp_user:  process.env.SMTP_USER        || 'yuvrajtimba.cbtlpl@gmail.com',
  smtp_pass:  process.env.SMTP_PASS        || 'lxrb uruy rdjk llbz',
  base_url:   process.env.BASE_URL         || 'http://localhost:8000',
  frontend_url: process.env.FRONTEND_URL   || 'http://localhost:5173',
};
