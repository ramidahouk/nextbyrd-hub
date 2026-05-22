---
project: hub.nextbyrd.com
type: design-system
status: active
created: 2026-05-22
---

# hub.nextbyrd.com — DESIGN.md

Single source of truth for all design decisions: the why behind each choice and the exact values to implement. Read this before writing any component. If a decision is not here, ask before inventing.

Copy this file verbatim to the `nextbyrd-hub` repo root before the first coding session.

---

## Visual Identity

Lighter sub-brand of Nextbyrd. Shares the wordmark and one anchor color (aqua), but has its own light palette. "Built by Nextbyrd" is visible but not the headline — the hub earns trust on its own terms first, then converts to Nextbyrd.

Not a dark agency portfolio. Not a generic SaaS dashboard. Clean, trustworthy, warm — built for non-technical business owners landing from Google.

---

## 1. Colors

**Why these choices:**
- Background pure white — no off-white canvas. Cleaner contrast, easier to read.
- Surface `#F6F5F4` — warm white derived from Notion. Separates cards and panels from the page without a harsh border. Feels calm, not clinical.
- Navy `#0A1931` — reused from nextbyrd.com. Warmer than pure black, carries brand continuity.
- Aqua `#058ead` — the single thread connecting hub to nextbyrd.com. Used sparingly so it means something when it appears.
- Whisper border `rgba(0,0,0,0.1)` — derived from Notion. Transparent so it adapts to any surface color. Never a solid gray.
- Tyrian purple `#66023C` — the result panel signature. One moment, one place. Makes the arrival of the answer feel distinct and earned.

```yaml
colors:
  bg:        "#ffffff"              # page canvas — pure white
  surface:   "#F6F5F4"             # cards, question panels, result panel (Notion-derived)
  navy:      "#0A1931"             # primary text, headings — never pure black
  gray:      "#615d59"             # body copy, descriptions, secondary text
  muted:     "#a39e98"             # captions, placeholders, disabled states
  aqua:      "#058ead"             # accent, CTA, active states, progress bar, icons
  aqua-dark: "#046f8a"             # aqua hover only
  border:    "rgba(0,0,0,0.1)"    # whisper border — cards, dividers, inputs (Notion-derived)
  purple:    "#66023C"             # Tyrian purple — result panel top border ONLY
```

**Rules:**
- `bg` is the page canvas. Never use `surface` as the page background.
- `navy` is the only text color for headings and primary copy. Never pure black `#000000`.
- `aqua` is the only accent. CTA buttons, active nav, progress bar, option selected state, lucide icons on tool cards.
- `border` is the only border style. Never solid gray or dark borders.
- No dark backgrounds, no dark nav, no dark sections. Light mode only.
- Never add a color not in this list without explicit approval.

**The Tyrian Purple Rule:**
`#66023C` appears in exactly one place — the 3px top border of the result panel on tool completion:
```css
border-top: 3px solid #66023C;
```
Not in navigation, cards, buttons, body copy, progress bars, badges, or any other element. This is the Nextbyrd signature on the hub. One moment, one place.

---

## 2. Typography

**Why Poppins only:**
Same font as nextbyrd.com — brand continuity without a shared package. One font throughout keeps the hub feeling coherent and avoids loading two typefaces for a tool site. No display font needed — Poppins 700 at large sizes has enough personality.

```yaml
typography:
  font: "Poppins"
  source: Google Fonts — load via next/font/google
  weights: [400, 500, 600, 700]
```

**Font loading — self-hosted woff2:**
Fonts are stored locally. Do not use `next/font/google` — use `@font-face` in `globals.css` and serve from `public/fonts/`.

Source files: `E:\Obsidian\Work Vault\Projects\Nextbyrd\Hub\fonts\poppins-v24-latin\`
Copy to repo: `public/fonts/poppins/`

Files to copy (10 total):
```
poppins-v24-latin-regular.woff2      → 400
poppins-v24-latin-italic.woff2       → 400 italic
poppins-v24-latin-500.woff2          → 500
poppins-v24-latin-500italic.woff2    → 500 italic
poppins-v24-latin-600.woff2          → 600
poppins-v24-latin-600italic.woff2    → 600 italic
poppins-v24-latin-700.woff2          → 700
poppins-v24-latin-700italic.woff2    → 700 italic
```
(800 and 800italic are also in the vault folder — ignore them, not used in the spec.)

`globals.css`:
```css
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins/poppins-v24-latin-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins/poppins-v24-latin-italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins/poppins-v24-latin-500.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins/poppins-v24-latin-500italic.woff2') format('woff2');
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins/poppins-v24-latin-600.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins/poppins-v24-latin-600italic.woff2') format('woff2');
  font-weight: 600;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins/poppins-v24-latin-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins/poppins-v24-latin-700italic.woff2') format('woff2');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}
```

Tailwind config — set font family directly, no CSS variable needed:
```ts
theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
}
```

In `layout.tsx`: no `next/font` import. Just apply `font-sans` via Tailwind on `<html>` or `<body>`.

**Type scale:**
```yaml
scale:
  display:  "clamp(2.25rem, 5vw, 3.75rem)"   # hero headline — Poppins 700
  heading:  "clamp(1.5rem, 3vw, 2rem)"        # tool page H1, section titles — Poppins 600
  subhead:  "1.125rem"                         # question text in tool — Poppins 600
  body:     "1rem"                             # body copy — Poppins 400, line-height 1.7
  label:    "0.875rem"                         # option buttons, labels, captions — Poppins 500
  caption:  "0.75rem"                          # muted captions, disclaimers — Poppins 400
```

**Rules:**
- 700 for hero headline only.
- 600 for section headings, question text, CTA buttons, result headline.
- 500 for labels, option buttons, nav links, badges.
- 400 for body copy and captions.
- Never below 400.
- Line height on display/heading: 1.1–1.2. Body: 1.7.
- Minimum body: 16px. Minimum label: 14px.

---

## 3. Layout and Spacing

```yaml
spacing:
  section-gap:       "clamp(64px, 8vw, 120px)"
  section-padding:   "clamp(48px, 6vw, 80px)"
  container-max:     "1200px"
  container-padding: "clamp(1.25rem, 5vw, 2.5rem)"
  tool-container:    "680px"                        # max width of tool UI — centered
  text-max:          "640px"                        # max width for body copy blocks
```

Tool container max 680px — focused inputs perform better when the eye doesn't travel the full viewport.

---

## 4. Border Radius

**Why conservative:**
Trustworthy, not flashy. Large radii (16px+) read as consumer mobile apps. 4px and 8px read as professional tools.

```yaml
radius:
  button:  "4px"      # CTA buttons, option buttons, inputs
  card:    "8px"      # tool cards, question panels, result panel, containers
  badge:   "9999px"   # pill — tier badge, currency toggle, tags
```

Never 0px (sharp corners) on visible elements. Never 16px+. Never mix grammars on the same component.

---

## 5. Shadows

**Why blue-tinted:**
Borrowed from Stripe. Blue-tinted shadows feel on-brand and intentional rather than generic gray. The warm surface tones make them read as cool-warm contrast rather than cold.

Ring shadow is Claude-derived — a warm-toned outline with no drop shadow, used on hover to signal interactivity without visual noise.

Whisper shadow is also Claude-derived — barely visible lift on the result panel at rest. When the result arrives, it elevates to the Elevated level.

```yaml
shadows:
  ring:     "0px 0px 0px 1px rgba(0,0,0,0.08)"
  subtle:   "rgba(23,23,23,0.06) 0px 3px 6px"
  standard: "rgba(50,50,93,0.25) 0px 15px 25px -15px, rgba(0,0,0,0.1) 0px 8px 16px -8px"
  whisper:  "rgba(0,0,0,0.05) 0px 4px 24px"
  elevated: "rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px"
```

| Shadow | Use |
|--------|-----|
| Ring | Card hover — warm outline, no drop shadow |
| Subtle | Resting card lift |
| Standard | Question cards, tool containers |
| Whisper | Result panel resting |
| Elevated | Result panel on completion |

No heavy drop shadows. No pure black or gray shadows. No shadows on text, icons, or buttons.

---

## 6. Motion

**Why one library:**
`motion/react` only. No GSAP, no Lenis. The hub is a tool site — motion should feel responsive and purposeful, not cinematic. One library means one mental model across sessions.

**Why this easing:**
`cubic-bezier(0.76, 0, 0.24, 1)` — fast deceleration, snap-in feel. Used on premium sites (Linear, Vercel, Stripe) because it feels like the interface is responding to you, not performing for you.

```yaml
motion:
  easing:         "cubic-bezier(0.76, 0, 0.24, 1)"
  duration-fast:  "0.25s"    # hover states, button interactions
  duration-base:  "0.35s"    # step transitions in tools
  duration-base2: "0.4s"    # scroll-triggered entrances
  duration-slow:  "0.5s"    # result panel reveal
  duration-calc:  "0.8s"    # calculating pause before result (never longer)
```

Import: `import { motion, AnimatePresence } from 'motion/react'` — never `framer-motion`.

Animate only `opacity` and `transform` (`x`, `y`, `scale`). Never `width`, `height`, `margin`, `padding`. Use `layout` prop for height transitions.

`viewport={{ once: true }}` on all scroll animations. Never replay on scroll back.

**Hero ambient motion — ToolPreview pulse:**
The hero uses ambient kinetic motion to signal "this tool is alive." Ahrefs and getdesign.md both use this pattern. HubSpot does not — it stays editorial. The hub audience (business owners landing from search) responds better to the Ahrefs register.

Two layers, both in motion/react:

1. Progress bar inside the ToolPreview pulses at the 20% resting position — a slow opacity breathe (0.6 → 1 → 0.6, 2s loop, ease in-out). Signals the tool is waiting, not frozen.
2. Very faint radiating rings behind the ToolPreview — aqua at 5% opacity, scale 1 → 1.6, opacity 0.05 → 0, 3s loop staggered across 2 rings. Almost subliminal. The user feels it before they notice it.

```tsx
// Radiating ring — repeat for a second instance with animationDelay
<motion.div
  className="absolute rounded-full border border-hub-aqua"
  style={{ opacity: 0.05 }}
  animate={{ scale: [1, 1.6], opacity: [0.05, 0] }}
  transition={{ duration: 3, ease: 'easeOut', repeat: Infinity, delay: 1.5 }}
/>

// Progress bar breathe inside ToolPreview
<motion.div
  animate={{ opacity: [0.6, 1, 0.6] }}
  transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
/>
```

Never ship the radiating rings without seeing them in Vercel production — localhost motion rendering is not reliable for this effect. If they read as a template at any opacity, remove them. The progress bar breathe is safe at all times.

**Shell motion — home page scroll stagger:**
```tsx
// ToolGrid parent
<motion.div
  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
  initial="hidden" whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>

// ToolCard child
<motion.div
  variants={{
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }
  }}
>
```

**Tool 1 step transition:**
```tsx
<motion.div layout transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}>
  <AnimatePresence mode="wait" custom={direction}>
    <motion.div
      key={currentStep}
      custom={direction}
      variants={{
        enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
      }}
      initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
    />
  </AnimatePresence>
</motion.div>
```

**Tool 1 result panel reveal:**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
/>
```

---

## 7. Navigation

```
[hub wordmark — left]    [Scope | Stack | Performance | Audit — center]    [Built by Nextbyrd → — right]
```

- Sticky, white background, `rgba(0,0,0,0.1)` bottom border
- Wordmark: "hub" in Poppins 600, navy — text only, no bird mark, no icon
- Tool nav: Poppins 14px, navy, aqua active underline
- "Built by Nextbyrd →": aqua, Poppins 14px, links to nextbyrd.com in new tab
- Mobile: hamburger drawer, flat nav (no nested menus)

---

## 8. Page Wireframes

### Home (`/`)

```
[Header]

Hero — two columns desktop, single column mobile
  Left:
    Headline — "Free tools for business owners with a website problem"
    Subline — "Answer a few questions. Get a clear answer. No sign-up."
    CTA button — "Find out what your website should cost →" → /scope
    SocialProof — renders null on launch, shows count when real data exists
  Right (desktop only):
    ToolPreview — static simplified render of /scope Q1 card + progress bar at 20%
    Gives the user a preview of what they are clicking into before they click
    Visual treatment: gradient fade on the bottom third (white, opacity 0 → 1) signals it is a preview, not the real tool. "Try it →" label overlaid bottom-center in aqua Poppins 500 sm.

ToolGrid — 2 columns desktop, 1 column mobile
  [ToolCard] icon + name + description + → link
  [ToolCard] [ToolCard] [ToolCard]

AdSlot — home-leaderboard, below tool grid

BlogPreview — 3 article cards, "From the blog" (hidden at launch until at least one real article exists — never render with placeholder titles)

[Footer]
```

**Hero rationale (from Ahrefs + HubSpot screenshots):**
- CTA in the hero: even a free tool benefits from a primary action. "Let the tools speak" with no CTA is a missed conversion — the user has to scroll to act.
- Tool preview: removes uncertainty before the click. Seeing the first question card signals "this is real, it's already started."
- SocialProof placeholder: wire the component now so real numbers can drop in without a rebuild. Never show a zero.

### Tool page (repeatable)

```
[Header]
ToolPageHeader — H1, one-line description, → companion article link
Tool UI — question/input area, progress bar, result panel
AdSlot — tool-bottom (below result panel only, never above the tool)
FAQ — empty shell, JSON-LD only when real content exists
ArticleTeaser — → Read: [article title]
[Footer]
```

---

## 9. Components

**ToolCard:**
Surface `#F6F5F4`, 8px radius, subtle shadow resting, ring on hover. lucide-react icon `size-6` aqua. Dual-span animated arrow on hover (see AGENTS.md). No image, no price, no rating.

**Tool option buttons:**
Full width. Min height 52px. `py-4 px-5`. 8px radius. Resting: surface bg, navy text, whisper border. Selected: aqua border, aqua bg tint `rgba(5,142,173,0.08)`, 300ms hold then auto-advance. Optional lucide icon 18px muted aqua left of label (Q1 only). No "Next" button — selection auto-advances.

**Progress bar:**
4px height, full width of tool container. Background `rgba(0,0,0,0.08)`. Fill aqua. Width animates on step advance `transition: width 0.4s cubic-bezier(0.76, 0, 0.24, 1)`. At 100%: aqua pulse before result reveals.

**Result panel:**
Surface `#F6F5F4`, 8px radius, elevated shadow, **3px Tyrian purple top border**. Structure: tier badge (pill, aqua bg) → headline (navy 700) → price (aqua 700 2xl) → disclaimer (muted xs) → divider → 3 bullets (navy 400 sm) → divider → soft CTA → "Reset answers" text link (muted, sm). No "Start over" — answers are editable inline by tapping any completed question card above.

**CompletedAnswer card:**
Compressed tappable card shown above the active question for each answered step. Same surface bg (`#F6F5F4`), 8px radius. No border at rest, whisper border on hover. Two lines: question text in muted gray Poppins 400 xs, selected answer in navy Poppins 500 sm below it. Lucide `Pencil` icon size-14 muted gray on the far right — signals tappable without demanding attention. On tap: re-opens that question, resets all questions below it, result reruns. Transition: same step transition animation as forward navigation but in reverse direction.

**Calculating state (800ms between Q5 answer and result reveal):**
Progress bar fills to 100% and pulses once (opacity 1 → 0.6 → 1, aqua). Question area fades out (opacity 0, 0.25s). Container holds its height via the `layout` prop — sits empty and still for the remaining time. Nothing else: no spinner, no text, no activity indicator. The silence is intentional — it makes the Tyrian purple result panel arrival feel earned. Filling the pause with a loader would undercut the peak moment.

**ToolPreview on mobile:**
Hidden entirely on mobile (below `md` breakpoint). The hero is single column on mobile — headline, subline, CTA. The ToolPreview does not move below the CTA or collapse into a smaller version. It simply does not render. The CTA alone is sufficient on mobile; adding the preview below it pushes the tool grid too far down the page.

**Currency toggle:**
Two pills: `[$]` `[€]`. Default USD. Top-right of tool container, visible from Screen 0 through result. Active: aqua bg, white text. Inactive: muted text, transparent. Persists across steps, does not reset answers.

**AdSlot:**
Placeholder div only. Gray dashed border, "Ad" label, no fixed height. Wire AdSense only after hub has real content and AdSense is approved. Zones: `home-leaderboard`, `tool-bottom`, `blog-sidebar`, `blog-bottom`. No ads above the fold. No ads inside tool UI. No ads between the tool header and the tool UI — that gap is the trust moment. No interstitials.

---

## 10. Mobile-First Rules

- Single column always
- Option buttons full width, min 52px height, min 48px touch target on all interactive elements
- CTA button full width on mobile
- Progress bar always visible, same as desktop
- Body minimum 16px, labels minimum 14px
- No horizontal scroll anywhere
- Test every screen state at 375px before calling it done

---

## 11. Do's and Don'ts

**Do:**
- White page background, warm white surfaces.
- Aqua for interactive accents and CTAs only.
- Poppins for everything — one font.
- Full-width option buttons, large tap targets.
- `motion/react` for all animation.
- Test at 375px before calling any screen done.
- Deploy early — localhost lies about fonts and mobile rendering.

**Don't:**
- Use any color not in the palette.
- Use pure black `#000000`.
- Use dark backgrounds, dark nav, or dark sections.
- Add Tyrian purple anywhere except the result panel top border.
- Use `ease-in-out` or `linear` — always the premium cubic-bezier.
- Animate `width` or `height` directly — use `layout` prop.
- Use shadcn visual defaults — override everything with hub tokens.
- Import from `framer-motion` — use `motion/react`.
- Add sliders to tools — button grids with ranges only.
- Add free text inputs to tools.
- Add a "Submit" button — selections auto-advance.
- Build tool logic for /stack, /performance, /audit before /scope ships.
- Add JSON-LD schema before real content exists.
- Wire AdSense before hub has real content.

---

## To Be Defined

- [x] Hub wordmark — "hub" in Poppins 600, navy, text only. No bird mark. The "Built by Nextbyrd →" link in the header carries the brand connection — two signals in the same header would be redundant. Revisit after launch if it feels provisional.
- [ ] Icon style for tool cards — lucide only, or custom illustrations later?
