# hesusg.github.io

Personal site of Hesus Garcia Cobos: learning designer, builder, policy.
Static site (no build step) on GitHub Pages. English default, Spanish mirror.

- Design system forked from academias.dev (the "technical plate": OKLCH ultramarine,
  IBM Plex Mono + Archivo + Bodoni Moda, matte frame, sticky-stack cards).
- Three facets: Teaching & Learning Design, Building, Research & Policy.
- Free downloads (Ser Tutor short, Mitos de IA) delivered via MailerLite (gated, not in
  this repo). See `assets/lead-magnets/README.md`.

## Structure

- `index.html` — language redirect (localStorage + browser, with a noscript fallback)
- `en/index.html` — English page (canonical) · `es/index.html` — Spanish mirror
- `assets/styles.css` · `assets/main.js` — shared design system + behavior
- `downloads/kreditec-case.pdf` — public data-mining case study
- `docs/superpowers/` — spec and implementation plan

## Local preview

```bash
python3 -m http.server 8099
# open http://localhost:8099/en/
```

## License

Content (c) 2026 Hesus Garcia Cobos. Code MIT.
