const EMAIL_CONFIG = require('../config/email');

// Verification result HTML page
function verifyPageHtml(title, message, success) {
  const icon  = success ? '✅' : '❌';
  const color = success ? '#2B5A84' : '#D9231D';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title} — Finpenny</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Inter',sans-serif;background:#f4f7fb;min-height:100vh;display:flex;align-items:center;justify-content:center}
    .card{background:#fff;border-radius:24px;padding:60px 48px;max-width:480px;width:90%;text-align:center;box-shadow:0 8px 40px rgba(0,0,0,0.08)}
    .icon{font-size:64px;margin-bottom:24px}
    h1{font-size:26px;font-weight:700;color:${color};margin-bottom:16px}
    p{color:#6b7280;font-size:16px;line-height:1.6;margin-bottom:30px}
    a{display:inline-block;background:${color};color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:600;margin-top:8px}
    .brand{font-size:12px;color:#9ca3af;margin-top:24px}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="${EMAIL_CONFIG.frontend_url}">← Go to Finpenny</a>
    <p class="brand">© ${new Date().getFullYear()} Finpenny | AMFI Registered Mutual Fund Distributor</p>
  </div>
</body>
</html>`;
}

module.exports = {
  verifyPageHtml,
};
