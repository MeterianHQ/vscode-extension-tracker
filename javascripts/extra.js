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
 * Inherit cookie consent, and the Meterian scripts themselves, from the wrapper
 * page embedding us.
 *
 * This site is served from meterianhq.github.io, so it cannot read the consent
 * cookies set on meterian.io or meterian.com -- different registrable domains.
 * It deliberately ships no consent panel of its own: visitors accepted (or
 * declined) on the main site before reaching the wrapper, and prompting again
 * inside an embedded frame would be a poor experience. So we ask the wrapper for
 * the decision it already holds, and record it in the same
 * window.meterian_cookie_allowed flag trackers.js sets from the cookies itself.
 *
 * The same answer tells us which environment we are in, and we load that
 * environment's scripts. One deployment of these docs is embedded by every
 * environment, so a fixed host would mean qa's wrapper running production's
 * trackers.js -- untestable, and wrong the moment the two versions differ.
 *
 * Every internal link is a full page load, so this runs afresh on each docs
 * page. Standalone visits (no wrapper) load nothing and track nothing, which is
 * the correct default.
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

  /*
   * The Meterian scripts are loaded from whichever environment is embedding us,
   * never from a fixed host. A qa wrapper gets qa's copy, www gets www's, and an
   * environment nobody has thought of yet works without touching this file.
   *
   * The base comes from the message's origin, which the browser sets and
   * isMeterianOrigin has already vetted -- not from anything the message itself
   * claims, which would let a payload point us at a host of its choosing.
   *
   * Order matters: trackers.js reads window.webConfig. Dynamically created
   * scripts default to async, so set async=false to keep them in sequence.
   */
  var METERIAN_SCRIPTS = [
    '/common_website/js/web_configuration.js',
    '/common_website/js/set_web_configuration.js',
    '/common_website/js/trackers.js'
  ];
  var scriptsRequested = false;

  function loadMeterianScripts(origin) {
    if (scriptsRequested) return;
    scriptsRequested = true;

    METERIAN_SCRIPTS.forEach(function (path) {
      var script = document.createElement('script');
      script.src = origin + path;
      script.async = false;
      document.head.appendChild(script);
    });
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

    // no consent means nothing to load: leave the page without the scripts
    // rather than fetching trackers that would only decline to run
    if (!event.data.consent) return;

    // our own hostname is the docs host, identical on every environment, so
    // trackers.js would file all of it under one property. Take the environment
    // from the vetted origin and set both flags before the scripts arrive.
    window.meterian_host_override = new URL(event.origin).hostname;
    window.meterian_cookie_allowed = true;

    // trackers.js self-fires shortly after it loads and reads the flags above,
    // so there is nothing further to call. Being told twice is expected -- the
    // wrapper pushes as well as answering -- and loadMeterianScripts only ever
    // acts once.
    loadMeterianScripts(event.origin);
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
