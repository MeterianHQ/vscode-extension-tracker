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

  var WRAPPER_ORIGINS = ['https://www.meterian.io', 'https://meterian.io'];
  var MAX_ATTEMPTS = 5;

  var answered  = false;
  var attempts  = 0;

  window.addEventListener('message', function (event) {
    if (WRAPPER_ORIGINS.indexOf(event.origin) === -1) return;
    if (!event.data || event.data.type !== 'meterian-consent') return;

    // a refusal is an answer too -- stop asking either way
    answered = true;
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

    WRAPPER_ORIGINS.forEach(function (origin) {
      window.top.postMessage({ type: 'meterian-consent-request' }, origin);
    });

    setTimeout(requestConsent, 200 * attempts);
  }

  requestConsent();
})();
