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
 * already holds.
 *
 * Every internal link is a full page load, so this handshake runs afresh on
 * each docs page. Standalone visits (no wrapper) never get consent and never
 * load trackers, which is the correct default.
 */
(function () {
  if (window === window.top) return;

  var WRAPPER_ORIGINS = ['https://www.meterian.io', 'https://meterian.io'];

  window.addEventListener('message', function (event) {
    if (WRAPPER_ORIGINS.indexOf(event.origin) === -1) return;
    if (!event.data || event.data.type !== 'meterian-consent') return;
    if (!event.data.consent) return;

    window.meterian_consent_from_parent = true;

    // trackers.js self-fires on a 500ms timer; if it already ran and bailed for
    // lack of consent, run it again now. It guards against double-init itself.
    if (typeof setTrackers === 'function') setTrackers();
  });

  WRAPPER_ORIGINS.forEach(function (origin) {
    window.top.postMessage({ type: 'meterian-consent-request' }, origin);
  });
})();
