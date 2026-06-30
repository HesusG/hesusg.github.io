# hesusg.github.io Portfolio v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a public, bilingual, static "Technical Plate" portfolio at `hesusg.github.io` with three facets (Teaching & Learning Design, Building, Research & Policy), a sticky-stack project layout, a MailerLite lead-magnet section, and a styled KrediTec case PDF — deployed on GitHub Pages.

**Architecture:** Hand-authored static HTML/CSS/JS, no build step. Design system forked from academias.dev (OKLCH ultramarine, IBM Plex Mono + Archivo + Bodoni Moda, matte frame, no cards/shadows). One shared `assets/styles.css` + `assets/main.js`; mirrored `en/` (canonical) and `es/` pages; root `index.html` redirects by saved/browser language. Gated downloads via an embedded MailerLite form (the only non-static dependency); the site itself stays static.

**Tech Stack:** HTML5, CSS (custom properties, `position: sticky`, `writing-mode`), vanilla JS (IntersectionObserver), Google Fonts, MailerLite embed, GitHub Pages. PDF generation via headless Chromium (print-to-PDF) and the academias `duotone-hero.py` for the optional etching.

## Global Constraints

- Spec of record: `docs/superpowers/specs/2026-06-29-hesusg-portfolio-design.md`.
- Color: OKLCH only, no hex. Identity blue `oklch(0.48 0.27 264)`; citron `oklch(0.93 0.21 112)` **only on blue backgrounds, never on white**.
- Fonts: Archivo (display), Bodoni Moda (wordmark/eyebrow), IBM Plex Mono (body/UI/nav). No 4th font; body stays mono.
- No cards/drop-shadows elsewhere, `border-radius: 2px` max, **no em/en dashes in copy** (use `·`, `:`, `,`, period).
- Section indexing is brand `FIG. I–IV` only. **No per-card numeric markers** (`01/02/03`) — impeccable-flagged scaffold.
- Bilingual: `en/` is canonical (default), `es/` mirrors it; CSS/JS shared. EN page contains no Spanish except a one-line ES link; ES page no English except the EN link.
- Confidentiality: **never** mention the `nano-spud` review bot ("SDD Code Reviewer"). BEDU **is** nameable. Context-engineering course: omit or one neutral line.
- Copy: anti-slop (academias `anti-slop-checklist.md`); Spanish via `humanizar-es-mx`. No fabricated metrics. **Always accept and fix every impeccable hook/evaluate finding.**
- Every animation gated by `prefers-reduced-motion`; content readable without JS.
- All files ASCII-safe UTF-8; verify no stray non-Latin / replacement characters before each commit.

---

## File Structure

| File | Responsibility |
|---|---|
| `assets/styles.css` | All styling: tokens, frame/grain, type, vertical index, hero cascade, sticky-stack cards, drench, contact rows, subscribe section, responsive |
| `assets/main.js` | Scroll-spy active index, `[data-reveal]` on scroll, language persistence, MailerLite embed bootstrap |
| `en/index.html` | English page (canonical): hero + 3 facets + about/contact + subscribe |
| `es/index.html` | Spanish mirror (same structure, localized copy) |
| `index.html` | Root: redirect to `/en/` or `/es/` via localStorage/navigator + `<noscript>` fallback |
| `downloads/kreditec-case.pdf` | Public KrediTec "situacion-problema" case PDF |
| `assets/img/` | favicon, optional duotone hero etching (webp) |
| `assets/lead-magnets/` | Source PDFs for MailerLite upload (ser-tutor short, Mitos de IA) — staged, not linked publicly |
| `README.md` | Short bilingual note + license + how it deploys |

---

## Task 1: Design tokens + frame + reset (`styles.css` foundation)

**Files:**
- Create: `assets/styles.css`
- Test: open `en/index.html` later; for now a scratch `test.html`

**Interfaces:**
- Produces: CSS custom properties (`--bg --ink --blue --ink-blue --muted --acc --on-blue --line --fw --maxw`), `.frame`, `.grain`, base `body` type. Consumed by all later tasks.

- [ ] **Step 1: Write `assets/styles.css` foundation**

```css
:root{
  --bg:oklch(0.99 0.004 255); --surface:oklch(0.975 0.006 255);
  --ink:oklch(0.20 0.03 264); --blue:oklch(0.48 0.27 264);
  --ink-blue:oklch(0.32 0.17 264); --muted:oklch(0.45 0.03 264);
  --acc:oklch(0.93 0.21 112); --on-blue:oklch(0.99 0.004 255);
  --line:oklch(0.90 0.012 264);
  --fw:clamp(7px,0.9vw,12px); --maxw:1180px;
  --ease-out:cubic-bezier(0.16,1,0.3,1);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}}
body{background:var(--bg);color:var(--ink);
  font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:15px;line-height:1.55}
.frame{position:fixed;inset:0;border:var(--fw) solid var(--blue);pointer-events:none;z-index:50}
.grain{position:fixed;inset:0;pointer-events:none;z-index:49;opacity:.05;mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
@media (prefers-reduced-motion: reduce){.grain{display:none}}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 clamp(3rem,9vw,7rem)}
.skip{position:fixed;left:8px;top:8px;background:var(--blue);color:var(--on-blue);
  padding:8px 12px;z-index:60;transform:translateY(-180%);transition:transform .2s}
.skip:focus{transform:translateY(0)}
:focus-visible{outline:2.5px solid var(--blue);outline-offset:3px}
::selection{background:var(--acc);color:var(--ink-blue)}
```

- [ ] **Step 2: Create a scratch `test.html` to verify the frame renders**

```html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="assets/styles.css"></head>
<body><div class="frame"></div><div class="grain"></div>
<div class="wrap"><p style="padding:4rem 0">frame test</p></div></body></html>
```

- [ ] **Step 3: Verify visually**

Run (use the `run` skill or): `python3 -m http.server -d /mnt/data/repos/hesusg.github.io 8099` then open `http://localhost:8099/test.html`.
Expected: off-white page, a blue matte border framing the viewport, faint grain.

- [ ] **Step 4: Verify no corrupt characters**

Run: `grep -rnP '[\x{0400}-\x{04FF}\x{FFFD}]' assets/styles.css || echo OK`
Expected: `OK`

- [ ] **Step 5: Commit**

```bash
git add assets/styles.css
git commit -m "feat(styles): design tokens, matte frame, grain, reset"
```

---

## Task 2: Typography scale + vertical index nav + language switch (CSS)

**Files:**
- Modify: `assets/styles.css` (append)

**Interfaces:**
- Produces: `.vindex` (+ `.vindex a.on`), `.lang`, heading classes (`h1`,`h2`,`.fig`,`.eyebrow`). Consumed by the page tasks and `main.js` (toggles `.on`).

- [ ] **Step 1: Append typography + nav CSS**

```css
h1,h2{font-family:"Archivo",sans-serif;font-weight:800;letter-spacing:-.02em;line-height:.98}
h2{font-size:clamp(2rem,5vw,3.6rem);margin-bottom:.4rem}
.eyebrow{font-family:"Bodoni Moda",serif;letter-spacing:.14em;font-weight:600;
  font-size:13px;color:var(--muted)}
.fig{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--blue);margin-bottom:18px}
.vindex{position:fixed;left:calc(var(--fw) + 6px);top:0;height:100vh;display:flex;
  flex-direction:column;justify-content:center;gap:26px;writing-mode:vertical-rl;
  z-index:40;font-size:12px;letter-spacing:.26em;text-transform:uppercase}
.vindex a{color:var(--muted);text-decoration:none;transition:color .2s,font-weight .2s}
.vindex a:hover,.vindex a.on{color:var(--blue);font-weight:700}
.lang{position:fixed;right:calc(var(--fw) + 10px);top:calc(var(--fw) + 8px);z-index:40;
  font-size:12px;letter-spacing:.12em}
.lang b{color:var(--blue)} .lang a{color:var(--muted);text-decoration:none}
.lang a:hover{color:var(--blue)}
section{padding:clamp(4rem,11vh,9rem) 0;border-bottom:1px solid var(--line)}
@media (max-width:760px){.vindex{display:none}}
```

- [ ] **Step 2: Verify the vertical index renders rotated**

Add to `test.html` body: `<nav class="vindex"><a class="on" href="#a">I · Work</a><a href="#b">II · Research</a></nav>` and reload.
Expected: vertical text column on the left edge, first item blue/bold.

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css test.html
git commit -m "feat(styles): type scale, vertical index nav, language switch"
```

---

## Task 3: Hero cascade + About drench (CSS)

**Files:**
- Modify: `assets/styles.css` (append)

**Interfaces:**
- Produces: `.hero`, `.cascade` (+ `.c1/.c2/.c3`), `.herosub`, `.herometa`, `.drench` (+ `.big`,`.big em`). `main.js` adds `html.anim` to trigger the cascade reveal.

- [ ] **Step 1: Append hero + drench CSS**

```css
.hero{min-height:92vh;display:flex;flex-direction:column;justify-content:center}
.brandline{margin-bottom:26px}
.cascade span{display:block;font-family:"Archivo",sans-serif;font-weight:800;
  letter-spacing:-.03em;line-height:.9;font-size:clamp(2.4rem,9vw,7.2rem)}
.cascade .c1{color:var(--ink)} .cascade .c2{color:var(--ink-blue)} .cascade .c3{color:var(--blue)}
.herosub{margin-top:30px;max-width:60ch;font-size:clamp(1rem,1.4vw,1.18rem)}
.herometa{margin-top:26px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
/* cascade reveal only when JS confirms motion is OK */
html.anim .cascade span{opacity:0;transform:translateY(.5em)}
html.anim .cascade span{animation:rise .7s var(--ease-out) forwards}
html.anim .cascade .c2{animation-delay:.16s} html.anim .cascade .c3{animation-delay:.32s}
@keyframes rise{to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){html.anim .cascade span{opacity:1;transform:none;animation:none}}
.drench{background:var(--blue);color:var(--on-blue);border:0}
.drench .fig{color:var(--on-blue)}
.drench .big{font-family:"Archivo",sans-serif;font-weight:800;
  font-size:clamp(1.8rem,4.5vw,3.4rem);letter-spacing:-.02em;line-height:1.04;max-width:26ch}
.drench .big em{font-style:normal;color:var(--acc)}
```

- [ ] **Step 2: Verify**

Temporarily set `<html class="anim" lang="en">` in `test.html`, add a `.hero` with three `.cascade span`. Reload.
Expected: three lines rise in sequence (ink, ink-blue, blue). With OS "reduce motion" on, they appear instantly.

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "feat(styles): hero cascade reveal and About drench band"
```

---

## Task 4: Sticky-stack two-column card (CSS)

**Files:**
- Modify: `assets/styles.css` (append)

**Interfaces:**
- Produces: `.stack`, `.stack .card`, `.card .art` (+ `.mono`,`.acc`), `.card .body`, `.ttl`, `.tags span`, `.blurb`, `.links a`. Consumed by every facet section.

- [ ] **Step 1: Append card CSS**

```css
.stack{position:relative}
.stack .card{position:sticky;top:90px;background:var(--bg);border:2px solid var(--blue);
  border-radius:2px;display:grid;grid-template-columns:.8fr 1.2fr;overflow:hidden;margin-bottom:22px}
.card .art{background:var(--blue);color:var(--on-blue);display:flex;align-items:center;
  justify-content:center;min-height:220px;position:relative}
.card .art .mono{font-family:"Bodoni Moda",serif;font-size:clamp(2.6rem,6vw,5rem);letter-spacing:.04em}
.card .art .acc{position:absolute;bottom:12px;left:14px;color:var(--acc);font-size:11px;letter-spacing:.2em}
.card .body{padding:clamp(1.4rem,3vw,2.4rem)}
.card .ttl{font-family:"Archivo",sans-serif;font-weight:800;
  font-size:clamp(1.5rem,3.2vw,2.6rem);letter-spacing:-.02em;line-height:1;margin:.2rem 0 .7rem}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
.tags span{border:1.3px solid oklch(0.48 0.27 264 / .55);font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;padding:4px 9px;border-radius:2px;color:var(--ink-blue)}
.blurb{max-width:56ch}
.links{margin-top:16px;display:flex;gap:18px;flex-wrap:wrap;font-size:12px;
  letter-spacing:.08em;text-transform:uppercase}
.links a{color:var(--blue);border-bottom:1.5px solid var(--blue);text-decoration:none;padding-bottom:1px}
.links a:hover{color:var(--ink-blue);border-color:var(--ink-blue)}
@media (max-width:760px){.stack .card{grid-template-columns:1fr;position:static}.card .art{min-height:130px}}
```

- [ ] **Step 2: Verify sticky behavior**

Add two `.card`s inside a `.stack` in `test.html`, give the page height, scroll.
Expected: cards pin at ~90px and the next slides over; on a <760px viewport they stack statically in one column.

- [ ] **Step 3: Commit**

```bash
git add assets/styles.css
git commit -m "feat(styles): sticky-stack two-column project card"
```

---

## Task 5: Subscribe + contact rows (CSS) and remove scratch file

**Files:**
- Modify: `assets/styles.css` (append)
- Delete: `test.html`

**Interfaces:**
- Produces: `.crow` (+ `.k`), `.subscribe`, `.ml-form` wrapper styling. Consumed by the contact/subscribe section.

- [ ] **Step 1: Append contact + subscribe CSS**

```css
.crow{display:grid;grid-template-columns:auto 1fr;gap:24px;padding:16px 0;
  border-bottom:1px solid var(--line);align-items:baseline;transition:transform .2s}
.crow:hover{transform:translateX(.6rem)}
.crow .k{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.crow a{color:var(--blue);text-decoration:none}.crow a:hover{color:var(--ink-blue)}
.subscribe{background:var(--surface);border:1.5px solid var(--blue);border-radius:2px;
  padding:clamp(1.4rem,3vw,2.2rem);margin-top:1.5rem}
.subscribe h3{font-family:"IBM Plex Mono",monospace;font-weight:600;margin-bottom:.4rem}
.subscribe .ml-embedded{margin-top:1rem}
.dl-list{margin-top:1rem;display:flex;flex-direction:column;gap:8px}
.dl-list .crow .k{color:var(--blue)}
```

- [ ] **Step 2: Delete the scratch test page**

Run: `rm /mnt/data/repos/hesusg.github.io/test.html`

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(styles): contact rows + subscribe section; drop scratch page"
```

---

## Task 6: English page — head, hero, vertical index, language switch

**Files:**
- Create: `en/index.html`

**Interfaces:**
- Consumes: all CSS classes from Tasks 1-5.
- Produces: the canonical page skeleton with section ids `#work #research #about #contact` that `main.js` scroll-spy targets, and the hero copy.

- [ ] **Step 1: Create `en/index.html` head + hero**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hesus Garcia Cobos — learning designer, builder, policy</title>
<meta name="description" content="I design learning, build the systems that scale it, and study the policy that should govern it. AI in education and governance.">
<link rel="canonical" href="https://hesusg.github.io/en/">
<link rel="alternate" hreflang="es" href="https://hesusg.github.io/es/">
<link rel="alternate" hreflang="en" href="https://hesusg.github.io/en/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=Bodoni+Moda:opsz,wght@6..96,500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="frame"></div><div class="grain"></div>
<div class="lang"><b>EN</b> · <a href="../es/" data-lang-set="es">ES</a></div>
<nav class="vindex" aria-label="Sections">
  <a href="#work">I · Teaching</a>
  <a href="#building">II · Building</a>
  <a href="#research">III · Research</a>
  <a href="#contact">IV · Contact</a>
</nav>
<main id="main" class="wrap">
  <section class="hero" id="top">
    <div class="brandline eyebrow">HESUS GARCIA COBOS · LEARNING DESIGN · AI GOVERNANCE</div>
    <div class="cascade">
      <span class="c1">Builder,</span>
      <span class="c2">educator,</span>
      <span class="c3">policy architect.</span>
    </div>
    <p class="herosub">I design learning, build the systems that scale it, and study the policy that should govern it. My field is AI in education, and where it meets governance.</p>
    <div class="herometa">DeepLearning.AI · AcademIA · BEDU · Tec de Monterrey · IIEP-UNESCO</div>
  </section>
```

- [ ] **Step 2: Verify the hero renders (page still open, body unclosed is fine for a quick check via a temporary close)**

Temporarily append `</main></body></html>`, serve, open `http://localhost:8099/en/`.
Expected: cascade hero + vertical index + EN/ES switch. Remove the temporary close before Task 7.

- [ ] **Step 3: Commit**

```bash
git add en/index.html
git commit -m "feat(en): page head, hero cascade, vertical index, lang switch"
```

---

## Task 7: English page — the three facet sections (real content)

**Files:**
- Modify: `en/index.html` (append the facet sections)

**Interfaces:**
- Consumes: `.stack`/`.card` classes.
- Produces: sections `#work`, `#building`, `#research` with the locked content map. Verified live links.

- [ ] **Step 1: Append `#work` (Teaching & Learning Design)**

```html
  <section id="work">
    <div class="fig">FIG. I · TEACHING & LEARNING DESIGN</div>
    <h2>Designing how people learn</h2>
    <div class="stack">
      <article class="card"><div class="art"><div class="mono">IA·D</div><div class="acc">EC0301 · CERTIFIED</div></div>
        <div class="body"><div class="ttl">IA para Docentes</div>
        <div class="tags"><span>22h course</span><span>145-criterion rubric</span><span>ABCD objectives</span></div>
        <p class="blurb">A full faculty-training course designed end to end: backward-design objectives, diagnostic, formative and summative instruments, and participant and instructor manuals.</p>
        <div class="links"><a href="https://github.com/HesusG/EC301-HG_1">Repo</a></div></div></article>

      <article class="card"><div class="art"><div class="mono">DM</div></div>
        <div class="body"><div class="ttl">Data Mining (ITESM)</div>
        <div class="tags"><span>ML curriculum</span><span>Real fintech case</span><span>Python</span></div>
        <p class="blurb">A graduate data-mining course with hands-on notebooks and the KrediTec credit-risk case: students defend models on fairness, efficiency and correctness, not accuracy alone.</p>
        <div class="links"><a href="https://github.com/HesusG/course-itesm-data-mining">Repo</a><a href="../downloads/kreditec-case.pdf">Case PDF</a></div></div></article>

      <article class="card"><div class="art"><div class="mono">R+G</div></div>
        <div class="body"><div class="ttl">Assessment systems</div>
        <div class="tags"><span>6-competency rubrics</span><span>Auto-grader</span><span>ID x dev</span></div>
        <p class="blurb">Weighted competency rubrics plus a Python feedback engine that grades notebooks and returns growth-oriented feedback. Where instructional design meets engineering.</p>
        <div class="links"><a href="https://github.com/HesusG/diagnostico-lineas-accion">Repo</a></div></div></article>

      <article class="card"><div class="art"><div class="mono">RAG</div></div>
        <div class="body"><div class="ttl">DeepLearning.AI — RAG</div>
        <div class="tags"><span>Course author</span><span>LLM</span></div>
        <p class="blurb">Co-authored the Retrieval Augmented Generation course for DeepLearning.AI.</p>
        <div class="links"><a href="https://www.deeplearning.ai/courses/retrieval-augmented-generation">Course</a></div></div></article>

      <article class="card"><div class="art"><div class="mono">A·f·T</div></div>
        <div class="body"><div class="ttl">ai-for-teachers · InteligencIA-LATAM</div>
        <div class="tags"><span>UNESCO-aligned</span><span>EN / ES</span><span>Open / CC</span></div>
        <p class="blurb">Two open, bilingual resources: a free AI-literacy course for public teachers, and a short framework for using AI in higher-education classrooms.</p>
        <div class="links"><a href="https://github.com/HesusG/inteligencia-latam">InteligencIA-LATAM</a><a href="https://github.com/academia-latam/ai-for-teachers">ai-for-teachers</a></div></div></article>
    </div>
  </section>
```

- [ ] **Step 2: Append `#building`**

```html
  <section id="building">
    <div class="fig">FIG. II · BUILDING</div>
    <h2>The systems behind the learning</h2>
    <div class="stack">
      <article class="card"><div class="art"><div class="mono">n·s</div><div class="acc">HOMELAB</div></div>
        <div class="body"><div class="ttl">nano-spud infrastructure</div>
        <div class="tags"><span>Prometheus / Grafana</span><span>Tailscale + nftables</span><span>Local LLM (Ollama)</span></div>
        <p class="blurb">A production-grade homelab: observability on every node, a reused zero-trust firewall pattern, on-demand local LLM inference, and a self-hosted media and automation stack.</p>
        <div class="links"><a href="https://github.com/HesusG/nano-spud-infra">Repo</a></div></div></article>

      <article class="card"><div class="art"><div class="mono">DO</div></div>
        <div class="body"><div class="ttl">Digital Observatory</div>
        <div class="tags"><span>RAG pipeline</span><span>n8n</span><span>Agents</span></div>
        <p class="blurb">An intelligence pipeline: feed collection, change detection, orchestration, local-LLM scoring, and a knowledge base, turned into drafts.</p>
        <div class="links"><a href="https://github.com/HesusG/digital-observatory">Repo</a></div></div></article>

      <article class="card"><div class="art"><div class="mono">a·dev</div></div>
        <div class="body"><div class="ttl">academias.dev</div>
        <div class="tags"><span>Static site</span><span>EN / ES</span></div>
        <p class="blurb">The AcademIA consultancy site, hand-built in the same technical-plate system this portfolio extends.</p>
        <div class="links"><a href="https://academias.dev">Visit</a></div></div></article>
    </div>
  </section>
```

- [ ] **Step 3: Append `#research` + the About drench (outside `.wrap`)**

```html
  <section id="research">
    <div class="fig">FIG. III · RESEARCH & POLICY</div>
    <h2>From practice to policy</h2>
    <div class="stack">
      <article class="card"><div class="art"><div class="mono">NLP</div><div class="acc">LIVE</div></div>
        <div class="body"><div class="ttl">AI-in-education policy, compared</div>
        <div class="tags"><span>BERTopic</span><span>Embeddings</span><span>Thesis</span></div>
        <p class="blurb">A pedagogy thesis comparing national AI-in-education policies with an NLP pipeline, with a longitudinal look at China. [VERIFY country count vs essays before publishing.]</p>
        <div class="links"><a href="https://hesusg.github.io/tesis-hesusg-pedadogia/">Site</a><a href="https://github.com/HesusG/tesis-hesusg-pedadogia">Repo</a></div></div></article>

      <article class="card"><div class="art"><div class="mono">UN</div></div>
        <div class="body"><div class="ttl">UNESCO IIEP — policy planning</div>
        <div class="tags"><span>Mexico</span><span>Policy brief</span></div>
        <p class="blurb">A formal IIEP deliverable on planning AI integration in education for Mexico.</p>
        <div class="links"><a href="https://github.com/HesusG/unesco-policy-planning-education-2026">Repo</a></div></div></article>

      <article class="card"><div class="art"><div class="mono">IFE</div></div>
        <div class="body"><div class="ttl">AI-assisted feedback (IFE 2026)</div>
        <div class="tags"><span>Springer LNET</span><span>In review</span></div>
        <p class="blurb">A conference paper on rubric-guided, cell-level AI feedback for coding assignments. Submitted to IFE 2026, peer review in progress.</p>
        <div class="links"><a href="https://github.com/HesusG/ife-2026-cell-feedback-paper">Repo</a></div></div></article>
    </div>
  </section>
</main>

<section class="drench">
  <div class="wrap">
    <div class="fig">FIG. IV · ABOUT</div>
    <p class="big">A model is a <em>policy choice</em>. Seven years building AI, six teaching it. Now I am learning to write the rules that govern it.</p>
  </div>
</section>
```

- [ ] **Step 4: Verify every external link resolves**

Run:
```bash
grep -oE 'https://[^"]+' en/index.html | sort -u | while read u; do printf '%s ' "$u"; curl -s -o /dev/null -w '%{http_code}\n' -I "$u"; done
```
Expected: `200` (or `301/302`) for each. Fix or remove any `404`. (academia-latam/ai-for-teachers and the thesis site must resolve; if a repo is private/missing, drop that link.)

- [ ] **Step 5: Commit**

```bash
git add en/index.html
git commit -m "feat(en): three facet sections with real content + About drench"
```

---

## Task 8: English page — Contact + Subscribe section, then `main.js`

**Files:**
- Modify: `en/index.html` (append contact/subscribe + script tag, close document)
- Create: `assets/main.js`

**Interfaces:**
- Consumes: `.crow`, `.subscribe` CSS.
- Produces: `#contact` section; `main.js` exports nothing (IIFE) but sets `html.anim`, drives scroll-spy by toggling `.on` on `.vindex a`, reveals `[data-reveal]`, persists `data-lang-set` clicks, and boots the MailerLite embed.

- [ ] **Step 1: Append contact/subscribe + scripts and close `en/index.html`**

```html
<div class="wrap">
  <section id="contact" style="border-bottom:0">
    <div class="fig">FIG. IV · CONTACT</div>
    <h2>Let's talk</h2>
    <div class="dl-list">
      <div class="crow"><span class="k">Email</span><a href="mailto:hesusgc@gmail.com">hesusgc@gmail.com</a></div>
      <div class="crow"><span class="k">GitHub</span><a href="https://github.com/HesusG">github.com/HesusG</a></div>
      <div class="crow"><span class="k">LinkedIn</span><a href="https://www.linkedin.com/in/hgcobos/">linkedin.com/in/hgcobos</a></div>
      <div class="crow"><span class="k">X</span><a href="https://x.com/HG_Cobos">x.com/HG_Cobos</a></div>
      <div class="crow"><span class="k">AcademIA</span><a href="https://academias.dev">academias.dev</a></div>
    </div>

    <div class="subscribe">
      <h3>Free downloads</h3>
      <p class="blurb">Subscribe and I will send you the short edition of <em>Ser Tutor</em> and the data-backed brief <em>Mitos de IA</em>. No spam, unsubscribe anytime.</p>
      <!-- MailerLite embedded form. Replace data-form / account id after the account exists. -->
      <div class="ml-embedded" data-form="REPLACE_FORM_ID"></div>
    </div>
  </section>
</div>

<script src="../assets/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Create `assets/main.js`**

```javascript
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
  ['work','building','research','contact'].forEach(id => {
    const el = document.getElementById(id); if (el) spy.observe(el);
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length && !reduce) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-revealed'); obs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.04 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-revealed'));
  }

  // Language preference persistence
  document.querySelectorAll('[data-lang-set]').forEach(a => {
    a.addEventListener('click', () => {
      try { localStorage.setItem('hgc_lang', a.getAttribute('data-lang-set')); } catch (_) {}
    });
  });

  // MailerLite universal embed (no-op if the snippet account id is still a placeholder)
  const mlAccount = 'REPLACE_ACCOUNT_ID';
  if (mlAccount !== 'REPLACE_ACCOUNT_ID') {
    (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);}
    ,l=d.createElement(e),l.async=1,l.src=u,n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
    (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
    ml('account', mlAccount);
  }
})();
```

- [ ] **Step 3: Verify scroll-spy + reveal**

Serve and open `http://localhost:8099/en/`. Scroll through.
Expected: the active vertical-index item changes as each section enters view; cascade animates once; with reduce-motion on, everything is static and the page is fully readable.

- [ ] **Step 4: Verify no console errors and placeholders are intentional**

In the browser devtools console: expected no errors. The MailerLite block is dormant until ids are set (intentional).

- [ ] **Step 5: Commit**

```bash
git add en/index.html assets/main.js
git commit -m "feat(en): contact + subscribe section; scroll-spy, reveal, lang, ML embed"
```

---

## Task 9: Spanish mirror (`es/index.html`)

**Files:**
- Create: `es/index.html`

**Interfaces:**
- Consumes: same CSS/JS (paths `../assets/...`).
- Produces: localized mirror; `#work #building #research #contact` ids identical so `main.js` works unchanged.

- [ ] **Step 1: Copy EN to ES and localize**

Run: `cp en/index.html es/index.html`

Then edit `es/index.html`: set `<html lang="es">`, `<link rel="canonical" href="https://hesusg.github.io/es/">`, swap the lang switch to `<a href="../en/" data-lang-set="en">EN</a> · <b>ES</b>`, and translate all visible copy to Mexican Spanish (run it through the `humanizar-es-mx` rules: no em/en dashes, MX lexicon, varied cadence). Keep ids, classes, and links identical. Example hero:

```html
<div class="cascade">
  <span class="c1">Constructor,</span>
  <span class="c2">docente,</span>
  <span class="c3">arquitecto de politicas.</span>
</div>
<p class="herosub">Diseno como se aprende, construyo los sistemas que lo escalan, y estudio las politicas que deberian gobernarlo. Mi campo es la IA en la educacion, y donde se cruza con la gobernanza.</p>
```

Translate every `.ttl`, `.tags`, `.blurb`, `.fig`, headings, and the subscribe/contact copy. Section `FIG` labels become `FIG. I · ENSENANZA Y DISENO`, `FIG. II · CONSTRUCCION`, `FIG. III · INVESTIGACION Y POLITICA`, `FIG. IV · CONTACTO`.

- [ ] **Step 2: Verify ES page has no leftover English (except the EN link)**

Run:
```bash
grep -nE 'Builder|educator|policy architect|Let.s talk|Free downloads|Repo|Site|Course|Visit' es/index.html
```
Expected: only matches inside URLs/anchors you intend to keep (e.g., the `EN` switch). Translate any visible English label found.

- [ ] **Step 3: Verify no corrupt characters**

Run: `grep -rnP '[\x{0400}-\x{04FF}\x{FFFD}]' es/index.html || echo OK`
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add es/index.html
git commit -m "feat(es): Spanish mirror page (humanizar-es-mx applied)"
```

---

## Task 10: Root language redirect (`index.html`)

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: `localStorage.hgc_lang` (set by `main.js`).
- Produces: redirect to `/en/` or `/es/`.

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Hesus Garcia Cobos</title>
<script>
(function(){
  var saved; try { saved = localStorage.getItem('hgc_lang'); } catch(e){}
  var lang = saved || ((navigator.language||'en').toLowerCase().indexOf('es')===0 ? 'es' : 'en');
  location.replace(lang === 'es' ? '/es/' : '/en/');
})();
</script>
<meta http-equiv="refresh" content="0; url=/en/">
</head>
<body><noscript><p>Continue to <a href="/en/">English</a> or <a href="/es/">Espanol</a>.</p></noscript></body>
</html>
```

- [ ] **Step 2: Verify**

Serve, open `http://localhost:8099/`.
Expected: lands on `/en/` (or `/es/` if browser is Spanish); with JS off, the noscript links show.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: root language redirect (localStorage + navigator + noscript)"
```

---

## Task 11: KrediTec case PDF (public download)

**Files:**
- Create: `downloads/kreditec-case.pdf`
- Create: `assets/pdf/kreditec-case.html` (styled source for the PDF)

**Interfaces:**
- Consumes: the KrediTec content from `/home/d3r/Downloads/sp_datamining_rev1.docx`.
- Produces: a print-styled HTML rendered to `downloads/kreditec-case.pdf`, linked from Task 7's Data Mining card.

- [ ] **Step 1: Extract the docx text**

Run: `libreoffice --headless --convert-to txt --outdir /tmp/kreditec /home/d3r/Downloads/sp_datamining_rev1.docx` (fallback: `unzip -p "/home/d3r/Downloads/sp_datamining_rev1.docx" word/document.xml | sed -e 's/<[^>]*>//g'`).

- [ ] **Step 2: Write `assets/pdf/kreditec-case.html`**

A print-styled single document in the technical-plate language: Bodoni title, IBM Plex Mono body, blue rules, `@media print { @page { margin: 2cm } }`, a `.fig` header `KREDITEC · CASO DE ESTUDIO`. Fill the body with the extracted problem statement, the ML framing (logistic regression vs neural nets), the ethics/fairness dimension, and references. No fabricated numbers; keep the document's own figures. Apply the anti-slop checklist to the prose.

- [ ] **Step 3: Run impeccable on the HTML and accept all findings**

Run: `/impeccable audit assets/pdf/kreditec-case.html` (or rely on the write hook). Fix every finding it reports (the user's rule: always accept). Re-run until clean.

- [ ] **Step 4: Render to PDF**

Run: `chromium --headless --disable-gpu --no-pdf-header-footer --print-to-pdf=/mnt/data/repos/hesusg.github.io/downloads/kreditec-case.pdf "file:///mnt/data/repos/hesusg.github.io/assets/pdf/kreditec-case.html"` (or `google-chrome`/`chromium-browser`). Verify the file exists and opens.

- [ ] **Step 5: Verify the link target exists**

Run: `test -f downloads/kreditec-case.pdf && echo OK`
Expected: `OK` (the Data Mining card already links `../downloads/kreditec-case.pdf`).

- [ ] **Step 6: Commit**

```bash
git add downloads/kreditec-case.pdf assets/pdf/kreditec-case.html
git commit -m "feat(downloads): styled KrediTec case-study PDF (impeccable clean)"
```

---

## Task 12: Lead-magnet PDFs (staged for MailerLite upload)

**Files:**
- Create: `assets/lead-magnets/ser-tutor-corto.pdf`
- Create: `assets/lead-magnets/mitos-de-ia.pdf`
- Create: `assets/lead-magnets/README.md` (note: these are uploaded to MailerLite, not linked publicly)

**Interfaces:**
- Consumes: `/mnt/data/repos/ser-tutor/book/dist/ser-tutor-preview.html`, `/mnt/data/repos/tripleten-ai-hesusg/minimal.html`.
- Produces: two gated PDFs to upload into MailerLite (kept out of the public link graph).

- [ ] **Step 1: Render ser-tutor short to PDF**

Run: `chromium --headless --disable-gpu --print-to-pdf=/mnt/data/repos/hesusg.github.io/assets/lead-magnets/ser-tutor-corto.pdf "file:///mnt/data/repos/ser-tutor/book/dist/ser-tutor-preview.html"`

- [ ] **Step 2: Render Mitos de IA (minimal, unbranded) to PDF**

Run: `chromium --headless --disable-gpu --print-to-pdf=/mnt/data/repos/hesusg.github.io/assets/lead-magnets/mitos-de-ia.pdf "file:///mnt/data/repos/tripleten-ai-hesusg/minimal.html"`
(If charts need JS render time, open in a real headless run with `--virtual-time-budget=8000`.)

- [ ] **Step 3: Write `assets/lead-magnets/README.md`**

```markdown
# Lead magnets (gated)

These PDFs are NOT linked publicly. Upload them to MailerLite and deliver them via the
subscription confirmation email so the download is gated behind opt-in.

- ser-tutor-corto.pdf — short edition of *Ser Tutor*
- mitos-de-ia.pdf — *Mitos de IA* (minimal, unbranded edition)
```

- [ ] **Step 4: Verify both PDFs exist**

Run: `ls -1 assets/lead-magnets/*.pdf`
Expected: both files listed.

- [ ] **Step 5: Commit**

```bash
git add assets/lead-magnets/
git commit -m "feat(lead-magnets): stage ser-tutor short + Mitos de IA PDFs for MailerLite"
```

---

## Task 13: README, favicon, and final QA sweep

**Files:**
- Create: `README.md`, `assets/img/favicon.svg`
- Modify: both `index.html` heads to reference the favicon

**Interfaces:**
- Produces: repo front-matter + the cross-cutting verification gate.

- [ ] **Step 1: Write `README.md`**

```markdown
# hesusg.github.io

Personal site of Hesus Garcia Cobos: learning designer, builder, policy.
Static site (no build step) on GitHub Pages. EN default, ES mirror.

- Design system forked from academias.dev ("technical plate").
- Free downloads (Ser Tutor short, Mitos de IA) delivered via MailerLite.

License: content (c) 2026 Hesus Garcia Cobos. Code MIT.
```

- [ ] **Step 2: Add a minimal blue favicon**

Create `assets/img/favicon.svg`:
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="oklch(0.48 0.27 264)"/><text x="16" y="22" font-family="Bodoni Moda,serif" font-size="20" fill="oklch(0.93 0.21 112)" text-anchor="middle">H</text></svg>
```
Add to both heads: `<link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">`.

- [ ] **Step 3: Full QA sweep**

Run each, fix any failure:
```bash
# no corrupt characters anywhere
grep -rnP '[\x{0400}-\x{04FF}\x{FFFD}]' --include='*.html' --include='*.css' --include='*.js' . || echo OK
# every relative href target exists
grep -rhoE '(href|src)="\.\.?/[^"]+"' en/index.html es/index.html index.html | sed -E 's/.*"(.*)"/\1/' | sort -u
# external links resolve
grep -rhoE 'https://[^"]+' en/index.html | sort -u | while read u; do printf '%s ' "$u"; curl -s -o /dev/null -w '%{http_code}\n' -I "$u"; done
```
Expected: `OK`; relative targets all exist; external links `200/301/302`.

- [ ] **Step 4: Accessibility + render check**

Serve and open both `/en/` and `/es/`. Confirm: skip link works, focus rings visible, contrast holds, reduce-motion path is clean, mobile (<760px) stacks correctly with no vertical index. (Optional: run Lighthouse a11y; aim >= 95.)

- [ ] **Step 5: Run impeccable on the pages and accept all findings**

Run: `/impeccable audit en/index.html es/index.html assets/styles.css`. Fix every finding (always accept). Re-run until clean.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: README, favicon, QA sweep (links, a11y, impeccable clean)"
```

---

## Task 14: Deploy to GitHub Pages

**Files:** none (GitHub settings + push)

**Interfaces:**
- Produces: the live site at `https://hesusg.github.io`.

- [ ] **Step 1: Create the public repo and push (confirm visibility with the user first)**

```bash
gh repo create hesusg.github.io --public --source=. --remote=origin --push \
  --description "Hesus Garcia Cobos — learning designer, builder, policy. Static site."
```
(If the auto-mode classifier blocks public creation, ask the user to confirm, as we did for inteligencia-latam.)

- [ ] **Step 2: Enable GitHub Pages from `main` root**

```bash
gh api -X POST repos/HesusG/hesusg.github.io/pages -f source.branch=main -f source.path=/ || \
gh api -X PUT repos/HesusG/hesusg.github.io/pages -f source.branch=main -f source.path=/
```
(Or set Settings -> Pages -> Deploy from branch -> main -> /root in the web UI.)

- [ ] **Step 3: Verify the live site**

Wait ~1 min, then: `curl -s -o /dev/null -w '%{http_code}\n' https://hesusg.github.io/`
Expected: `200` and it redirects to `/en/`. Open in a browser and click through all four facets and the EN/ES switch.

- [ ] **Step 4: Verify deploy commit**

```bash
git log --oneline -1
git remote -v
```

---

## Backlog (not in v1 — separate plans later)

- Create the MailerLite account; replace `REPLACE_FORM_ID` / `REPLACE_ACCOUNT_ID`; upload the two lead-magnet PDFs; wire the delivery automation; test the opt-in -> download flow end to end.
- Publish EC0301 as a public, student-data-stripped mirror; deepen its card into a case page.
- Publish the Comparative Brief + MX-AICFT (post-Humphrey decision); add as a third lead magnet.
- Complete `course-itesm-data-mining` modules 3-9.
- Enable GitHub Pages for `ai-for-teachers` and `inteligencia-latam` so "Live" links exist.
- Per-project case-study pages (Problem -> Outcome with metrics) for the two flagships.
- Add the optional public-domain duotone hero etching via academias `duotone-hero.py`.
- Custom domain via `CNAME`.
- Verify the thesis country count (17 vs 7) and finalize that blurb.

## Self-review notes

- Spec coverage: tasks map to every v1 spec section (design system T1-5; facets T6-9; lang T10; KrediTec PDF T11; lead magnets T12; mailing-list embed T8/backlog; deploy T14). Backlog items are explicitly deferred, matching the spec's v1/backlog split.
- One live placeholder is intentional and flagged: the MailerLite `REPLACE_*` ids (no account yet) and the thesis country-count `[VERIFY]` note. Both are called out, not silent.
- Type/name consistency: section ids `work/building/research/contact` match across `en`, `es`, and `main.js` scroll-spy; CSS class names defined in T1-5 are the ones used in T6-9.
