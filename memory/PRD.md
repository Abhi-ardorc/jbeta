# PRD — Believe Joanie Believe

## Original Problem Statement
Build a website for the book "Believe Joanie Believe" with: Home, About the Book, Meet the Author, Purchase, Blog, Write to the Author (contact), Reader Reviews, Press & Media, plus future Merchandise and optional Legal pages. User choices: placeholder purchase buttons; email the owner on every contact message; core sections first (merch + legal later); warm & heartfelt feel, modern/creative/professional, award-level design.

## Architecture
- Frontend: React (CRA/craco), Tailwind, framer-motion, lenis (smooth scroll), react-fast-marquee, sonner toasts. Pages: Home, About, Author, Purchase, Blog, BlogPost, Contact, Reviews, Press.
- Backend: FastAPI + MongoDB (motor). Routes: /api/contact, /api/subscribe, /api/blog, /api/blog/{slug}, /api/reviews (GET published / POST pending). Seeds blog posts + reviews on startup when empty.
- Email: Emergent managed Resend proxy (EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME in backend/.env). Owner notifications send to OWNER_EMAIL env var — pending user's address.
- Assets: 7 real chapter illustrations extracted from the author's shared Adobe PDF, served from /public/illustrations. Book cover = typographic CSS cover over Chapter 1 art with 3D mouse tilt.

## User Personas
- Readers discovering the book; fans writing to the author / sharing stories; press & podcasters; the author/owner receiving messages and reviews.

## Implemented (2026-07-27)
- Kinetic hero with masked line-by-line reveal, 3D tilting book cover, scroll parallax, slow editorial marquee, grain texture, Cormorant Garamond + Manrope.
- Re-paletted (2026-07-27, user feedback) to match the real cover: periwinkle/dusty blue primary (#4E6BA8), ice backgrounds, ink navy text; favicon + logo mark recolored.
- Real book cover (user-uploaded, cropped clean) now used in hero, About CTA, and Purchase page. Author credited as Jay. A Lions across Home, Author, and Press.
- All 8 core pages built; contact + newsletter + review forms wired to backend; blog & reviews served from MongoDB.
- Wow-motion pass (2026-07-27): Apple-style pinned scroll showcase (book scrubs through Chapters 1/6/39 with rotation, crossfading text, progress dots), cinematic shine sweep on cover load, floating hero book, parallax quote band (Ch 37 night art), scroll progress bar in navbar.
- Owner email notification pipeline built (managed Resend); awaits OWNER_EMAIL value (user skipped the secrets card once).

## Backlog
- P0: Wire OWNER_EMAIL (user to provide via secure card).
- P1: Real Amazon/B&N purchase links when live; real author name/bio/photo; press kit PDF; merchandise section; legal pages (privacy, terms, copyright, reader-submission permissions).
- P2: Admin view for messages/reviews/subscribers; publish-approval flow for reviews; events & appearances content; audiobook details.

## Next Tasks
1. Save OWNER_EMAIL, restart backend, verify a contact message sends email.
2. Collect real purchase links at launch.
3. Replace sample blog posts/reviews with the author's real content.
