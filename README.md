# Explo-Gen Technologies — Co-Founder Welcome Experience

A personalized, cinematic digital invitation for candidates selected to potentially join Explo-Gen Technologies as co-founders. Built with Next.js (App Router), TypeScript, Tailwind CSS, and GSAP.

## Stack

- **Next.js + React + TypeScript + Tailwind CSS** — core app
- **GSAP + @gsap/react** — the envelope-opening cinematic sequence and micro-interactions
- **canvas-confetti** — brand-colored confetti on open
- **Supabase (Postgres)** — invitation/response tracking, accessed server-only
- **Resend** — email notification to the team on acceptance
- **Zod** — validates the response API payload

No Three.js — the envelope's dimensionality comes from CSS 3D transforms (`perspective`, `preserve-3d`) driven by GSAP.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/welcome/demo-john](http://localhost:3000/welcome/demo-john) — this works immediately with **no environment variables set**, backed by the in-memory demo data in `lib/data/demo.ts`.

## Project structure

```
app/
  welcome/[token]/page.tsx                     Server Component: looks up the invitation, marks it opened
  api/invitations/[token]/respond/route.ts      POST: records accept/decline, idempotent, notifies the team
components/
  intro/        the opening cinematic screen
  envelope/     the 3D envelope, its flap, and the letter peeking out
  letter/       the personalized acceptance letter
  meeting/      the meeting date/time, accept/decline, confirmation
  shared/       logo, footer, not-found state
lib/
  invitations.ts        single source of truth for invitation lookups/writes (Supabase or demo fallback)
  supabase/server.ts    server-only Supabase client (service role key)
  notifications/        NotificationService — sendEmail() (Resend) implemented, sendWhatsApp() stubbed
  gsap/                 the envelope open-sequence timeline
  confetti.ts, useReducedMotion.ts
supabase/
  schema.sql   run once in the Supabase SQL editor
  seed.sql     optional — backs demo-john with a real DB row instead of the in-memory fallback
```

## Wiring up real invitations (Supabase)

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and `SUPABASE_SECRET_KEY` (from Project Settings → API Keys — these are the current Supabase dashboard names; older projects may instead show `service_role`, which `lib/supabase/server.ts` also accepts via `SUPABASE_SERVICE_ROLE_KEY`).
4. Insert an applicant + invitation row (see `supabase/seed.sql` or `supabase/invite-team.sql` for the shape), or build a small internal tool for it later — the schema is intentionally simple.
5. Share `https://yourdomain.com/welcome/<token>` with the candidate.
6. **Restart `npm run dev`** after any `.env.local` change — Next.js only reads env vars at server startup, not on hot reload.

The secret key is used **only** in server-side code (`lib/supabase/server.ts`, imported with `server-only`) — nothing Supabase-related ever ships to the browser.

## Wiring up email notifications (Resend)

The team gets notified by email on **both** Accept and Decline — the subject line and "Response" field differ, everything else is the same email.

1. Create a Resend account.
2. Set `RESEND_API_KEY` and `NOTIFICATION_EMAIL` (where the team receives responses) in `.env.local`.
3. **Verify a domain** you own under Domains in the Resend dashboard, and set `RESEND_FROM_EMAIL` to an address on that domain (e.g. `Explo-Gen Technologies <notify@yourdomain.com>`).

Without a verified domain, Resend's default `onboarding@resend.dev` sender can **only** deliver to the email address you signed up to Resend with — it will silently fail to reach any other `NOTIFICATION_EMAIL`. This is a Resend platform restriction, not something this app controls.

If email sending fails, the applicant's response is still saved — the error is only logged server-side (see `app/api/invitations/[token]/respond/route.ts`).

## Adding WhatsApp later

`lib/notifications/index.ts` exports a single `NotificationService` with `sendEmail()` (implemented) and `sendWhatsApp()` (throws "not implemented"). Wire up Meta's WhatsApp Business API or Twilio inside `sendWhatsApp()` and call it wherever `sendEmail()` is currently called — no other code needs to change.

## Branding

The logo and colors in `components/shared/Logo.tsx` and the `--color-brand-*` variables in `app/globals.css` are placeholders. Once the official logo is supplied: drop it in `public/`, swap `Logo.tsx` to render it via `next/image`, and update the brand color variables to match — no restructuring required.

## Accessibility & motion

The full experience respects `prefers-reduced-motion`: the envelope timeline and confetti are skipped in favor of instant, simplified state changes with identical content. All interactive elements are keyboard-operable with visible focus states.
