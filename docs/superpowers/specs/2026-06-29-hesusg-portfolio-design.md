# Spec: hesusg.github.io — portfolio "Technical Plate" (Humphrey evidence)

**Date:** 2026-06-29
**Owner:** Hesus Garcia Cobos
**Status:** Approved design (visual mockup validated in the brainstorming companion)

## Context

Hesus is applying to the Hubert H. Humphrey Fellowship (field: Technology Policy &
Management). The application package (essays, artifacts, logistics) lives in the private
repo `humphrey-fellowship`. The checklist calls for a public **portfolio landing page** to
link from the application as evidence, gathering his open work in one credible place.

This portfolio doubles as his permanent personal/professional site (the person, distinct
from the AcademIA consultancy at academias.dev). It must look like a precise, intellectually
credible practitioner site, not a template. The visual system is forked from academias.dev
("The Technical Plate") and pushed a bit further to the aesthetic extreme, drawing on two
references the user chose: locomotive.ca (cascading hero text, minimal typographic nav) and
iljavaneck.com (two-column project cards that "pass" as you move through them).

Deadline pressure: the Humphrey deadline is 2026-07-26, so the build favors a fast,
no-build static site with no image-generation dependency.

## Goals

- One public, bilingual (EN default / ES) static page, deployable on GitHub Pages.
- Reuse the academias.dev design system for brand coherence; push type, full-bleed blue,
  and motion further.
- Gather his open work (build + research) as scannable, linked cards.
- Credible, human, anti-slop copy. English primary (the committee reads English).

## Non-goals (out of scope for v1)

- No CMS, framework, or build step. Hand-authored HTML/CSS/JS.
- No per-project generated illustrations (no Gemini pipeline). Typographic monograms +
  1-2 public-domain duotone etchings only.
- No blog, no YouTube/Instagram/Bluesky links (planned/unused — omit empty profiles).
- The exact project copy and how to adapt scattered repo content is deferred to a second
  grill-me round (see "Open: content inventory").

## Decisions (locked in brainstorming)

| Branch | Decision |
|---|---|
| Build base | **Fork academias.dev system** (copy `styles.css`/`main.js` tokens + components as base) |
| Repo / URL | **`hesusg.github.io`** (GitHub Pages user site, clean root URL) |
| Hero | **Cascading arc text**: `Builder,` / `educator,` / `policy architect.` (three blue tones), echoing the essays' builder→architect arc |
| Nav | **Vertical side index** (fixed, `I · Work` … `IV · Contact`), scroll-spy highlights current section |
| Project cards | **Sticky stack**: two-column cards (monogram/etch left, text+tags+links right) that pin and pass over each other on scroll |
| Sections | I Work · II Research · III About · IV Contact |
| Imagery | **Typographic monograms + 1-2 public-domain duotone etchings** (reuse academias duotone pipeline; no generation) |
| Language | **EN default, ES mirror**, shared CSS, lang redirect + localStorage like academias |
| Copy | academias anti-slop doctrine; English primary |
| FIG indexing | Keep brand `FIG. I–IV` section markers; **drop per-card `PROJECT 0X` numbers** (flagged as redundant numeric scaffold by the impeccable hook) |

## Architecture / file structure

```
hesusg.github.io/
  index.html          # lang redirect (localStorage academia_lang -> /en/ or /es/) + <noscript> fallback
  en/index.html       # English page (lang="en") — canonical/default
  es/index.html       # Spanish mirror (lang="es")
  assets/
    styles.css        # forked + extended academias tokens & components (shared, lang-agnostic)
    main.js           # scroll-spy, reveal, sticky behavior, lang persistence (shared)
    img/              # 1-2 public-domain duotone etchings (webp) + favicon/logo
  CNAME               # (optional, later) for a custom domain
  README.md           # short bilingual note: what this is, license
  docs/superpowers/specs/2026-06-29-hesusg-portfolio-design.md
```

EN and ES are full pages with identical structure and localized text; CSS/JS shared.

## Design system (forked from academias, pushed)

**Color (OKLCH, canonical — no hex):**
- `--bg: oklch(0.99 0.004 255)`; `--ink: oklch(0.20 0.03 264)`
- `--blue: oklch(0.48 0.27 264)` (identity); `--ink-blue: oklch(0.32 0.17 264)`
- `--muted: oklch(0.45 0.03 264)`; `--acc: oklch(0.93 0.21 112)` (citron, **only on blue**)
- `--on-blue: oklch(0.99 0.004 255)`; `--line: oklch(0.90 0.012 264)`
- Contrast: all text >= 4.5:1 (large >= 3:1).

**Type (3 families, mono as body voice):**
- Display/headings: **Archivo** 700/800, tight tracking (`-0.02/-0.03em`).
- Wordmark/eyebrow: **Bodoni Moda** 500/600, `0.14em` tracking.
- Body + UI + nav: **IBM Plex Mono** 400/500/600.
- "Pushed": larger hero clamp (up to ~7.5rem), tighter tracking on the cascade.

**Doctrine (keep):** matte electric-blue viewport frame, subtle grain + vignette, no cards
elsewhere/no drop shadows (depth via tonal shifts + full-bleed blue), `border-radius: 2px`,
no em/en dashes in copy (use `·`, `:`, `,`, period), citron never on white.

## Components

1. **Vertical index (`.vindex`)** — fixed left, `writing-mode: vertical-rl`, links to the
   four sections; `.on`/scroll-spy state in blue. Hidden < 760px (replaced by a minimal top
   row or hamburger to be decided in implementation).
2. **Hero cascade** — eyebrow (Bodoni) + three stacked Archivo lines in `--ink` /
   `--ink-blue` / `--blue`; on load they reveal in sequence (locomotive-style build).
   Subtitle (<= 60ch) + credential meta line. Respects reduced-motion (renders complete).
3. **Sticky-stack cards (`.stack > .card`)** — `position: sticky; top: ~90px`; two-column
   grid (`.art` blue panel with monogram/etch + `.body` with FIG label, title, tag chips,
   blurb, links). Cards pin and the next passes over. Stacks to one column < 760px.
4. **Drench section (About)** — full-bleed `--blue` band, one large anchor statement with a
   citron emphasis (e.g., "A model is a policy choice").
5. **Contact rows (`.crow`)** — rule-separated `key / value` rows (Email, GitHub, LinkedIn,
   X, AcademIA), hover `translateX(0.6rem)`. No form in v1 (mailto link).
6. **Language switch** — top-right `EN · ES`, persists choice to `localStorage`.

## Interactions / animations (progressive enhancement, all gated by `prefers-reduced-motion`)

- Hero cascade reveal on load (sequence the three lines).
- Scroll-spy updates the vertical index active item (IntersectionObserver).
- `[data-reveal]` fade/translate on scroll-in.
- Sticky-stack via CSS `position: sticky` (no JS needed for the core effect).
- Reduced-motion: no animation, full content visible, sticky degrades gracefully.

## Content mapping (sections -> cards)

- **I · Work:** ai-for-teachers · InteligencIA-LATAM · academias.dev
- **II · Research:** thesis (BERTopic/embeddings NLP comparison of national AI-in-education
  policy, 17 countries + EU + orgs) · Comparative Brief (Mexico vs EU/US/China) ·
  MX-AICFT competency framework draft
- **III · About:** the builder->educator->architect arc + teaching (Tec de Monterrey,
  DeepLearning.AI, AcademIA, Laboratoria, IIEP-UNESCO)
- **IV · Contact:** hesusgc@gmail.com · github.com/HesusG · linkedin.com/in/hgcobos ·
  x.com/HG_Cobos · academias.dev

## Deployment

- GitHub Pages from the `main` branch root of `hesusg.github.io` (public).
- `index.html` redirects to `/en/` or `/es/`; `/en/` is canonical with hreflang to `/es/`.
- Optional custom domain later via `CNAME`.

## Accessibility

- Semantic landmarks (nav/main/section/footer), skip link, `:focus-visible` rings.
- `lang` attributes per page; `hreflang` cross-links.
- Reduced-motion path for every animation; content readable without JS.

## Anti-slop copy doctrine

Apply the academias `anti-slop-checklist.md`: banned words/openers, no forced triads, no
"not just X but Y", varied rhythm, real numbers only, no em/en dashes. Spanish copy run
through `humanizar-es-mx`. No fabricated metrics.

## Open: content inventory (next grill-me round)

The user's material is scattered across many repos and documents. Before implementation we
run a second grill-me to decide, per card: exact title, one-line blurb, tag chips, which
link(s) to expose (live site / repo / PDF), and how to adapt/host scattered assets (e.g.,
where the thesis, the Comparative Brief, and MX-AICFT PDFs live and which are public). This
fills every `[link]`/blurb placeholder before the page is built.
