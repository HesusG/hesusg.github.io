(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) document.documentElement.classList.add('anim');

  // Scroll-spy: highlight the vertical index item for the section in view
  const links = [...document.querySelectorAll('.vindex a[href^="#"]')];
  const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const a = byId.get(e.target.id);
      if (a && e.isIntersecting) {
        links.forEach(l => { l.classList.remove('on'); l.removeAttribute('aria-current'); });
        a.classList.add('on'); a.setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['work', 'building', 'research', 'contact'].forEach(id => {
    const el = document.getElementById(id); if (el) spy.observe(el);
  });

  // Language preference persistence
  document.querySelectorAll('[data-lang-set]').forEach(a => {
    a.addEventListener('click', () => {
      try { localStorage.setItem('hgc_lang', a.getAttribute('data-lang-set')); } catch (_) {}
    });
  });

  // MailerLite universal embed (no-op until the account id is set — backlog)
  const mlAccount = 'REPLACE_ACCOUNT_ID';
  if (mlAccount !== 'REPLACE_ACCOUNT_ID') {
    (function (w, d, e, u, f, l, n) {
      w[f] = w[f] || function () { (w[f].q = w[f].q || []).push(arguments); };
      l = d.createElement(e); l.async = 1; l.src = u;
      n = d.getElementsByTagName(e)[0]; n.parentNode.insertBefore(l, n);
    })(window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml');
    window.ml('account', mlAccount);
  }
})();
