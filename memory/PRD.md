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
- ✅ 5 named Team Leaders with full bios from user ODT files (Brikelda Shabanaj, Deborah Howlett, Erjona Selko, Eugen Bardho, Fatmira Pjetri) + "Read Bio" dialog (shadcn Dialog). PHOTO↔NAME PAIRING IS BEST-GUESS (member order maps to PHOTOS array order in Team.jsx: Brikelda=team-1, Deborah=team-2, Erjona=team-3, Eugen=team-4, Fatmira=team-5) — user asked to "just upload to start with"; awaiting confirmation/corrections. Remaining 4 photos (team-6..9) are "Team Member" placeholders
- ✅ Fixed scrolled-header bug: `bg-[var(--rc-indigo-900)]/95` opacity modifier doesn't compile in Tailwind v3 → replaced with `bg-[#2a2566]/95`
- ✅ Code review round 2: shared useSubmit hook (src/hooks/useSubmit.js) used by ContactForm + NewsletterForm, craco console.warn removed, Python type hints added to server.py routes and test_api.py (10 tests pass)

- ✅ Referral page (/referrals, 2026-06-12): page hero, "What happens next" 3 steps, Got Questions card, referral form modelled on original site (name, email, phone, organisation, service area select, individual details, GDPR consent) → POST /api/referrals (collection: referrals) + GET /api/referrals. All "Make a Referral" CTAs (hero, process, area cards, footer) now link to /referrals. Nav updated to /#anchor links + "Referrals" item; Logo links to "/". 19 pytest tests pass; e2e form submission verified

## Backlog / Next Tasks
- P0: User to verify photo↔name pairing for the 5 Team Leaders and send names/bios for the remaining 4 placeholder members
- P1: User review of copy/images; swap stock photos if user provides team photos
- P2: Dedicated pages (About, Services, Referrals form page, Contact) with routing
- P2: Referral form (structured fields: young person details, referring agency) like rightchoiceservices.org/referrals
- P3: Admin view for contact messages / newsletter subscribers (auth needed)
- P3: SEO meta tags, sitemap, OG images

## Credentials
None — public marketing site, no auth.
