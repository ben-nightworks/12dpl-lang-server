# 12dPL Docs Website

A static documentation site for the 12d Programming Language. The content is
**auto-generated from the language server's source-of-truth files** every time
those files change — no separate doc copy to keep in sync.

## What it is

Single-page app (vanilla HTML/CSS/JS) under `public/`, plus a Python build
script under `scripts/` that produces `public/site_data.js` from the lang
server's resources.

## Source-of-truth files

The build script reads from the language server, **not** from local copies:

| Source file | Drives |
| --- | --- |
| `server/src/resources/functions.enriched.json` | Function reference (3000+ calls) |
| `server/src/resources/typeDocumentation.json` | Type reference (~360 types) |
| `snippets/12dpl.tmSnippets.json` | Snippet reference |

Add a function / type / snippet to those files → next push regenerates the
website.

## Local build

Requires Python 3.10+.

```bash
python website/scripts/build_site_data.py
```

This writes:
- `website/public/site_data.js` — the SPA's data bundle
- `website/public/data/*.json` — raw downloads exposed via the SPA's footer
- `website/public/robots.txt` — allows all crawlers, AI bots explicitly welcomed
- `website/public/sitemap.xml` — every indexable section listed for search engines

All four are gitignored. To preview locally, serve the `public/` directory:

```bash
python -m http.server -d website/public 8000
```

Then open <http://localhost:8000>.

## Deployment (Vercel)

`vercel.json` points Vercel at the Python build command and the `public/`
output directory. Once the GitHub repo is connected to a Vercel project, every
push triggers a deploy:

- Pushes to `main` → production deploy
- Pushes to any other branch → preview deploy with a unique URL

### One-time Vercel setup

1. Sign in at <https://vercel.com> with GitHub.
2. **Add New Project** → import `ben-nightworks/12dpl-lang-server`.
3. Set the **Root Directory** to `website`.
4. Framework preset: **Other**.
5. Build command and output directory are picked up from `vercel.json`.
6. Deploy.

After this, no further manual action is required — every commit ships.

### Setting the canonical URL

`robots.txt`, `sitemap.xml`, and several SEO meta tags reference the production
URL. The default is `https://12dpl-docs.vercel.app`. Override at build time by
setting `SITE_URL` (no trailing slash):

```bash
SITE_URL=https://docs.example.com python website/scripts/build_site_data.py
```

In Vercel, add `SITE_URL` to **Project Settings → Environment Variables** so
preview and production deploys pick it up.

After changing the canonical URL, also update the hard-coded URLs inside
`website/public/index.html` (canonical link, `og:url`, `og:image`,
`twitter:image`, JSON-LD `@id`/`url`).

## Discoverability / SEO

The site ships with everything needed to be found and re-indexed quickly:

- **Meta tags**: description, keywords, robots (`index, follow`), `googlebot`,
  `bingbot`, theme-color.
- **Canonical link** + `<link rel="sitemap">`.
- **Open Graph** + **Twitter Card** for rich previews on Slack, Discord,
  LinkedIn, Twitter/X, etc.
- **JSON-LD structured data** (`@type: WebSite`, `SoftwareSourceCode`,
  `TechArticle`) so Google understands what the site is and links it to the
  open-source project.
- **`sitemap.xml`** auto-generated from the section list, refreshed on every
  build with today's `<lastmod>`.

### AI / LLM scrapers

`robots.txt` explicitly **welcomes** AI scrapers — content is MIT-licensed and
we want the docs reachable through AI-powered search and assistants. The
welcomed user-agents include `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`,
`ClaudeBot`, `Claude-Web`, `anthropic-ai`, `Google-Extended`, `CCBot`,
`PerplexityBot`, `Bytespider`, `Meta-ExternalAgent`, and others. Update the
`AI_BOTS` list in [scripts/build_site_data.py](scripts/build_site_data.py) to
add new ones.
