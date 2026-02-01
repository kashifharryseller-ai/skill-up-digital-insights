// List of common disposable/temporary email domains
const disposableEmailDomains = [
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "guerrillamail.org",
  "guerrillamail.net",
  "sharklasers.com",
  "grr.la",
  "mailinator.com",
  "maildrop.cc",
  "10minutemail.com",
  "10minutemail.net",
  "minutemail.com",
  "yopmail.com",
  "throwaway.email",
  "throwawaymail.com",
  "discard.email",
  "discardmail.com",
  "fakeinbox.com",
  "getairmail.com",
  "mailnesia.com",
  "trashmail.com",
  "trashmail.net",
  "getnada.com",
  "tempmailo.com",
  "spamgourmet.com",
  "mytrashmail.com",
  "mailcatch.com",
  "dispostable.com",
  "spambox.us",
  "mailslite.com",
  "emailondeck.com",
  "tempr.email",
  "fakemailgenerator.com",
  "mohmal.com",
  "tempsky.com",
  "inboxkitten.com",
  "emailfake.com",
  "fakemailgenerator.net",
  "mailsac.com",
  "burnermail.io",
  "mailnull.com",
  "spamcowboy.com",
  "jetable.org",
  "20minutemail.com",
  "33mail.com",
  "anonbox.net",
  "anonymbox.com",
  "antispam.de",
  "binkmail.com",
  "bobmail.info",
  "bumpymail.com",
  "casualdx.com",
  "cheatmail.de",
  "crazymailing.com",
  "curryworld.de",
  "deadaddress.com",
  "despam.it",
  "devnullmail.com",
  "dfgh.net",
  "dodgeit.com",
  "dodgit.com",
  "dontreg.com",
  "e4ward.com",
  "emailias.com",
  "emz.net",
  "eyepaste.com",
  "fleckens.hu",
  "haltospam.com",
  "hidzz.com",
  "ichimail.com",
  "incognitomail.com",
  "ipoo.org",
  "jetable.net",
  "kasmail.com",
  "kulturbetrieb.info",
  "mail-temporaire.fr",
  "meltmail.com",
  "moakt.com",
  "mx0.wwwnew.eu",
  "nervmich.net",
  "nobulk.com",
  "noclickemail.com",
  "nomail.xl.cx",
  "nomail2me.com",
  "nospam.ze.tc",
  "nurfuerspam.de",
  "obobbo.com",
  "oneoffemail.com",
  "onewaymail.com",
  "pjjkp.com",
  "proxymail.eu",
  "put2.net",
  "qq.com",
  "receiveee.com",
  "recursor.net",
  "safe-mail.net",
  "safersignup.de",
  "safetymail.info",
  "sendspamhere.com",
  "shiftmail.com",
  "short.so",
  "shortmail.net",
  "slopsbox.com",
  "smellfear.com",
  "snakemail.com",
  "spam.la",
  "spamavert.com",
  "spambob.com",
  "spambog.com",
  "spamday.com",
  "spamex.com",
  "spamfree24.org",
  "spamhole.com",
  "spamify.com",
  "spaminator.de",
  "spamkill.info",
  "spaml.com",
  "spamobox.com",
  "spamoff.de",
  "spamspot.com",
  "spamthis.co.uk",
  "speed.1s.fr",
  "suremail.info",
  "tempemail.co.za",
  "tempemail.com",
  "tempemail.net",
  "tempinbox.co.uk",
  "tempinbox.com",
  "tempomail.fr",
  "temporaryemail.net",
  "thankyou2010.com",
  "thisisnotmyrealemail.com",
  "trash-mail.at",
  "trash-mail.de",
  "trash2009.com",
  "trashbox.eu",
  "trashdevil.com",
  "trashdevil.de",
  "trbvm.com",
  "uggsrock.com",
  "upliftnow.com",
  "venompen.com",
  "viditag.com",
  "wetrash.com",
  "willhackforfood.biz",
  "willselfdestruct.com",
  "wuzupmail.net",
  "xoxy.net",
  "yogamaven.com",
  "zippymail.info",
  "zoemail.com",
  "mailnator.com",
];

/**
 * Check if an email domain is a known disposable/temporary email provider
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || !email.includes("@")) {
    return false;
  }
  
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) {
    return false;
  }
  
  return disposableEmailDomains.some(
    (disposable) => domain === disposable || domain.endsWith(`.${disposable}`)
  );
}

/**
 * Validate email format and check for disposable domains
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) {
    return { valid: false, error: "Email is required" };
  }
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }
  
  // Check for disposable email
  if (isDisposableEmail(email)) {
    return { 
      valid: false, 
      error: "Temporary/disposable email addresses are not allowed. Please use a permanent email." 
    };
  }
  
  return { valid: true };
}
