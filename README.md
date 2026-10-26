# CleanOps

A progressive web app that replaces manual spreadsheet workflows for a cleaning services company with digital time tracking, photo-based service verification, and automated payroll/accounting integration.

## Problem

The company currently manages client data and accounting through a spreadsheet, and has no way to verify when cleaning staff arrive at or leave a building, or confirm that the work was actually completed. Staff are distributed across many locations per day, often in basements and building lobbies with poor cell coverage.

## What it does

- **QR + geolocation check-in**: staff scan a QR code at each building to clock in/out. Geolocation is captured as a secondary verification signal, never as a blocker — the app must keep working with no GPS signal or intermittent connectivity.
- **Offline-first**: check-ins and photos queue locally and sync automatically once connectivity returns.
- **Photo evidence**: before/after photos per visit, reviewed and approved by a supervisor.
- **Role-based access**: separate views for cleaning staff, supervisors, and management, backed by database-level row security.
- **Payroll and accounting via API**: worked hours are exported to an external payroll/accounting provider rather than calculated in-house, avoiding the legal complexity of building payroll logic from scratch.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React + TypeScript, built with Vite |
| PWA | `vite-plugin-pwa` (installable, offline-capable) |
| Styling | Tailwind CSS |
| Backend / BaaS | Supabase (Auth, PostgreSQL, Storage, Edge Functions) |
| Database | PostgreSQL with Row Level Security on every sensitive table |
| Photo storage | Supabase Storage initially, migrating to Cloudflare R2 at scale |
| QR scanning | `html5-qrcode` / native `BarcodeDetector` API |
| Geolocation | Browser Geolocation API |
| Push notifications | Firebase Cloud Messaging |
| Hosting | Vercel (frontend), Supabase (backend) |
| Accounting/payroll | External SaaS provider via REST API |
| Testing | Vitest (unit), Playwright (end-to-end) |
| CI/CD | GitHub Actions + Vercel automatic deployments |

## Project structure

```
frontend/
├── public/
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── checkin/        # QR scanning, geolocation validation, check-in UI
│   │   ├── admin/          # supervisor review screens
│   │   └── shared/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useOfflineQueue.ts
│   │   └── useCheckIn.ts
│   ├── lib/
│   │   ├── supabaseClient.ts
│   │   └── geo.ts
│   ├── pages/
│   ├── routes/
│   └── types/
└── vite.config.ts

supabase/
├── migrations/            # SQL schema and RLS policies
├── functions/             # Edge Functions (QR generation, payroll export)
└── config.toml
```

## Getting started

```bash
# clone and install
git clone https://github.com/<org>/<repo>.git
cd <repo>/frontend
npm install

# copy environment variables
cp .env.example .env.local
# fill in SUPABASE_URL and SUPABASE_ANON_KEY

# run the dev server
npm run dev
```

Database schema and RLS policies live in `supabase/migrations`. Apply them via the Supabase CLI or paste them into the SQL editor in the Supabase dashboard.

## Roadmap

- [ ] **Phase 1** — Check-in and evidence MVP: QR + geolocation check-in, offline queue, photo upload, admin review panel
- [ ] **Phase 2** — Dynamic checklists per building type, automated alerts for missed check-ins, supervisor dashboard
- [ ] **Phase 3** — Accounting/payroll integration via external API, historical data migration
- [ ] **Phase 4** — Client-facing portal, service KPIs and analytics

## Design principles

- QR code is the primary check-in method; geolocation is advisory data only. GPS is unreliable in basements and enclosed lobbies, so the app must never block a check-in on missing or out-of-range location data — it flags it for supervisor review instead.
- No custom payroll or tax engine. Worked hours are exported to a licensed accounting/payroll provider to avoid the legal risk of an in-house implementation of labor law calculations.
- Offline support is a first-class requirement, not an add-on — photo uploads are compressed and queued locally before being sent.

## License

Proprietary — internal project. Not licensed for external use.
