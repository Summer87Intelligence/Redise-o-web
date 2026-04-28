# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product context

Summer87 is a **Business Intelligence + Financial Copilot** for founders and executive teams. It is a decision layer — not a CRM, ERP, or generic dashboard. Its core value is translating financial and operational data into prioritized, actionable recommendations in business language.

The website is the primary conversion surface. Its only goal is to get visitors to book a meeting. Value must be communicated in under 5 seconds. Every section, headline, and interaction should serve that goal or be removed.

## Tone and messaging rules

- Consultative, not salesy. Summer87 advises; it does not promise miracles.
- No "magic AI" language ("our AI does everything", "revolutionary", "game-changer").
- No aggressive claims or unverifiable statistics used as persuasion.
- Copy should sound like a senior advisor who knows the numbers, not a marketing deck.
- Speak to the founder's real pain: lack of clarity, late information, no time for analysis.

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build (always validate before shipping)
npm run lint     # ESLint via next lint
```

No test suite is configured. `npm run build` is the quality gate.

## Environment variables

Create `.env.local` from `.env.example`:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Required — without it `POST /api/lead` returns 503 |
| `RESEND_FROM` | Sender address (must be a Resend-verified domain) |

## Architecture

**Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.

### Routing and i18n

All canonical pages live under `app/[locale]/`. Bare routes (`app/page.tsx`, `app/pricing/page.tsx`, etc.) are redirect stubs only — never put real content there.

The middleware (`middleware.ts`) resolves locale on every non-asset request:
1. Cookie (`locale` key) → `Accept-Language` header → default `es`.
2. Redirects bare paths to their locale-prefixed equivalent (`/pricing` → `/es/pricing`).
3. Persists the resolved locale to a 1-year cookie.

Supported locales: `es | en | de` (default: `es`). Defined in `lib/i18n/shared.ts`.

**i18n is required on every change.** Any new copy, label, or UI string must exist in all three locale dictionaries before the change ships.

### Translation system

All copy lives in a single dictionary in `lib/i18n/config.ts`, keyed by locale. There is no external i18n library.

- `LanguageProvider` (mounted in `app/[locale]/layout.tsx`) provides the active locale.
- Components call `useTranslation()` from `@/lib/i18n/config` to get `{ t, locale, setLocale }`.
- `t` is fully typed. Adding copy means updating `es`, `en`, and `de` objects in the same file.

### Component structure

Components are organized by domain, not by type:

- `components/home/` — landing page sections, composed in `app/[locale]/page.tsx`.
- `components/servicios/` — services page content.
- `components/seo/` — `IntentPageTemplate`, the renderer for SEO intent pages.
- `components/layout/` — `Navbar` and `Footer` (injected by `app/[locale]/layout.tsx`; do not add them manually in pages).
- `components/shared/` — `LeadModal` (lead capture) and `Reveal` (scroll animation wrapper).

Each section component is self-contained: it reads its own translations via `useTranslation()` and owns its markup and styles.

### Lead capture

`LeadModal` (`components/shared/LeadModal.tsx`) POSTs to `/api/lead` (`app/api/lead/route.ts`), which sends an email to `hola@summer87.ai` via Resend. It also generates a WhatsApp deep-link fallback. Components open the modal by passing an `open` boolean prop.

### SEO intent pages

Keyword-targeted pages are structured as:
- `lib/seo/intent-pages.ts` — all content per slug and locale (`INTENT_SLUGS`, `intentPageContent()`).
- `components/seo/IntentPageTemplate.tsx` — single shared renderer.
- `app/[locale]/[slug]/page.tsx` — thin page that calls `intentPageContent()` and renders the template.

To add a new intent page: add the slug to `INTENT_SLUGS`, define content for all three locales, create the page file.

### Analytics

`lib/analytics.ts` exports `trackEvent(name, payload?)`. Logs to `console.debug` in development; pushes to `window.dataLayer` in production (GTM-ready). No GA4 SDK is wired yet.

## UI and design rules

The visual language is **dark and premium** — it signals trust and precision to a financially literate audience.

**Tailwind semantic tokens** (defined in `tailwind.config.ts`):
- Backgrounds: `background` (#0D1117), `surface`, `surface-2`
- Text: `text-primary`, `text-secondary`, `text-muted`
- Accent: `accent` (#2F81F7)
- Status: `success`, `warning`, `danger`

**Motion**: use the `Reveal` component (`components/shared/Reveal.tsx`) for scroll-triggered entrance animations. Only add motion when it helps the user understand hierarchy or progression. Never use animation as decoration.

**Avoid**: gradients or glows that exist purely for aesthetics, component libraries not already in the project, visual complexity that slows perceived load time.

## Development rules

- **Do not break existing features.** Validate with `npm run build` before considering any change done.
- **Incremental changes.** One concern per commit. Do not refactor unrelated code while implementing a feature.
- **Performance first.** Prefer static rendering. Avoid adding client components unless interactivity requires it. Do not add dependencies without a concrete reason.
- **No generic solutions.** Every component, copy block, and interaction should reflect Summer87's specific product and audience — not a template pattern.
- **Consistency across sections.** New sections must match the tone, spacing, token usage, and motion conventions of existing ones.
