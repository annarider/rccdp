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

## Static file layout (target)
```
/
  index.html
  about.html
  board.html
  staff.html
  schedules.html
  curriculum.html
  nutrition.html
  gallery.html
  policies.html
  resources.html
  enroll.html
  contact.html
  privacy-policy.html
  _redirects
  assets/
    css/
      style.css
    js/
      lightbox.js     ← custom PDF + image lightbox (no library)
    images/
      logo.png
      staff/          ← 21 staff headshots
      gallery/        ← photo gallery images
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
- [x] URL crawl complete (14 pages)
- [x] Content inventory complete (all pages)
- [x] Plugin audit complete
- [x] Drive folder IDs extracted from WP shortcodes
- [ ] Download images from server (rsync wp-content/uploads)
- [ ] Download PDFs from Google Drive (authenticate as annarider@rccdp.org)
- [ ] DB dump (WP-CLI: `wp db export` from public_html)
- [ ] Build static HTML pages
- [ ] Build PDF/image lightbox
- [ ] Build sample interactive form (Netlify Forms)
- [ ] Deploy draft to Netlify preview URL
- [ ] Client call — form decision
- [ ] Finalize URL redirect map (_redirects file)
- [ ] Launch

## Netlify
- Staging and production both on Netlify
- Redirects via `_redirects` file at repo root
- Auto-deploys on push to main
