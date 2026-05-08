// ════════════════════════════════════════════════════════════════════
//  SPAM PROTECTION UTILITIES
// ════════════════════════════════════════════════════════════════════

// Simple spam detection based on email patterns
function isLikelySpamEmail(email) {
  // Check for common spam patterns
  const spamPatterns = [
    /^[0-9a-z]{10,}@/i, // Too many random characters
    /test@/i,
    /spam@/i,
    /fake@/i,
    /no-?reply@/i,
    /noreply@/i,
    /example@/i,
    /@temp/i,
    /@guerrillamail/i,
    /@10minutemail/i,
    /@mailinator/i,
    /@throwaway/i,
  ];
  
  return spamPatterns.some(pattern => pattern.test(email));
}

module.exports = {
  isLikelySpamEmail,
};
