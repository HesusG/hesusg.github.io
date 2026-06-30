# Lead magnets (gated)

These PDFs are NOT linked publicly. They are uploaded to MailerLite and delivered via the
subscription confirmation email, so the download is gated behind opt-in (the site stays
static on GitHub Pages).

## Ready

- `ser-tutor-corto.pdf` — short edition of *Ser Tutor* (rendered from
  `ser-tutor/book/dist/ser-tutor-preview.html` via WeasyPrint).

## Backlog (needs a browser render)

- `mitos-de-ia.pdf` — *Mitos de IA* (minimal, unbranded). Source:
  `tripleten-ai-hesusg/minimal.html`. It draws its charts with JavaScript (Scrollama /
  roughViz), which WeasyPrint does not execute, so it must be rendered with a headless
  browser (e.g. `npx playwright install chromium` then print-to-pdf, or Chrome
  `--headless --print-to-pdf` with `--virtual-time-budget`). Deferred until a browser is
  available on the build host.

## Wiring (backlog, with MailerLite)

1. Create the MailerLite account and a "Free downloads" signup form (double opt-in on).
2. Upload these PDFs; set the confirmation automation to email the download links.
3. Replace `REPLACE_FORM_ID` and `REPLACE_ACCOUNT_ID` in `en/`, `es/`, and `assets/main.js`.
4. Test the opt-in to download flow end to end.
