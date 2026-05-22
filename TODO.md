# TODO — nextbyrd-hub

Ordered by priority. Update at the start and end of every session.

---

## Shell phase

- [x] Step 1 — Scaffold repo (Next.js, Tailwind v4, static export) ✓ [Sonnet 4.6]
- [x] Step 2 — Copy DESIGN.md to repo root ✓ [Sonnet 4.6]
- [x] Step 3 — Copy Poppins fonts → `public/fonts/poppins/`, @font-face in globals.css ✓ [Sonnet 4.6]
- [x] Step 4 — Configure Tailwind tokens from DESIGN.md ✓ [Sonnet 4.6]
- [x] Step 5 — `layout.tsx` — font-sans applied, HubHeader, HubFooter, analytics placeholder ✓ [Sonnet 4.6]
- [x] Step 6 — HubHeader — wordmark, tool nav, "Built by Nextbyrd" link, mobile drawer ✓ [Sonnet 4.6]
- [x] Fix — Updated nav routes to SEO-friendly public slugs (/website-cost-calculator etc.) after vault changelog sync ✓ [Sonnet 4.6]
- [x] Step 7 — HubFooter — minimal, two rows ✓ [Sonnet 4.6]
- [x] Step 8 — Home page — Hero, ToolGrid (4 cards + scroll stagger), AdSlot placeholder, BlogPreview hidden ✓ [Sonnet 4.6]
- [ ] Step 9 — Tool page template — ToolPageHeader + "Coming soon" for all tool routes
- [ ] Step 10 — Design Library, Learn, Blog listing placeholders
- [ ] Step 11 — Metadata on every route
- [ ] Step 12 — Deploy to Vercel, Lighthouse 90+ on mobile

## Tool 1 phase (after shell is live)

- [ ] Step 13 — ScopeTool component tree — read UX Flow Brief fully before writing any component
- [ ] Step 14 — OpeningScreen, QuestionScreen, CompletedAnswer, ProgressBar, ResultPanel, scoring logic, currency toggle
- [ ] Step 15 — Analytics events wired (tool_start, tool_answer, tool_complete, cta_click, tool_edit, tool_reset)
- [ ] Step 16 — QA at 375px on every screen state including result panel
- [ ] Step 17 — Deploy, verify on real device
