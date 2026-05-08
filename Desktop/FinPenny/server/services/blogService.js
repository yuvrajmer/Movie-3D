const db = require('../config/database');
const { transporter } = require('./emailService');
const EMAIL_CONFIG = require('../config/email');

// ════════════════════════════════════════════════════════════════════
//  BLOG POST BROADCAST SERVICE
// ════════════════════════════════════════════════════════════════════

async function broadcastNewPost(post) {
  try {
    // Only get subscribers who have verified their email
    const subscribers = db.prepare("SELECT email FROM newsletter_subscribers WHERE status = 'approved'").all();
    
    if (subscribers.length === 0) {
      console.log("📢 No approved subscribers to notify.");
      return;
    }

    const postUrl = `${EMAIL_CONFIG.frontend_url}/blog/${post.slug}`;
    console.log(`📢 Starting broadcast for: ${post.title} to ${subscribers.length} users.`);

    // Map each subscriber to a sendMail promise
    const emailPromises = subscribers.map(sub => {
      const mailOptions = {
        from: `"${EMAIL_CONFIG.from_name}" <${EMAIL_CONFIG.from_email}>`,
        to: sub.email,
        subject: `📖 New Blog Published: ${post.title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background: #1a3a5a; color: white; padding: 20px; text-align: center;">
              <h1>New Post on Finpenny</h1>
            </div>
            <div style="padding: 20px;">
              <h2>${post.title}</h2>
              <p>${post.excerpt || 'Read our latest financial insights.'}</p>
              <div style="text-align: center; margin-top: 25px;">
                <a href="${postUrl}" style="background: #D9231D; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Read Article</a>
              </div>
            </div>
          </div>
        `
      };
      return transporter.sendMail(mailOptions);
    });

    // Run all email sends in parallel and log results
    const results = await Promise.allSettled(emailPromises);
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    console.log(`✅ Broadcast complete: ${successful} sent, ${failed} failed.`);

  } catch (error) {
    console.error('❌ Critical Broadcast Error:', error.message);
  }
}

module.exports = {
  broadcastNewPost,
};
