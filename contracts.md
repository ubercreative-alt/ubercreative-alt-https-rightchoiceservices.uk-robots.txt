# JK PRO Builders — API Contracts

## Goal
Persist Contact/Quote enquiries and Newsletter subscribers in MongoDB and view them on an `/admin` page. (Option B — no email.)

## Backend (all under `/api`)
### Contact enquiries
- `POST /api/contact` — body: `{ name, email, phone?, service?, message }` → returns created enquiry `{ id, name, email, phone, service, message, status, created_at }`
- `GET /api/contact` — list enquiries (newest first)
- `PATCH /api/contact/{id}/read` — mark as read (`status="read"`)
- `DELETE /api/contact/{id}` — delete enquiry

### Newsletter
- `POST /api/subscribe` — body: `{ email }` → returns `{ id, email, created_at }` (idempotent on email)
- `GET /api/subscribers` — list subscribers (newest first)

## Mongo collections
- `enquiries` : ContactEnquiry (uuid id, status: new|read, created_at ISO)
- `subscribers` : Subscriber (uuid id, email unique-ish, created_at ISO)

## Frontend integration (replace mock behaviour)
- `pages/ContactPage.jsx` → POST `/api/contact` (was toast-only)
- `components/Footer.jsx` → POST `/api/subscribe` (was toast-only)
- New `pages/AdminPage.jsx` at route `/admin` → GET lists, mark read, delete. Simple client passcode gate (demo).
- API base = `process.env.REACT_APP_BACKEND_URL` + `/api`.

## Notes
- No external keys required. Email delivery intentionally deferred.
