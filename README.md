# ClinConnect

ClinConnect is a static job board that can be hosted on GitHub Pages while still loading live job data from Airtable whenever someone opens the site.

## Easiest GitHub Pages setup

1. In Airtable, create a public/shared view for the Jobs table.
2. Copy the public CSV download URL for that view.
3. In GitHub, go to **Settings → Secrets and variables → Actions → New repository secret**.
4. Add `VITE_AIRTABLE_CSV_URL` with that CSV URL.
5. Go to **Settings → Pages → Source → GitHub Actions**.
6. Push to `main`.

The site uses hash URLs like `/#/jobs`, so refreshes and direct links work on GitHub Pages without extra routing setup. Airtable edits appear on the next page load; no rebuild is needed for job changes.

## Alternative API setup

If you prefer Airtable's API instead of a public CSV view, add these GitHub Actions secrets instead:

- `VITE_AIRTABLE_TOKEN`
- `VITE_AIRTABLE_BASE_ID`
- `VITE_AIRTABLE_TABLE`

Use a read-only Airtable token scoped only to this base.

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/github-sbuyidjj)
