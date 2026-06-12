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
  - Single-page home at `/` composed in `/app/frontend/src/pages/Home.jsx`
  - Section components in `/app/frontend/src/components/site/` (TopBar, Header, Hero, PartnersStrip, WhoWeAre, SupportPillars, Approach, FeaturedServices, Benefits, Process, Safeguarding, CtaContact, Testimonials, ServiceAreas, Faq, NewsSection, Footer)
  - All content centralized in `/app/frontend/src/data/content.js`
  - Theme: CSS variables in index.css (--rc-indigo-950..500, --rc-lavender, --rc-paper); fonts Quicksand (headings) + Mulish (body)
- Backend: FastAPI + MongoDB (motor) in `/app/backend/server.py`
  - POST/GET `/api/contact` — contact form messages (collection: contact_messages)
  - POST `/api/newsletter` — newsletter subscribe, idempotent on duplicate email (collection: newsletter_subscribers)
- Tests: `/app/backend/tests/test_api.py` (pytest regression suite, 8 cases)

## What's Implemented (2026-06-12)
- ✅ Full one-page site cloning the Licos layout: topbar, sticky header (solid on scroll), hero with glass service card, partner marquee + stat block, who we are, 4 support pillar image cards, approach, featured services (dark), benefits grid (dark), 4-step process, safeguarding with progress bars, CTA + working contact form, testimonials, service areas (pricing-style cards), FAQ accordion, news cards, footer with working newsletter
- ✅ Backend contact + newsletter endpoints with email validation
- ✅ Tested by testing agent: 100% backend, 100% frontend (iteration_1.json)
- ✅ Hero fallback background fix for header contrast

## Backlog / Next Tasks
- P1: Real logo + brand assets once user provides PDFs (Image1–Image12)
- P1: User review of copy/images; swap stock photos if user provides team photos
- P2: Dedicated pages (About, Services, Referrals form page, Contact) with routing
- P2: Referral form (structured fields: young person details, referring agency) like rightchoiceservices.org/referrals
- P3: Admin view for contact messages / newsletter subscribers (auth needed)
- P3: SEO meta tags, sitemap, OG images

## Credentials
None — public marketing site, no auth.
