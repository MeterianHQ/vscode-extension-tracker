/* When embedded in an iframe, open all external links in a new tab. */
if (window !== window.top) {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="http"]').forEach(function (a) {
      a.target = '_blank';
      a.rel    = 'noopener noreferrer';
    });
  });
}

/*
 * Inherit cookie consent from the meterian.io wrapper page.
 *
 * This site is served from meterianhq.github.io, so it cannot read the consent
 * cookies set on meterian.io -- different registrable domains. It deliberately
 * ships no consent panel of its own: visitors accepted (or declined) on the
 * main site before reaching the wrapper, and prompting again inside an embedded
 * frame would be a poor experience. So we ask the wrapper for the decision it
 * already holds, and record it in the same window.meterian_cookie_allowed flag
 * trackers.js would have set from the cookies itself.
 *
 * Every internal link is a full page load, so this handshake runs afresh on
 * each docs page. Standalone visits (no wrapper) never get consent and never
 * load trackers, which is the correct default.
 */
(function () {
  if (window === window.top) return;

  // every Meterian environment embeds these same pages: www, qa and the apex,
  // under meterian.io AND meterian.com -- both are live and trackers.js has
  // always treated them as separate properties. Parse the origin rather than
  // matching substrings, so a lookalike such as https://evil-meterian.io or
  // https://meterian.io.example.com cannot pass for one of ours.
  function isMeterianOrigin(origin) {
    try {
      var url = new URL(origin);
      return url.protocol === 'https:' &&
        /^([^.]+\.)*meterian\.(io|com)$/.test(url.hostname);
    } catch (e) {
      return false;
    }
  }

  // for an iframe the referrer is the embedding page, which is how we reach an
  // environment we were never told about; the fixed origins cover the case of a
  // referrer policy having stripped it
  function wrapperOrigins() {
    var origins = [
      'https://www.meterian.io', 'https://meterian.io',
      'https://www.meterian.com', 'https://meterian.com'
    ];
    try {
      var referred = new URL(document.referrer).origin;
      if (isMeterianOrigin(referred) && origins.indexOf(referred) === -1) {
        origins.unshift(referred);
      }
    } catch (e) { /* no referrer, fall back to the fixed list */ }
    return origins;
  }

  var MAX_ATTEMPTS = 5;

  var answered  = false;
  var attempts  = 0;

  window.addEventListener('message', function (event) {
    if (!isMeterianOrigin(event.origin)) return;
    if (!event.data || event.data.type !== 'meterian-consent') return;

    // a refusal is an answer too -- stop asking either way
    answered = true;

    // our own hostname is the docs host, identical on every environment, so
    // trackers.js would file all of it under one property. The wrapper tells us
    // which environment we are in; record it before the trackers read it.
    if (event.data.hostname) window.meterian_host_override = event.data.hostname;

    if (!event.data.consent) return;

    // the same flag trackers.js sets from its own cookies; it will not
    // downgrade a consent already granted
    window.meterian_cookie_allowed = true;

    // trackers.js self-fires on a 500ms timer; if it already ran and bailed for
    // lack of consent, run it again now. It guards against double-init itself,
    // which matters because the wrapper also pushes on our load event and we
    // may well be told twice.
    if (typeof setTrackers === 'function') setTrackers();
  });

  /*
   * We load in parallel with the wrapper, so our first request can arrive
   * before its listener exists -- postMessage neither queues nor errors, the
   * request just disappears. Ask again a few times, backing off, until we get
   * an answer. The wrapper also pushes unprompted once we finish loading, so
   * in practice one of the two lands well before anyone would notice.
   */
  function requestConsent() {
    if (answered || attempts >= MAX_ATTEMPTS) return;
    attempts++;

    wrapperOrigins().forEach(function (origin) {
      window.top.postMessage({ type: 'meterian-consent-request' }, origin);
    });

    setTimeout(requestConsent, 200 * attempts);
  }

  requestConsent();
})();
