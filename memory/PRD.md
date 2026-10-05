# JK PRO Builders — PRD / Working Notes

## Product
Pixel-perfect responsive React clone of the "Fixhome" Elementor template, rebranded to **JK PRO Builders** (home renovation). Multi-page site (Home, About, Services + sub-services, Projects/Recent Work, Blog, Contact). Theme: maroon `#550000` + navy `#0A1F3D`. FastAPI + MongoDB backend for contact enquiries & newsletter. Protected `/admin` dashboard (passcode via `REACT_APP_ADMIN_PASSCODE`). Live domain: www.jkprobuilders.site.

## Email integration
- Uses **Emergent managed email relay**: `https://integrations.emergentagent.com/api/v1/email/send`, header `X-Email-Key: EMERGENT_EMAIL_KEY`.
- Env (backend/.env): `EMERGENT_EMAIL_KEY`, `OWNER_EMAIL=jkprobuilders@gmail.com`, `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`.
- `send_email()` returns 202 Accepted on both preview AND production (deployer-confirmed 2026 RCA).

## 2026-10-05 — Contact-form "no email arriving" investigation
- **Reported:** live site form submits but no email reaches jkprobuilders@gmail.com.
- **Findings:** NOT a code/config/deploy bug. Preview + production both save the enquiry, call the email service, and get `202 Accepted`. Deployer confirmed prod secrets all set.
- **Root cause:** email **deliverability** — managed relay's sending domain is not authenticated for the owner's domain, so Gmail spam-folders / drops the message after the 202 handoff.
- **Change made:** `send_email()` now accepts optional `reply_to`; the owner contact-notification sets `reply_to = customer's email` (better reply UX + removes self-addressed From/To/Reply-To loop that nudges spam). Verified via curl — still 202.
- **Permanent fix (pending user action):** bring-your-own Resend account with a VERIFIED custom domain (jkprobuilders.site) + SPF/DKIM/DMARC DNS records → reliable inbox delivery. User skipped the DNS/account setup for now.
- **Immediate advice to client:** check Spam/Junk + "All Mail", mark Not Spam, add sender to contacts.

## Backlog
- P1: Re-add category filters (Kitchen/Bathroom/Roofing...) to the new `RealProjects.jsx` "Recent Work" gallery.
- P2: Photo lightbox for Recent Work gallery.
- P3: Customer auto-reply confirmation email (note: will also need verified domain for reliable delivery).
- P?: Permanent email deliverability via verified custom domain (Resend BYO key).
