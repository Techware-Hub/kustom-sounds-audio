# Kustom Sounds & Audio — Landing Page Design Spec

**Date**: 2026-05-13
**Client**: Kustom Sounds & Audio (car/marine/home audio install business)
**Scope**: Single-page React landing site. Other pages gated behind a signup-wall popup ("Will be visible once you signup").

---

## 1. Goals & Constraints

- One-page landing site that sells install services and captures leads.
- Bold, memorable, automotive aesthetic — not generic SaaS template.
- Mobile responsive (480 / 768 / desktop breakpoints).
- Scroll-driven cinematic animations.
- No real backend; static site deployable to Vercel.
- All "other pages" (gallery details, nav links, etc.) route to a creative signup-wall popup.

---

## 2. Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | React 19 + Vite | Fast HMR, lean for a static landing |
| Smooth scroll | Lenis | Buttery scroll, easy GSAP integration |
| Scroll animation | GSAP 3 + ScrollTrigger | Industry standard for pinned/scrubbed effects |
| Component animation | Framer Motion | AnimatePresence for popup + micro-interactions |
| Styling | Plain CSS w/ CSS variables, per-component `.css` files | No Tailwind dep; CSS vars for theme tokens |
| Fonts | Google Fonts — Anton (display), Rajdhani (body) | Distinctive, automotive concert-poster vibe |
| Deploy | Vercel | Zero config, fast |

No backend. No database. Contact form posts to a placeholder (or mailto: until backend wired). Brand logos rendered as inline SVG/text to avoid hotlinking external sites.

---

## 3. Aesthetic System

**Theme: Neon Underground + Audio-Reactive Motion**

### Color tokens (CSS variables)

```css
:root {
  --bg: #0a0a0a;
  --bg-elevated: #141414;
  --accent: #a3ff12;       /* logo neon green */
  --accent-glow: rgba(163, 255, 18, 0.45);
  --chrome: #e8e8e8;
  --muted: #6a6a6a;
  --border: rgba(163, 255, 18, 0.25);
  --grain-opacity: 0.06;
}
```

### Typography

- Display: **Anton** — used for H1/H2 section titles, hero headline. Heavy tracking on uppercase.
- Body: **Rajdhani** (500/700) — used for paragraphs, buttons, nav, labels. Uppercase tracked variant for badges.

### Texture & motifs

- **Grain overlay**: SVG noise filter at 0.06 opacity covering body.
- **Grid lines**: faint `linear-gradient` grid background on select sections (process, popup).
- **Radial glow**: each section uses a centered `radial-gradient` neon green glow at ~0.15 opacity.
- **Lightning accents**: SVG bolts in hero corners.
- **Clipped corners**: cards and buttons use `clip-path: polygon(...)` for chamfered corners (matches logo shield motif).
- **Neon glow shadows**: `box-shadow: 0 0 24px var(--accent-glow)` on hovered/active elements.
- **Monospace badges**: small `[ DATA ]`-style tags for "stats/data" feel using Rajdhani uppercase + brackets.

---

## 4. Page Sections

### 4.1 Hero (full viewport)

- Layout: vertical-centered, logo top, headline mid, CTAs bottom.
- **Logo**: provided PNG (`Kustom Sounds & Audio-01_nobg.png`), ~280px wide desktop, ~180px mobile, has subtle floating animation.
- **Background**: low-opacity (~0.25) car-audio image (Unsplash: dark car interior with subs) with radial neon green vignette over it.
- **Equalizer bars**: 24 animated bars at bottom edge, randomized heights, CSS keyframe pulse.
- **Lightning SVG**: two bolt accents top-left + top-right corners.
- **Headline**: "WE BUILD THE BASS" (split-letter stagger reveal on mount, Anton 96px desktop / 56px mobile).
- **Sub**: "Pro audio install for cars, trucks, marine & home — engineered loud, tuned right."
- **CTAs**: primary "Get a Quote" (scrolls to contact), secondary "See Our Work" (scrolls to gallery).
- **Scroll cue**: animated chevron + "scroll" label at bottom.

### 4.2 About

- 2-column layout (stacks on mobile).
- Left: brand short story (3 short paragraphs).
- Right: 3 stat counters in a vertical stack:
  - INSTALLS DONE — counts to 800+
  - PRO BRANDS — counts to 25+
  - YEARS DIALED IN — counts to 12
- Counters animate on ScrollTrigger via `gsap.to({ val: 0 }, { val: target, ... })`.

### 4.3 Services

- 4 cards in a grid (4-col desktop / 2-col tablet / 1-col mobile):
  - **CARS** — daily drivers, sedans, sport
  - **TRUCKS** — off-road, lifted, work trucks
  - **MARINE** — boats, jet skis
  - **HOME / CUSTOM** — home theater, garage builds, custom enclosures
- Each card: clipped corners, image top, title, short copy, "→" arrow.
- Hover: neon border glow, image scale 1.05, arrow translates right.

### 4.4 Gallery

- Asymmetric grid (CSS grid w/ explicit row/col spans): 6 build photos.
- Parallax: each image translates Y at speed proportional to its grid position.
- Click any image → triggers signup-wall popup.
- Mobile: collapses to 2-col simple grid, no parallax.

### 4.5 Process (pinned horizontal scroll)

- Section pins via ScrollTrigger.
- Horizontal track contains 4 steps:
  1. **CONSULT** — tell us your vision
  2. **QUOTE** — transparent pricing
  3. **INSTALL** — clean wiring, factory-grade
  4. **TUNE** — DSP-tuned for your space
- Each step: big numeral (Anton 200px), step name (Anton 48px), short copy (Rajdhani).
- Active step glows accent green; others muted.
- **Mobile fallback**: pinning disabled, steps stack vertically with regular fade-up reveals.

### 4.6 Brands

- Auto-scrolling marquee strip, infinite CSS keyframe loop.
- 8 brand names rendered as styled text (no logos hotlinked):
  JBL · PIONEER · KICKER · ROCKFORD FOSGATE · ALPINE · SONY · KENWOOD · FOCAL
- Each separated by a vertical bar `|`.
- Pause animation on hover.

### 4.7 Contact

- 2-column (stacks mobile):
  - **Left — quick form**: name, phone, vehicle, message, "Send Request" button.
  - **Right — CTAs**: prominent WhatsApp button (green w/ icon), phone button, email link, business address, hours.
- Form on submit: shows success toast (no backend — placeholder behavior).

### 4.8 Footer

- 3-column (stacks mobile):
  - Logo + tagline
  - Nav links (About, Services, Gallery, Brands, Contact — all trigger signup popup except in-page anchors)
  - Social icons (Instagram, Facebook, TikTok, YouTube — placeholder hrefs)
- Bottom bar: "© 2026 Kustom Sounds & Audio. Built loud."

---

## 5. Scroll Choreography

- **Lenis** wraps `body` for smooth scroll (`duration: 1.2`, `easing: easeOutExpo`).
- **GSAP ScrollTrigger** registered globally. Each section component registers its own triggers in a `useEffect` with cleanup.
- **Hero entry timeline** (on mount, not scroll):
  - Logo: fade + scale 0.9→1 (0.6s ease-out)
  - Headline: split-letter stagger reveal (0.04s per letter)
  - Sub + CTAs: fade up (delay 0.8s)
  - EQ bars: stagger-rise from bottom (delay 1.0s)
- **Section reveals**: opacity 0→1 + translateY 40px→0 when 75% visible. Direction alternates L/R for variety on the accent strip.
- **Stat counters**: triggered when About section's right column enters viewport.
- **Process pin**: pins for ~3x viewport height of scroll; horizontal track translateX maps to scroll progress.
- **Gallery parallax**: each image's `translate3d(0, y, 0)` driven by ScrollTrigger scrub.
- **Page bg glow**: CSS variable `--scroll-progress` updated on Lenis scroll, drives a faint radial glow position behind everything.
- `prefers-reduced-motion` respected: disables Lenis, ScrollTrigger pins, and large transforms — falls back to instant reveals.

---

## 6. Signup-Wall Popup

- **Trigger**: any "locked" interaction — gallery clicks, footer/header nav links, "view more" buttons.
- **Layout**: fullscreen `position: fixed` overlay.
  - Backdrop: `rgba(0,0,0,0.85)` + `backdrop-filter: blur(8px)` + grid bg overlay + grain.
  - Centered panel: 1px solid neon green border, 90% width capped at 480px, vertical stack:
    - Animated 5-bar equalizer (CSS keyframes).
    - "FREQUENCY BLOCKED" — Anton 36px.
    - "Sign up to tune in to the full Kustom Sounds experience." — Rajdhani 16px.
    - "SIGN UP →" CTA button (neon green fill).
    - "Maybe later" subtle close link.
  - Top-right X close button.
- **Entry**: Framer Motion `AnimatePresence`. Panel scales 0.92→1 + fades in (0.25s). Glitch flicker on backdrop for ~200ms via keyframe.
- **Exit**: reverse, 0.2s.
- **State**: managed by `SignupWallContext` exposing `{ open, close, isOpen }`.

---

## 7. Assets Plan

| Asset | Source | Notes |
|---|---|---|
| Logo | provided `Kustom Sounds & Audio-01_nobg.png` | Copied to `src/assets/logo.png` |
| Hero bg | Unsplash CDN direct URL | Search: "car subwoofer dark", crop wide |
| Service card imgs (×4) | Unsplash | car interior, truck audio, boat console, home theater |
| Gallery imgs (×6) | Unsplash / Pixabay | custom enclosures, amp rack, sub install, etc. |
| Brand logos | Inline styled text | Avoid hotlinking trademarks |
| Lightning SVG | Inline SVG | Hand-drawn bolt path |
| Grain noise | Inline SVG filter | `feTurbulence` |

All external images loaded with `loading="lazy"` and explicit width/height to prevent CLS.

---

## 8. Component Architecture

```
src/
├── App.jsx                       (top-level layout + providers)
├── main.jsx                      (Vite entry)
├── index.css                     (resets, CSS vars, font imports, base styles)
│
├── components/
│   ├── Hero.jsx + Hero.css
│   ├── About.jsx + About.css
│   ├── Services.jsx + Services.css
│   ├── Gallery.jsx + Gallery.css
│   ├── Process.jsx + Process.css
│   ├── Brands.jsx + Brands.css
│   ├── Contact.jsx + Contact.css
│   ├── Footer.jsx + Footer.css
│   ├── SignupWall.jsx + SignupWall.css
│   ├── EqualizerBars.jsx         (reusable; props: count, height)
│   ├── Grain.jsx                 (SVG noise overlay)
│   └── LightningBolt.jsx         (decorative SVG)
│
├── hooks/
│   ├── useLenis.js               (Lenis init + GSAP sync)
│   ├── useScrollReveal.js        (generic fade-up reveal trigger)
│   └── useCountUp.js             (stat counter)
│
├── context/
│   └── SignupWallContext.jsx     ({ open, close, isOpen })
│
└── assets/
    └── logo.png
```

Each section component:
- Owns its own DOM + CSS.
- Registers its own ScrollTrigger(s) in `useEffect`, cleans up on unmount.
- Has no knowledge of siblings.

---

## 9. Mobile Responsive

| Breakpoint | Behavior |
|---|---|
| ≥ 1024px | Full desktop layout, all pins active, parallax on |
| 768–1023px | 2-col grids, scaled type, parallax retained |
| 480–767px | 1-col stacks, hero logo 180px, marquee speeds up, Process pin disabled (vertical stack instead) |
| < 480px | Same as above with tighter padding |

All hit targets ≥ 44px. Form inputs full-width on mobile.

---

## 10. Acceptance Criteria

- ✅ Lighthouse Performance ≥ 80 on desktop, ≥ 70 mobile (heavy due to animations).
- ✅ All sections render and animate smoothly on desktop Chrome, Safari, Firefox.
- ✅ Mobile (iOS Safari, Chrome Android) does NOT pin process section; scroll remains responsive.
- ✅ Signup-wall popup opens on every "locked" link/click and closes via X, backdrop, Escape.
- ✅ `prefers-reduced-motion: reduce` disables Lenis + ScrollTrigger pins + scrubs.
- ✅ Logo always visible in hero (not crushed by responsive scaling).
- ✅ No console errors. No hydration warnings.

---

## 11. Out of Scope (Explicit)

- Real backend or form submission persistence.
- Real user authentication / signup flow (popup is purely UX gate).
- Testimonials section (skipped per client preference until real reviews exist).
- Multi-page routing.
- CMS integration.
- SEO/Open Graph beyond a basic `<head>` (can be added later).

---

## 12. Open Questions

None at spec time. Asset URLs (Unsplash/Pixabay) will be selected during implementation; if any are inappropriate after review, they're trivial to swap.
