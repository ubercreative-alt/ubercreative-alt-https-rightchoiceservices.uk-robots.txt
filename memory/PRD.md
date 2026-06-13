# PRD — Right Choice Services Website

## Original Problem Statement
Build a new website for "Right Choice Services Ltd" (UK youth accommodation & support service):
- Layout/structure replicating the Licos Elementor template kit (demo8.eightheme.com/licos) as accurately as possible
- Content scraped from the existing site rightchoiceservices.org
- Colors: light purple / indigo palette from the demo8 site
- Logo: placeholder until the user provides one
- Team/people photos: stock placeholder images
- (User originally referenced Image1–Image12 PDFs with logo/colors/people, but assets were never uploaded — placeholders used per user confirmation)

## Business Context (scraped from rightchoiceservices.org)
- Company: Right Choice Services LTD — supported accommodation & support for young people (16–18 and 18+) transitioning from local authority care and/or custody
- Areas: North London, Essex, Medway (South East England)
- Contact: 22 Mount Pleasant Road, Barnet, EN4 9HH · Tel 01992 850277 · Mobile 07830 107651 · info@rightchoiceservices.org
- Partner agencies: Police, Social Services, Local Authorities, Mental Health Teams, Youth Offending Teams, Barnardo's, Enable, etc.

## Architecture
- Frontend: React (CRA + craco), Tailwind, shadcn/ui, lucide-react, sonner toasts
  - Pages: `/` (Home.jsx), `/referrals` (Referrals.jsx) — routed in App.js
  - Section components in `/app/frontend/src/components/site/` (TopBar, Header, Hero, PartnersStrip, WhoWeAre, SupportPillars, Approach, FeaturedServices, Benefits, Process, Safeguarding, CtaContact, ContactForm, ReferralForm, Team, Testimonials, ServiceAreas, Faq, NewsSection, NewsletterForm, SocialLinks, Footer)
  - All content centralized in `/app/frontend/src/data/content.js`
  - Theme: CSS variables in index.css (--rc-indigo-950..500, --rc-lavender, --rc-paper); fonts Quicksand (headings) + Mulish (body)
- Backend: FastAPI + MongoDB (motor) in `/app/backend/server.py`
  - POST/GET `/api/contact` — contact form messages (collection: contact_messages)
  - POST `/api/newsletter` — newsletter subscribe, idempotent on duplicate email (collection: newsletter_subscribers)
  - POST/GET `/api/referrals` — referral submissions (collection: referrals)
- Tests: `/app/backend/tests/test_api.py` (pytest regression suite, 8 cases)

## What's Implemented (2026-06-12)
- ✅ Full one-page site cloning the Licos layout: topbar, sticky header (solid on scroll), hero with glass service card, partner marquee + stat block, who we are, 4 support pillar image cards, approach, featured services (dark), benefits grid (dark), 4-step process, safeguarding with progress bars, CTA + working contact form, testimonials, service areas (pricing-style cards), FAQ accordion, news cards, footer with working newsletter
- ✅ Backend contact + newsletter endpoints with email validation
- ✅ Tested by testing agent: 100% backend, 100% frontend (iteration_1.json)
- ✅ Hero fallback background fix for header contrast
- ✅ Code review fixes: stable keys, component extraction (ContactForm, NewsletterForm, SocialLinks, DesktopNav/MobileNav, AreaCard), use-toast effect deps, craco console.warn guarded, parametrized pytest suite (10 tests pass)
- ✅ Real brand logo applied (user upload): /app/frontend/src/assets/logo-full.png (full lockup), logo-mark.png (icon used in Header/Footer Logo component), favicon at /app/frontend/public/favicon.png
- ✅ Team section (#team) added between Contact and Testimonials with 9 real team photos from user PDFs (Images 1–10; Image 4 & 5 were duplicates) saved at /app/frontend/src/assets/team-1..9.jpg, 3-col grid
- ✅ 5 named Team Leaders with full bios from user ODT files (Brikelda Shabanaj, Deborah Howlett, Erjona Selko, Eugen Bardho, Fatmira Pjetri) + "Read Bio" dialog (shadcn Dialog). Photo↔name pairing CONFIRMED by user (Brikelda=team-1, Deborah=team-2, Erjona=team-3, Eugen=team-4, Fatmira=team-5)
- ✅ Final 4 team members added from second ODT batch: Robert Toska (Nominated Individual, team-6 gray-haired man — confident match, only male left), Rita Cleary (team-7), Linda Madimutsa (team-8), Riada Mjeshtri (team-9). Robert displayed FIRST in the grid. The 3 women's photo pairing is BEST-GUESS — awaiting user confirmation. Used document spellings (Mjeshtri/Cleary) over filename spellings (Mjeshti/Clearly). No placeholders remain
- ✅ Fixed scrolled-header bug: `bg-[var(--rc-indigo-900)]/95` opacity modifier doesn't compile in Tailwind v3 → replaced with `bg-[#2a2566]/95`
- ✅ Code review round 2: shared useSubmit hook (src/hooks/useSubmit.js) used by ContactForm + NewsletterForm, craco console.warn removed, Python type hints added to server.py routes and test_api.py (10 tests pass)

- ✅ Referral page (/referrals, 2026-06-12): page hero, "What happens next" 3 steps, Got Questions card, referral form modelled on original site (name, email, phone, organisation, service area select, individual details, GDPR consent) → POST /api/referrals (collection: referrals) + GET /api/referrals. All "Make a Referral" CTAs (hero, process, area cards, footer) now link to /referrals. Nav updated to /#anchor links + "Referrals" item; Logo links to "/". 19 pytest tests pass; e2e form submission verified

- ✅ Multi-page split (2026-02-13): site converted from one-page-scroll to multi-page React Router app. New routes: `/` (slim Home with Hero + Partners + intro + preview cards + service preview + team preview + 3 latest news), `/about` (WhoWeAre + Approach + Safeguarding + Testimonials), `/services` (SupportPillars + FeaturedServices + Benefits + Process + ServiceAreas), `/team` (full Team grid + bio dialogs), `/news` (NewsSection), `/faq` (Faq), `/contact` (ContactForm + contact details), `/referrals` (existing). Added shared `PageShell` + `PageHero` (`/app/frontend/src/components/site/PageShell.jsx`) and `ScrollToTop` (`/app/frontend/src/components/site/ScrollToTop.jsx`). Header uses react-router `NavLink` with active-state highlighting; inner pages render solid header by default. Nav reduced to Home/About/Services/Team/News/Contact. All in-page anchor links (`#services`, `#contact`, `#how-we-work`) replaced with real routes. Footer links updated. All 8 routes verified loading with smoke screenshots.

- ✅ Team rebuild (2026-02-13): full team replaced with 15 named members from user-supplied photos/bios. New members: Tara (Registered Service Manager & DSL — no photo yet), Florian Shabanaj, Gentiana (Genta) Vasili (Admin & H&S Officer), Conrad Rowe, Raze Cenalia, Zoe Ellina. Updated photos+bios for Deborah Howlett, Erjona Selko, Eugen Bardho, Fatmira Pjetri, Linda Madimutsa, Riada Mjeshtri, Rita Cleary. Kept: Robert Toska, Brikelda Shabanaj (Brikelda's old photo was actually Erjona's, so now shows placeholder). Conrad/Raze/Zoe have no bio yet (no "Read Bio" button). Photo lookup migrated from positional array to `photoKey` map in `Team.jsx` with `t-placeholder.svg` fallback and "Photo coming soon" badge. New per-member assets at `/app/frontend/src/assets/t-{name}.jpg`.

## Backlog / Next Tasks
- NOTE: App is DEPLOYED to production (https://services-refresh-1.emergent.host). User must redeploy to push latest changes live
- P1: User review of copy/images; swap stock photos if user provides team photos
- P2: Referral form (structured fields: young person details, referring agency) like rightchoiceservices.org/referrals
- P3: Admin view for contact messages / newsletter subscribers (auth needed)
- P3: SEO meta tags, sitemap, OG images, per-route document titles

## Credentials
None — public marketing site, no auth.
