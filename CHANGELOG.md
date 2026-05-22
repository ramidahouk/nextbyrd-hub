# CHANGELOG — nextbyrd-hub

Most recent first. One tag per bullet — split into two if a session involved both.
Author tags: [Claude] = planning/design decisions · [Codex] = code written in repo.

---

## 2026-05-22 — Shell build session 1

- [Codex/Sonnet] Fix — Hero felt generic (white-on-white, no trust signals, ToolPreview floating with no context): switched hero bg to #F6F5F4 for warmth and section separation; added aqua eyebrow bar answering the first three objections before the headline ("Free · No sign-up · No email"); removed ToolPreview card tilt (was ambiguous, not intentional-looking); added aqua full-width accent line at card top to signal craft; fixed ToolCard/section bg contrast (hero=surface, grid=white, cards=surface) which had cards invisible against their own section
- [Codex/Sonnet] Fix — Radar rings were oval and invisible: % dimensions on a non-square flex container produced an ellipse, and opacity 0.05 on white was below perception threshold; switched to fixed 320×320px with negative margin centering for true circles; opacity 0.18 max, 1px border — visible but not distracting; also fixed ToolPreview card width (had hardcoded 320px, reverted to fluid max-w-sm) and made the card a Link to /website-cost-calculator since a preview of the tool should be clickable
- [Codex/Sonnet] Step 8 — Home page — Hero (headline, subline, CTA, ToolPreview with ambient pulse + radiating rings, SocialProof wire), ToolGrid (4 ToolCards + scroll stagger via motion/react), AdSlot placeholder (home-leaderboard), BlogPreview deferred; new components: ToolCard (dual-span arrow animation), ToolGrid (client, stagger), ToolPreview (client, ambient motion), AdSlot, SocialProof
- [Codex/Sonnet] Fix — Wordmark updated: full "byrd hub" SVG (`public/logo/byrd-hub.svg`, currentColor, inline React component) — no separate text span; "nextbyrd.com →" muted gray replaces "Built by Nextbyrd →" aqua — per vault update
- [Codex/Sonnet] Step 7 — HubFooter — white, border-top, two rows: wordmark + tool links + "Built by Nextbyrd", copyright line; wired into layout.tsx
- [Codex/Sonnet] Fix — Added `tool_answer` as required analytics event to TODO Step 15 (per vault: needed for per-question abandonment tracking)
- [Codex/Sonnet] Fix — Synced vault changelog: updated all nav routes to SEO-friendly public slugs (scope→/website-cost-calculator, stack→/website-builder-comparison, performance→/website-speed-calculator, audit→/website-grader) in HubHeader and MobileNav
- [Codex/Sonnet] Step 6 — HubHeader — sticky white header, wordmark, desktop tool nav with aqua active underline, "Built by Nextbyrd →" link, MobileNav drawer (slide-in, overlay, auto-close on route change)
- [Codex/Sonnet] Added `lib/utils.ts` (cn, formatDate, formatViews), `components/ui/button.tsx` (CVA, hub tokens, asChild), installed @radix-ui/react-slot
- [Codex/Sonnet] Step 5 — `layout.tsx` — no next/font, font-sans via Tailwind, base metadata, HubHeader/HubFooter placeholders, GA4 placeholder comment
- [Codex/Sonnet] Configured `next.config.ts` — static export, images unoptimized
- [Codex/Sonnet] Wrote `globals.css` — @font-face rules for all 8 Poppins weights, Tailwind v4 `@theme inline` tokens (colors, shadows, radius, spacing), base reset
- [Codex/Sonnet] Copied self-hosted Poppins woff2 files (8 weights) to `public/fonts/poppins/`
- [Codex/Sonnet] Copied DESIGN.md verbatim to repo root
- [Codex/Sonnet] Installed dependencies — motion@^12, react-hook-form@^7, class-variance-authority@^0.7, clsx, tailwind-merge, lucide-react, @radix-ui/react-slot
- [Codex/Sonnet] Scaffolded repo — Next.js (latest), Tailwind v4, static export (`output: 'export'`), Vercel config
