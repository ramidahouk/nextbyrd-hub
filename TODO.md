# TODO - nextbyrd-hub

Ordered by priority. Update at the start and end of every session.

---

## Shell phase

- [x] Step 1 - Scaffold repo (Next.js, Tailwind v4, static export) [Sonnet 4.6]
- [x] Step 2 - Copy DESIGN.md to repo root [Sonnet 4.6]
- [x] Step 3 - Copy Poppins fonts to `public/fonts/poppins/`, @font-face in globals.css [Sonnet 4.6]
- [x] Step 4 - Configure Tailwind tokens from DESIGN.md [Sonnet 4.6]
- [x] Step 5 - `layout.tsx` with font-sans, HubHeader, HubFooter, analytics placeholder [Sonnet 4.6]
- [x] Step 6 - HubHeader with wordmark, tool nav, Nextbyrd link, mobile drawer [Sonnet 4.6]
- [x] Fix - Updated nav routes to SEO-friendly public slugs [Sonnet 4.6]
- [x] Step 7 - HubFooter [Sonnet 4.6]
- [x] Step 8 - Home page with Hero, ToolGrid, AdSlot placeholder, hidden BlogPreview [Sonnet 4.6]
- [x] Step 9 - Tool page template and route placeholders [Sonnet 4.6]
- [x] Step 10 - Design Library, Learn, Blog listing placeholders [Sonnet 4.6]
- [ ] Step 11 - Verify metadata on every route
- [ ] Step 12 - Deploy to Vercel, Lighthouse 90+ on mobile

## Tool 1 phase

- [x] Implement latest docs sync: adjusted Q3/Q4 ranges, Q3-aware retainer vs maintenance costs, and active-question-first layout
- [x] Replace old tier calculator with country-first decision tree: `CountryScreen`, dynamic `questions.ts`, `getResultPath()`, `MARKET_PRICING`, and no `OpeningScreen`
- [x] Build desktop two-column layout: 640px questionnaire, 80px gap, 440px `LiveEstimatePanel`, hidden right column on mobile
- [x] Replace Starter/Standard/Connected result copy with 10 result-path templates
- [x] Expand `ResultPanel` with build cost, ongoing costs, builder vs agency, lock-in warning, what's not included, soft CTA, and reset
- [x] Update analytics to use `country` and `result_path` everywhere
- [x] Update storage to persist `hub_scope_country` and `hub_scope_answers`
- [x] Remove stale repo `DESIGN.md`; use `docs/Hub/DESIGN.md` as the design source of truth
- [x] Implement live estimate digit-scroll from `AnimateNumberSmooth.md` and keep the right panel stable instead of fading per answer
- [x] QA all states at 375px and desktop, including edit/reset and result panel
- [x] Run lint and production build
- [x] Tool 1 complete - Website Cost Calculator ready for launch review
