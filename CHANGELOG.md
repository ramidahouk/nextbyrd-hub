# CHANGELOG - nextbyrd-hub

Most recent first. One tag per bullet. Split into two bullets if a session involved both.
Author tags: [Claude] = planning/design decisions, [Codex] = code written in repo.

---

## 2026-05-24 - Launch docs sync

- [Codex] Fix - Synced the May 24 docs update: added Vercel Analytics as the passive analytics layer, corrected the Tool 1 header subline, and recorded the future backend abuse-prevention boundary in TODO
- [Codex] Fix - Completed pre-deploy metadata asset pass: verified route metadata uses the shared `og.png`, added the missing OG image, regenerated it to avoid visual overlap, and cleaned the quiet `nextbyrd.com ->` footer/mobile links

## 2026-05-23 - Tool 1 docs alignment

- [Codex] QA - Completed final Tool 1 QA across desktop and 375px mobile, including adjusted result prices, FAQ + JSON-LD, reset, refresh persistence, edit flow clearing downstream answers, and mobile hiding the live estimate panel
- [Codex] Fix - Aligned the FAQ section to the tool page's 1200px container rhythm while keeping answer text constrained for readability
- [Codex] Fix - Synced the new Tool 1 FAQ page spec: real "Common questions" HTML content, FAQPage JSON-LD, no accordion, and no tool-bottom ad on the calculator page
- [Codex] Fix - Removed unused `OpeningScreen`, added the calculator FAQ shell, and made builder-comparison monthly price examples use the selected country currency
- [Codex] Fix - Muted completed answer cards so the active question and current answer options sit higher in the UX hierarchy
- [Codex] Fix - Implemented the latest Tool 1 docs sync: Q3/Q4 adjusted pricing ranges, adjusted budget options and result prices, Q3-aware agency retainer versus optional maintenance costs, branch-specific Q2 headings, and active-question-first layout with completed answers stacked below newest-first
- [Codex] Fix - Made the result panel's "What you'll pay after launch" costs use the selected country currency instead of currency-less ranges
- [Codex] Fix - Removed stale repo `DESIGN.md` so the active design reference is `docs/Hub/DESIGN.md`; updated Tool 1 live estimate to use the `AnimateNumberSmooth.md` digit-scroll pattern from `motion/react`, kept the right panel stable between answers, removed calculating text, corrected native currency symbols, and replaced paraphrased result copy with UX-brief-sourced copy

---

## 2026-05-23 - QA + UI polish session

- [Claude] Decision — hub-surface token changed from #F6F5F4 to #fcfcfc by owner (Rami): the warm off-white read as too beige/ugly against the pure white page canvas; #fcfcfc keeps the surface/bg visual separation without the warmth
- [Codex/Sonnet] Fix — applied surface color change to globals.css and DESIGN.md; fixed Reset answers bug (persist effect now writes empty answers to localStorage so reset actually clears on remount); removed motion.div layout wrapper that caused height-animation mid-flight screenshots; CompletedAnswer cards now have always-visible border + font-semibold answer label; currency toggle moved to result panel only (frees space during questions); hydration bug fixed (mounted guard prevents SSR/client mismatch); footer nav labels corrected from internal IDs (Scope/Stack/Performance/Audit) to public labels (Cost Calculator/Build Options/Speed Calculator/Website Grader); formatDetection meta added to layout to suppress Chrome auto-link injection on button text

---

## 2026-05-22 - Tool 1 build session

- [Codex/Sonnet] Steps 13–14 — Website Cost Calculator (Tool 1) fully built: ScopeTool component tree (OpeningScreen, QuestionScreen, CompletedAnswer, ResultPanel, ProgressBar), scoring logic (getTier — Connected overrides all, Standard for booking/self-update/high-design, Starter only for sub-€1k budget), dynamic result copy per tier based on actual answers (not generic templates), localStorage persistence so refresh doesn't wipe answers, 800ms silent calculating pause before result reveal, Tyrian purple top border on result panel (the only purple in the entire hub — Von Restorff peak moment), currency toggle USD/EUR with reactive price display, full analytics event set (tool_start, tool_answer, tool_complete, cta_click, tool_edit, tool_reset), step transition AnimatePresence x:40 forward/back direction, inline answer editing (tap any completed answer to re-open), Reset answers text link to clear localStorage; wired into /website-cost-calculator page replacing the placeholder; lib/analytics.ts GA4 track() wrapper (no-ops if gtag not loaded — safe for static export)

---

## 2026-05-22 - Shell build session 2

- [Codex/Sonnet] Steps 9 + 10 — Tool page template + all route placeholders: renamed internal-ID app folders (scope→website-cost-calculator, stack→website-builder-comparison, etc.) to match public slugs in AGENTS.md (previous names were wrong and would have produced 404s at launch); created ToolPageHeader component (icon + H1 + description, per DESIGN.md section 8 wireframe); created page.tsx for all 5 tool routes with correct metadata from AGENTS.md; created ComingSoon shared component for placeholder tools 2–5; created blog, design-library, learn listing pages with correct metadata; fixed layout.tsx root metadata description which still had old invented copy instead of the AGENTS.md keyword-informed version

---

## 2026-05-22 - Shell build session 1

- [Codex/Sonnet] Fix — Third vault sync: nav icons added to HubHeader desktop nav (lucide icons left of each label per DESIGN.md section 7); QuestionCard option buttons fixed to spec (min-h-13, py-4 px-5, bg-hub-surface per DESIGN.md section 9); ToolCard icon corrected to size-6; not-found.tsx created (AGENTS.md hard requirement — prevents Vercel generic 404); repo DESIGN.md section 7 synced with updated vault nav spec (new labels, icon rule, future dropdown note)
- [Codex/Sonnet] Fix — Second vault sync after docs update: hero subline corrected to verbatim vault string ("Starting from scratch or fixing what's not working?..."); ToolGrid tool names and descriptions updated to match Shell Brief (Cost Calculator, Build Options, Speed Calculator, Website Grader with new descriptions); page metadata description updated; hero bg confirmed white per DESIGN.md rule ("never use surface as page background")
- [Codex/Sonnet] Fix — First vault sync: nav labels updated to AGENTS.md spec, nav labels updated (Scope→Cost Calculator, Stack→Build Options, Performance→Speed Calculator, Audit→Website Grader) in HubHeader and MobileNav; H1, subline, and CTA overwritten with vault-sourced strings from AGENTS.md metadata section; page title and description corrected to keyword-informed versions; hero subline previously used invented copy not traceable to any vault source
- [Codex] Fix - Removed the two offset white ghost panels behind the hero calculator preview and cleaned the preview CTA arrow encoding
- [Codex] Fix - Reworked hero preview from decorative rings into a reusable `QuestionCard`-based calculator surface, removed unsourced eyebrow copy, restored documented hero copy, tightened mobile CTA wrapping, and returned the tool section to warm-surface rhythm with white cards
- [Codex] Fix - Resolved MobileNav lint failure by closing the drawer from link clicks instead of synchronizing state from `useEffect`
- [Codex] Fix - Synced repo `DESIGN.md` with latest `docs/Hub/DESIGN.md` and removed temporary review screenshot artifacts
- [Codex/Sonnet] Fix - Hero felt generic, so Claude switched hero bg to `#F6F5F4`, added an aqua eyebrow, removed ToolPreview tilt, added an aqua card top line, and adjusted ToolCard/section contrast
- [Codex/Sonnet] Fix - Claude changed radar rings to fixed 320x320 circles, raised opacity, restored fluid preview width, and made ToolPreview link to `/website-cost-calculator`
- [Codex/Sonnet] Step 8 - Home page: Hero, ToolPreview, ToolGrid, AdSlot placeholder, and hidden BlogPreview; new components: ToolCard, ToolGrid, ToolPreview, AdSlot, SocialProof
- [Codex/Sonnet] Fix - Wordmark updated to full `byrd hub` SVG, with `nextbyrd.com ->` as the quiet header link
- [Codex/Sonnet] Step 7 - HubFooter: white, border-top, wordmark, tool links, Built by Nextbyrd link, copyright line, wired into `layout.tsx`
- [Codex/Sonnet] Fix - Added `tool_answer` as a required analytics event to TODO Step 15
- [Codex/Sonnet] Fix - Updated nav routes to SEO-friendly public slugs in HubHeader and MobileNav
- [Codex/Sonnet] Step 6 - HubHeader: sticky white header, wordmark, desktop tool nav, active underline, Nextbyrd link, MobileNav drawer
- [Codex/Sonnet] Added `lib/utils.ts`, `components/ui/button.tsx`, and installed `@radix-ui/react-slot`
- [Codex/Sonnet] Step 5 - `layout.tsx`: no `next/font`, font-sans via Tailwind, base metadata, HubHeader/HubFooter, GA4 placeholder comment
- [Codex/Sonnet] Configured `next.config.ts`: static export, images unoptimized
- [Codex/Sonnet] Wrote `globals.css`: Poppins `@font-face`, Tailwind v4 `@theme inline` tokens, base reset
- [Codex/Sonnet] Copied self-hosted Poppins woff2 files to `public/fonts/poppins/`
- [Codex/Sonnet] Copied `DESIGN.md` to repo root
- [Codex/Sonnet] Installed dependencies: `motion`, `react-hook-form`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `@radix-ui/react-slot`
- [Codex/Sonnet] Scaffolded repo: Next.js, Tailwind v4, static export, Vercel config
