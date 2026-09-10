# RCCDP Site Migration

## Project overview
Migrating rccdp.org from WordPress (Cloudways) to a plain HTML/CSS/JS static site hosted on Netlify. Client is non-technical; Anna (the webdev) handles all updates. No CMS, no build step — files edited directly and pushed to Netlify via git.

## Client
- **Site**: rccdp.org — Redwood City Child Development Program
- **Contact email on record**: anna@luckypixelsdesign.com
- All server, WP admin, Drive, and Netlify credentials → **see `SECRETS.md`** (gitignored)

## Server (Cloudways — keep until migration ships)
- SSH, WP root path, DB credentials → see `SECRETS.md`
- **WP-CLI**: available at `/usr/local/bin/wp` — run from inside `public_html`

## Current WordPress plugins (active)
| Plugin | Purpose | Keep? |
|---|---|---|
| use-your-drive | Google Drive file browser (PDFs + gallery) | **Replace** — going static |
| antispam-bee | Comment spam | Drop (no comments on static site) |
| breeze | Cloudways cache | Drop |
| broken-link-checker | Link auditing | Drop |
| shortpixel-image-optimiser | Image compression | Drop (compress at build time) |
| simple-social-icons | Facebook icon in footer | Recreate in HTML |
| updraftplus | Backups | Drop |
| wordfence | Security | Drop |
| wordpress-seo | Yoast SEO | Drop (SEO not a priority) |

## Site structure — 14 pages
| Old URL | Suggested new URL | Notes |
|---|---|---|
| / | / | Homepage |
| /about/ | /about/ | |
| /about/annual-report/ | /about/annual-reports/ | Drive widget → static PDFs |
| /about/board-of-directors/ | /about/board/ | |
| /about/management-and-staff/ | /about/staff/ | 21 staff photos |
| /classroom-schedules/ | /programs/schedules/ | |
| /contact/ | /contact/ | |
| /contact/resources-links/ | /resources/ | Flattened — odd to nest under contact |
| /curriculum-by-levels/ | /programs/curriculum/ | |
| /nutrition-programs/ | /programs/nutrition/ | |
| /pages/gallery/ | /gallery/ | Drive widget → static images |
| /policies-procedures/ | /policies/ | Drive widget → static PDFs |
| /privacy-policy/ | /privacy-policy/ | |
| /tuition-rates-applications/ | /enroll/ | Drive widget → static PDFs + rate table |

Redirects go in `_redirects` (Netlify format: `old  new  301`). Build the full mapping when URL structure is finalized.

## Google Drive — source of truth for PDFs and gallery
Plugin was `use-your-drive` authenticated as `annarider@rccdp.org`. Drive folder IDs → **see `SECRETS.md`** (gitignored).

To access via Drive MCP: authenticate as email in secrets.md (ask the user which account to use BEFORE calling any Drive MCP tool).

## Subsidy PDFs already on the server
Found in `wp-content/uploads/2025/01/`:
- `RCCDP-Subsidy-Application-English.pdf`
- `RCCDP-Subsidy-Application-English-1.pdf`
- `RCCDP-Subsidy-Application-English-2.pdf`
- `RCCDP-Subsidy-Application-Spanish.pdf`
- `RCCDP-Subsidy-Application-Spanish-1.pdf`

Determine canonical version before including in static site.

## Static file layout (actual — pages use subdirectory index.html pattern)
```
/
  index.html
  _redirects
  about/
    index.html
    board/index.html
    staff/index.html
    annual-reports/index.html
  programs/
    curriculum/index.html
    schedules/index.html
    nutrition/index.html
  gallery/index.html
  policies/index.html
  resources/index.html
  enroll/index.html
  contact/index.html
  privacy-policy/index.html
  assets/
    css/
      style.css
    js/
      components.js   ← shared nav + footer injected into every page
      lightbox.js     ← custom PDF + image lightbox (not yet built)
    images/
      cropped-RCCDP-logo_v2b_blue_text.png  ← square icon logo used in nav
      hero-bg.jpg     ← homepage hero photo
      SY-*.jpg        ← 10 professional classroom photos (SY-0001 to SY-0375)
      staff/          ← 21 staff headshots; 18 are 682×1024 2026 originals
    documents/
      annual-reports/
      handbooks/
      enrollment/     ← full-cost + subsidy applications
```

## PDF lightbox behavior
Client wants Drive-style lightbox preview. Plan: hidden overlay `<div>` with `<iframe>` toggled on click. On mobile, fall back to opening PDF in new tab if iframe won't render. PDF.js is backup plan only if native iframe testing fails.

## Forms — UNRESOLVED (pending client call)
Currently all "forms" are downloadable PDFs (print/mail). Client call needed to decide:
- (a) Keep as static PDF downloads, or
- (b) Add actual web form (Netlify Forms or Formspree — no server needed)
Plan: ship draft with static PDFs + one sample interactive form so client can compare both live.

## Image assets on WordPress server
All uploads: `/home/129366.cloudwaysapps.com/utvwvxhaeu/public_html/wp-content/uploads/`
Key images by year folder: 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026.
Pull via rsync: `rsync -avz webdev@45.77.186.223:/home/129366.cloudwaysapps.com/utvwvxhaeu/public_html/wp-content/uploads/ assets/images/wp-uploads/`

## Migration status

### Infrastructure
- [x] URL crawl complete (14 pages)
- [x] Content inventory complete (all pages)
- [x] Plugin audit complete
- [x] Drive folder IDs extracted from WP shortcodes
- [x] Images rsynced from WP server → `assets/images/wp-uploads/` (271MB, gitignored)
- [x] GitHub repo made public (required for Netlify free tier)
- [x] Netlify auto-deploys on push to `main` — site is live
- [x] Credentials moved to `SECRETS.md` (gitignored)
- [ ] DB dump (WP-CLI: `wp db export` from public_html) — not urgent, backup only
- [ ] Download PDFs from Google Drive (authenticate as annarider@rccdp.org)
- [ ] Finalize `_redirects` file (old WP URLs → new URLs, 301s)
- [ ] Confirm Netlify is actually connected to annarider/rccdp repo

### Design & shared components
- [x] Design system: Amatic SC (headings) + Merriweather (body) + Roboto (UI)
- [x] Color tokens: navy `#014e91` primary, pink `#d43c67` accent (Infinity Pro palette)
- [x] `components.js` — shared nav + footer injected into every page
- [x] Nav: Facebook icon, GiveButter donate button, working dropdowns, visible caret
- [x] Footer: Facebook circle icon, copyright, license number
- [x] Per-page hero photos via `--page-hero-img` CSS variable + `::before` overlay
- [x] Notepad ruled-line texture on alternating sections (approved by client)

### Pages — all 14 built
- [x] Homepage (`/`) — photo strips, collage, program cards, nutrition section, CTAs
- [x] About (`/about/`) — page hero photo
- [x] Board of Directors (`/about/board/`)
- [x] **Staff (`/about/staff/`)** — full verbatim first-person bios, portrait photos (682×1024 uncropped), collapsible TOC; 3 staff still have 600×600 (Latu, Ontiveros, Penisini — no 2026 originals found)
- [x] Annual Reports (`/about/annual-reports/`)
- [x] Curriculum (`/programs/curriculum/`)
- [x] Schedules (`/programs/schedules/`)
- [x] Nutrition (`/programs/nutrition/`)
- [x] Gallery (`/gallery/`)
- [x] Policies (`/policies/`)
- [x] Resources (`/resources/`)
- [x] Enroll (`/enroll/`)
- [x] Contact (`/contact/`)
- [x] Privacy Policy (`/privacy-policy/`)

### Content still needing verbatim fixes
- [ ] **Board page** — bios have invented/placeholder content; needs verbatim from live site
- [ ] **About page** — children's stories need full verbatim text; remove border boxes around them
- [ ] **Privacy policy** — missing sections: Comments, Media, Embedded content, Data retention
- [ ] **Resources page** — missing "Single Parents Online Education" section

### Assets still needed
- [ ] PDFs from Google Drive: Annual Reports, Family Handbooks (EN+ES), Full-cost Tuition Application
- [ ] Canonical subsidy PDFs — 5 versions on server in `wp-content/uploads/2025/01/`; determine which is current
- [ ] Gallery images — from Drive folder (see SECRETS.md for folder ID)
- [ ] 2026 staff portraits for Ana Latu, Araceli Ontiveros, Daneyah Penisini (not found in wp-uploads/2026/04/)
- [ ] PDF thumbnail previews — `pdftoppm` first-page JPEGs once PDFs land
- [ ] Confirm Facebook URL — currently using `facebook.com/rccdp` (unverified)
- [ ] Google Maps embed on Contact page (client confirmed they want it)

### Features still to build
- [ ] PDF/image lightbox (`assets/js/lightbox.js`) — iframe overlay, mobile falls back to new tab
- [ ] Sample interactive contact form (Netlify Forms) — pending client decision (static PDFs vs web form)
- [ ] Client call — form decision

### Launch checklist
- [ ] All content verified verbatim
- [ ] All PDFs in place with lightbox working
- [ ] `_redirects` complete for all 14 old WP URLs
- [ ] Client review and sign-off
- [ ] Launch

## Netlify
- Staging and production both on Netlify
- Redirects via `_redirects` file at repo root
- Auto-deploys on push to main
