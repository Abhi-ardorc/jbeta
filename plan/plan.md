# Believe, Joanie, Believe — SEO + WordPress-style Admin + Security Plan

The book website gains a private owner area (write and manage blog posts, read reader messages, approve reviews, see subscribers) and a full search-engine setup so it can rank on Google and be quoted by AI assistants. Security hardening protects the forms and the admin login, the way WordPress security plugins would.

## Who it's for
- The site owner (Jay. A Lions' team) who wants to publish SEO blog posts and manage reader content without touching code.
- Readers and press who find the site through Google, ChatGPT/Perplexity answers, and shared links.

## Core features and experience (Phase 1 — built now)

1. **Private admin area** (`/admin`, hidden from public navigation)
   - Owner login with email + password (secure hashed password, lockout after 5 failed attempts, signed session tokens).
   - **Blog manager**: create, edit, publish/unpublish, delete posts with title, story text, category, cover image (choose from the book's illustrations), slug, and per-post SEO fields (search title + description) — the WordPress post editor experience.
   - **Form inbox**: every "Write to the Author" message listed, read/unread, with the publish-permission flag visible.
   - **Review moderation**: reader-submitted reviews appear as pending; owner approves them onto the public Reviews page or deletes them.
   - **Subscribers list**: everyone who joined the book-updates list, with a copy/export-friendly view.

2. **SEO foundation (best practice, like a well-set-up WordPress + SEO plugin)**
   - Unique title + description for every page (Home, Book, Author, Purchase, Blog, each blog post, Contact, Reviews, Press).
   - `robots.txt` that welcomes Google, Bing, and AI crawlers while keeping them out of the API.
   - `sitemap.xml` covering all public pages and blog posts (added once the real domain is known).
   - Structured data (Book + Author schema) so Google understands this is a book by Jay. A Lions — no invented ratings or facts.
   - Share cards: correct title, description, and the book cover image when the link is pasted into WhatsApp, Facebook, iMessage, etc.
   - An FAQ block on the site (visible to visitors) tuned so AI assistants can quote it.
   - `llms.txt` summary file for AI engines.
   - On-page hygiene: one main heading per page, image descriptions, crawlable links.

3. **Security hardening (the "security plugin" equivalent)**
   - Admin login lockout after repeated failed attempts; short-lived signed session tokens stored in hardened cookies.
   - Rate limiting on the public forms (contact, reviews, subscribe) to stop spam bots.
   - All visitor input validated server-side; admin-only routes reject non-admins.
   - CORS tightened to the site's own address; HTTPS handled by the hosting platform.

## User flow
- Owner visits `/admin`, logs in, lands on a simple dashboard (posts / messages / reviews / subscribers), writes a post with its SEO fields, hits publish — it appears on the public Blog instantly.
- A reader submits a message or review → owner sees it in the inbox/moderation queue → approved reviews appear publicly.
- A searcher on Google finds a blog post with its own proper title and description; an AI assistant answers questions about the book citing the FAQ and structured data.

## UI/UX feel
- Admin: same warm cover-blue design language as the site, but simpler and tool-like — clean tables, clear buttons, no cinematic motion. Fast to use on phone or desktop.
- Public site: visually unchanged except the new FAQ section and SEO-driven heading tweaks.

## Implementation phases
- **Phase 1 (built now):** admin login + dashboard (blog editor with SEO fields, form inbox, review approvals, subscribers), full SEO pack (per-page titles/descriptions, robots.txt, JSON-LD, FAQ, llms.txt, on-page hygiene), and security hardening (lockout, rate limits, input validation, tightened CORS).
- **Phase 2 (after a real domain is attached):** canonical URLs, sitemap with the real domain, absolute share-card URLs, Google Search Console submission, 1200×630 share image, plus editing page text (homepage copy, author bio) from the admin.
- **Phase 3 (later):** send newsletter emails to subscribers from the admin, media library for uploading new illustrations, merchandise section, simple stats dashboard.

## Assumptions
- Hosting stays on Emergent (chosen): the live server, database, forms, and admin all keep working; cPanel static hosting is not used because it cannot run them.
- "Complete way like WordPress" is scoped to what this site actually has: blog posts, messages, reviews, and subscribers in Phase 1; editing the site's fixed page text (author bio, homepage copy) is Phase 2.
- Admin credentials are generated during the build, handed over in the completion summary, and changeable later.
- Absolute SEO URLs (canonical, sitemap, share links) are omitted until a real production domain exists — a guessed domain would hurt ranking, so these are added in Phase 2 once the domain is confirmed.
- Structured data contains only confirmed facts (book title, author name); no invented ratings, prices, or dates.
- SEO results are not instant: after deployment, the site needs the crawler toggle enabled and Google Search Console submission; ranking takes days to weeks.
- OWNER_EMAIL (for contact-form email alerts) is still unset; the admin inbox works regardless.
