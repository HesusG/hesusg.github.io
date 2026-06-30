# Spec: hesusg.github.io — tri-faceted portfolio "Technical Plate" + lead magnets

**Date:** 2026-06-29 (rev. 2 — scope expanded to 3 facets + mailing list)
**Owner:** Hesus Garcia Cobos
**Status:** Approved design (visual mockup validated; structure + scope locked via grill-me)

## Context

Hesus is applying to the Humphrey Fellowship (Technology Policy & Management). The
application package lives in the private repo `humphrey-fellowship`; the checklist calls
for a public portfolio as evidence. During design we found his real work is **tri-faceted**:
he is an **instructional designer**, a **developer/systems builder**, and a **policy
researcher**. The portfolio doubles as his permanent personal site (the person, distinct
from the AcademIA consultancy at academias.dev) and as a **lead-funnel** (free downloads in
exchange for a mailing-list subscription).

Visual system: forked from academias.dev ("The Technical Plate") and pushed to the
aesthetic extreme, drawing on locomotive.ca (cascading hero, minimal typographic nav) and
iljavaneck.com (sticky two-column project cards). The hero's cascade — `Builder,` /
`educator,` / `policy architect.` — literally announces the three facets.

Deadline: Humphrey closes 2026-07-26, so we ship a v1 linking what is already public and
treat the rest as a prioritized backlog.

## Goals

- One public, bilingual (EN default / ES) static site on GitHub Pages (`hesusg.github.io`).
- Three facets (Teaching & Learning Design · Building · Research & Policy) + About/Contact,
  each with 2-3 flagship items and a unifying thesis: *I design learning, build the systems
  that scale it, and study the policy that should govern it.*
- Show one identity multiplying another (the ID x dev x research bridge piece).
- A mailing-list subscribe section delivering gated free downloads (lead magnets).
- Credible, human, anti-slop copy. English primary (the committee reads English).

## Non-goals (v1)

- No CMS/framework/build step. Hand-authored HTML/CSS/JS.
- No per-project generated illustrations (typographic monograms + 1-2 public-domain duotone
  etchings only).
- No backend: gated downloads are handled by an external ESP (MailerLite), not GitHub.
- Per-project deep case-study pages are backlog, not v1 (except the KrediTec case PDF).

## Constraints (confidentiality — verified)

- **BEDU is now nameable** (company closed). The B2B "Intro to AI / data-storytelling"
  course can credit BEDU.
- **EXCLUDE** the confidential code-review bot ("SDD Code Reviewer") found in
  `nano-spud-infra` — never describe it.
- The in-progress DeepLearning.AI **context-engineering** course: minimal mention or omit.
- Strip any student PII before publishing EC0301 / grader / data-mining materials.

## Decisions (locked)

| Branch | Decision |
|---|---|
| Build base | Fork academias.dev system (tokens + components), pushed extreme |
| Repo / URL | `hesusg.github.io` (GitHub Pages user site) |
| Structure | 3 facets mirroring the hero arc + About/Contact |
| Hero | Cascading `Builder,` / `educator,` / `policy architect.` |
| Nav | Vertical side index (I · II · III · IV), scroll-spy |
| Project cards | Sticky stack, two-column cards |
| Imagery | Typographic monograms + 1-2 public-domain duotone etchings (no generation) |
| Language | EN default, ES mirror, shared CSS, lang redirect + localStorage |
| Mailing list | **MailerLite** (free 1k, native lead-magnet delivery, GDPR double opt-in, JS embed) |
| Lead magnets (v1) | ser-tutor (short) + "Mitos de IA" (minimal -> PDF). Governance Brief later (backlog) |
| Case PDF | KrediTec "situacion-problema" rendered as a styled PDF (impeccable), part of the data-mining flagship (not gated) |
| Quality gate | Run impeccable anti-slop + evaluate; **always accept and fix** what impeccable flags |
| Scope | v1 ships public links + ready lead magnets; rest is backlog |

## Architecture / file structure

```
hesusg.github.io/
  index.html            # lang redirect (localStorage) + <noscript> fallback
  en/index.html         # English page (canonical)
  es/index.html         # Spanish mirror
  assets/
    styles.css          # forked + extended academias tokens & components
    main.js             # scroll-spy, reveal, sticky, lang persistence, MailerLite embed
    img/                # 1-2 duotone etchings + favicon/logo
  downloads/            # public artifacts safe to expose (e.g., KrediTec case PDF)
  CNAME                 # (later) custom domain
  README.md             # short bilingual note + license
  docs/superpowers/specs/2026-06-29-hesusg-portfolio-design.md
```

## Design system (forked from academias, pushed)

Color (OKLCH, canonical): `--bg 0.99 0.004 255`, `--ink 0.20 0.03 264`,
`--blue 0.48 0.27 264` (identity), `--ink-blue 0.32 0.17 264`, `--muted 0.45 0.03 264`,
`--acc 0.93 0.21 112` (citron, only on blue), `--on-blue 0.99 0.004 255`,
`--line 0.90 0.012 264`. Type: Archivo (display 700/800), Bodoni Moda (wordmark/eyebrow),
IBM Plex Mono (body/UI/nav). Doctrine: matte blue frame, subtle grain/vignette, no cards
elsewhere / no shadows, radius 2px, no em/en dashes, citron never on white. "Pushed":
larger hero clamp, tighter tracking, more full-bleed blue.

## Content map (three facets)

**I · Teaching & Learning Design** (educator)
- Flagship: **EC0301 "IA para Docentes"** — 22h course, 145-criterion certified rubric,
  ABCD objectives, diagnostic/formative/summative instruments, manuals (`EC301-HG_1`).
- Secondary flagship: **ITESM Data Mining** (`course-itesm-data-mining`, public) + the
  **KrediTec case** (styled PDF; the "situacion-problema").
- ID x dev bridge: **6-competency rubric system** (`diagnostico-lineas-accion`) +
  **automated grader** (`diagnostico-lineas-accion-m1-grader`).
- **DeepLearning.AI — RAG course** (public link).
- **BEDU** — multi-year B2B + public "Intro to AI / data-storytelling" course (xlsx design).
- Open: ai-for-teachers, InteligencIA-LATAM. Credential: Illinois MasterTrack (EPOL).

**II · Building** (builder)
- Flagship: **nano-spud-infra** (public homelab) — Prometheus/Grafana, Tailscale+nftables
  zero-trust (reused 6+), Ollama local LLM, Immich, n8n, **Digital Observatory** pipeline.
  (review bot excluded.)
- Bridge: the automated grader (Python/Jupyter feedback).
- **academias.dev** (built static site, live).

**III · Research & Policy** (policy architect)
- **Thesis** (`tesis-hesusg-pedadogia`, live site). NOTE: verify country count
  (essays say 17; one inventory said 7) before publishing the blurb.
- **UNESCO TFC1** (`unesco-policy-planning-education-2026`, PDF deliverable).
- **IFE 2026 paper** (`ife-2026-cell-feedback-paper`, Springer, in review) — also bridges
  to the assessment/feedback ID work.
- **China / INFOTEC seminar** on Confucianism (upcoming — label as such).
- Comparative Brief + MX-AICFT (private; publish post-decision -> backlog + future magnet).

**IV · About / Contact**
- Arc bio + unifying thesis line.
- Contact: hesusgc@gmail.com · github.com/HesusG · linkedin.com/in/hgcobos ·
  x.com/HG_Cobos · academias.dev.
- **Subscribe + free downloads** (MailerLite).

## Lead magnets + mailing list (MailerLite)

- GitHub Pages is static; gating needs an ESP. Embed a MailerLite form (JS snippet) in a
  "Free downloads" section. On double opt-in, MailerLite's automation emails the download
  link; the file lives in MailerLite (truly gated), not as a public GitHub URL.
- v1 magnets: **ser-tutor (short)** (HTML + EPUB, ready) and **"Mitos de IA"** (render
  `tripleten-ai-hesusg/minimal.html` to PDF). Governance Brief is a later magnet.
- The page is freely readable; only the download requires signup (GDPR "freely given").

## Case-study PDFs (impeccable)

- Render the KrediTec "situacion-problema" (`sp_datamining_rev1.docx`) into a styled PDF in
  the portfolio's visual language. Run impeccable anti-slop + evaluate and **accept/fix all
  findings**. This PDF sits in `downloads/` and is linked from the data-mining flagship.

## v1 vs backlog

**v1 (ship by 2026-07-26):** the static site (3 facets), linking already-public items
(thesis live, nano-spud, DeepLearning.AI RAG, academias.dev, InteligencIA-LATAM repo,
UNESCO TFC1, IFE preprint, course-itesm-data-mining) + KrediTec case PDF + MailerLite form
+ ready magnets (ser-tutor short, Mitos de IA).

**Backlog (post-deadline):** publish EC0301 (student data stripped) as the ID flagship;
publish Comparative Brief + MX-AICFT; complete data-mining modules 3-9; enable GitHub Pages
for ai-for-teachers / inteligencia-latam; per-project case-study pages; custom domain.

## Accessibility, anti-slop, verification

- Semantic landmarks, skip link, focus-visible, lang/hreflang, reduced-motion path for
  every animation, content readable without JS.
- Anti-slop: academias `anti-slop-checklist.md`; Spanish via `humanizar-es-mx`; no
  fabricated metrics; impeccable findings always accepted.
- Verify: links resolve (incl. live sites/PDFs), EN page has no stray Spanish, no corrupt
  characters, MailerLite form submits + delivers a test download, Lighthouse a11y pass.

## Open items to confirm during implementation

- Thesis country count (17 vs 7).
- Whether EC0301/grader repos are already public or need a stripped public mirror.
- Exact MailerLite account + form id (user creates the account; we embed the snippet).
