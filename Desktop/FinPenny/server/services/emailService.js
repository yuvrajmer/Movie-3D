const nodemailer = require('nodemailer');
const EMAIL_CONFIG = require('../config/email');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_CONFIG.smtp_user,
    pass: EMAIL_CONFIG.smtp_pass,
  },
});

// ── Send verification email ──────────────────────────────────────
async function sendVerificationEmail(email, verifyUrl) {
  const mailOptions = {
    from: `"${EMAIL_CONFIG.from_name}" <${EMAIL_CONFIG.from_email}>`,
    to: email,
    subject: '✅ Confirm your Finpenny Newsletter Subscription',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:'Inter',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 30px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a3a5a,#2B5A84);padding:40px;text-align:center">
            <img src="https://finpenny.com/wp-content/uploads/2024/12/Copy-of-FOOD.png" alt="Finpenny" style="height:50px;margin-bottom:20px">
            <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700">Confirm Your Subscription</h1>
            <p style="color:rgba(255,255,255,0.75);margin:10px 0 0;font-size:15px">You're one step away from the latest financial insights</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px">
            <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px">Hi there,</p>
            <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 30px">
              Thank you for subscribing to <strong>Finpenny Newsletter</strong>! Please confirm your email address by clicking the button below.
            </p>
            <div style="text-align:center;margin:32px 0">
              <a href="${verifyUrl}" style="display:inline-block;background:linear-gradient(135deg,#D9231D,#b91c1c);color:#fff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:16px;font-weight:700;letter-spacing:0.5px;box-shadow:0 4px 15px rgba(217,35,29,0.3)">
                ✅ Verify My Email
              </a>
            </div>
            <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:24px 0 0">
              Or copy this link into your browser:<br>
              <a href="${verifyUrl}" style="color:#2B5A84;word-break:break-all">${verifyUrl}</a>
            </p>
            <hr style="border:none;border-top:1px solid #f3f4f6;margin:30px 0">
            <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0">
              If you didn't subscribe, please ignore this email.<br>
              © ${new Date().getFullYear()} Finpenny. All rights reserved.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #f3f4f6">
            <p style="color:#9ca3af;font-size:11px;margin:0">AMFI Registered Mutual Fund Distributor | ARN-150869</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  };
  await transporter.sendMail(mailOptions);
}

// ── Send spam flagged email ─────────────────────────────────────
async function sendSpamFlaggedEmail(email) {
  const mailOptions = {
    from: `"${EMAIL_CONFIG.from_name}" <${EMAIL_CONFIG.from_email}>`,
    to: email,
    subject: '📧 Finpenny Newsletter Subscription - Pending Review',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:'Inter',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 30px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a3a5a,#2B5A84);padding:40px;text-align:center">
            <img src="https://finpenny.com/wp-content/uploads/2024/12/Copy-of-FOOD.png" alt="Finpenny" style="height:50px;margin-bottom:20px">
            <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700">Subscription Pending Review</h1>
            <p style="color:rgba(255,255,255,0.75);margin:10px 0 0;font-size:15px">Our team will verify your request shortly</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px">
            <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px">Hi there,</p>
            <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px">
              Thank you for your interest in the <strong>Finpenny Newsletter</strong>! We've received your subscription request and it's now pending verification by our team.
            </p>
            <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px">
              This review process typically takes 24-48 hours. Once approved, you'll receive a confirmation email and can start enjoying our latest financial insights.
            </p>
            <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 30px">
              If you have any questions, feel free to reach out to us at <strong>nirmitashah15@gmail.com</strong>
            </p>
            <hr style="border:none;border-top:1px solid #f3f4f6;margin:30px 0">
            <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0">
              © ${new Date().getFullYear()} Finpenny. All rights reserved.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #f3f4f6">
            <p style="color:#9ca3af;font-size:11px;margin:0">AMFI Registered Mutual Fund Distributor | ARN-150869</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  };
  await transporter.sendMail(mailOptions);
}

module.exports = {
  transporter,
  sendVerificationEmail,
  sendSpamFlaggedEmail,
};
