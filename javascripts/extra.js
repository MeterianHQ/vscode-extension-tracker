/* When embedded in an iframe, open all external links in a new tab. */
if (window !== window.top) {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="http"]').forEach(function (a) {
      a.target = '_blank';
      a.rel    = 'noopener noreferrer';
    });
  });
}
