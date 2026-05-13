# Kustom Sounds & Audio Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React landing site for Kustom Sounds & Audio with cinematic GSAP scroll effects, audio-reactive motifs, and a signup-wall popup gating "other pages".

**Architecture:** Vite + React 19 SPA. Each page section is its own component (`Hero`, `About`, `Services`, `Gallery`, `Process`, `Brands`, `Contact`, `Footer`) with its own CSS file and self-registered GSAP ScrollTrigger setup. Lenis provides smooth scroll; Framer Motion drives the `SignupWall` popup via a React context. No backend.

**Tech Stack:** React 19, Vite 5, GSAP 3 + ScrollTrigger, Lenis, Framer Motion, plain CSS w/ CSS variables, Google Fonts (Anton + Rajdhani).

**Note on testing:** Landing-page visuals are not meaningfully unit-testable. The plan includes (a) a small unit test for `SignupWallContext`, (b) a smoke test that the app renders, and (c) explicit manual visual verification steps in lieu of full TDD. Run `npm run dev` and inspect after each visual task.

**Working directory:** All work happens inside `c:\Users\TechWide\Desktop\Projects\Slime roosa\web\`. The Vite app lives there. Logo PNG remains at project root and is copied into `web/src/assets/` during Task 1.

---

## File Structure

```
web/                                  (new — Vite app root)
├── index.html
├── package.json
├── vite.config.js
├── public/
├── src/
│   ├── main.jsx                     entry; mounts <App />
│   ├── App.jsx                      top-level layout + SignupWallProvider
│   ├── index.css                    resets, CSS vars, Google Fonts import, base
│   │
│   ├── components/
│   │   ├── Hero.jsx + Hero.css      full-viewport hero, logo, headline, CTAs, EQ bars, bg img
│   │   ├── About.jsx + About.css    2-col brand story + stat counters
│   │   ├── Services.jsx + Services.css   4 service cards
│   │   ├── Gallery.jsx + Gallery.css      6 builds, asymmetric grid, parallax, click→popup
│   │   ├── Process.jsx + Process.css      pinned horizontal scroll, 4 steps
│   │   ├── Brands.jsx + Brands.css        marquee strip
│   │   ├── Contact.jsx + Contact.css      form + WhatsApp/phone CTAs
│   │   ├── Footer.jsx + Footer.css        logo, nav (popup-gated), socials
│   │   ├── SignupWall.jsx + SignupWall.css   fullscreen glitch popup
│   │   ├── EqualizerBars.jsx + EqualizerBars.css   reusable animated bars
│   │   ├── Grain.jsx                       inline SVG noise overlay
│   │   └── LightningBolt.jsx               decorative SVG bolt
│   │
│   ├── hooks/
│   │   ├── useLenis.js                     Lenis init + GSAP ticker sync
│   │   ├── useScrollReveal.js              generic fade-up on scroll
│   │   └── useCountUp.js                   number counter triggered on view
│   │
│   ├── context/
│   │   └── SignupWallContext.jsx           { isOpen, open, close }
│   │
│   └── assets/
│       └── logo.png                        copied from project root
└── tests/
    └── SignupWallContext.test.jsx          unit test for context
```

---

## Task 1: Scaffold Vite React project

**Files:**
- Create: `web/` (entire Vite scaffold via CLI)
- Create: `web/src/assets/logo.png` (copied from project root)
- Modify: `web/package.json` (script for `dev`, `build`, `preview`)

- [ ] **Step 1: Scaffold the project**

Run from `c:\Users\TechWide\Desktop\Projects\Slime roosa\`:
```bash
npm create vite@latest web -- --template react
```
Expected: `web/` folder created with React JS (not TS) template.

- [ ] **Step 2: Install base deps**

```bash
cd web
npm install
```
Expected: `node_modules/` created, exit 0.

- [ ] **Step 3: Install runtime libraries**

```bash
npm install gsap lenis framer-motion
```
Expected: `package.json` lists `gsap`, `lenis`, `framer-motion` as dependencies.

- [ ] **Step 4: Copy logo into src/assets**

```bash
mkdir -p src/assets
cp "../Kustom Sounds & Audio-01_nobg.png" src/assets/logo.png
```
Expected: `web/src/assets/logo.png` exists.

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```
Expected: Vite starts on `http://localhost:5173`, default React page renders. Stop with Ctrl+C.

- [ ] **Step 6: Commit**

```bash
git init   # only if not already a repo
git add web/
git commit -m "chore: scaffold Vite React app for Kustom Sounds landing"
```

---

## Task 2: Set up global CSS, theme tokens, fonts

**Files:**
- Modify: `web/index.html` (preload fonts, set title, favicon ref)
- Replace: `web/src/index.css` (full base styles + CSS variables + grain class)
- Delete: `web/src/App.css` (unused)

- [ ] **Step 1: Replace `web/index.html` body section**

Replace entire `web/index.html` with:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="description" content="Kustom Sounds & Audio — pro car, truck, marine and home audio installations. Engineered loud, tuned right." />
    <title>Kustom Sounds & Audio · Pro Audio Install</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Replace `web/src/index.css`**

Replace entire contents:
```css
:root {
  --bg: #0a0a0a;
  --bg-elevated: #141414;
  --bg-card: #161616;
  --accent: #a3ff12;
  --accent-bright: #c5ff5e;
  --accent-glow: rgba(163, 255, 18, 0.45);
  --chrome: #e8e8e8;
  --muted: #6a6a6a;
  --border: rgba(163, 255, 18, 0.25);
  --border-soft: rgba(255, 255, 255, 0.08);
  --grain-opacity: 0.06;

  --font-display: 'Anton', 'Impact', sans-serif;
  --font-body: 'Rajdhani', sans-serif;

  --container: 1280px;
  --section-pad-y: clamp(80px, 12vw, 160px);
  --section-pad-x: clamp(20px, 5vw, 64px);

  color-scheme: dark;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--chrome);
  font-family: var(--font-body);
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

body {
  min-height: 100vh;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 0.95;
  margin: 0;
  text-transform: uppercase;
  color: var(--chrome);
}

p { margin: 0; line-height: 1.6; color: #c5c5c5; }
a { color: inherit; text-decoration: none; }
button { font-family: var(--font-body); cursor: pointer; }

img { max-width: 100%; display: block; }

/* Reusable button styles */
.ksa-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--accent);
  color: #000;
  border: none;
  padding: 14px 28px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 3px;
  text-transform: uppercase;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  transition: filter .2s, transform .2s;
}
.ksa-btn:hover { filter: brightness(1.1); transform: translateY(-2px); }

.ksa-btn--ghost {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
}

/* Reusable label badge */
.ksa-badge {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--accent);
  text-transform: uppercase;
  padding: 4px 0;
}
.ksa-badge::before { content: '[ '; }
.ksa-badge::after  { content: ' ]'; }

/* Section base */
.ksa-section {
  position: relative;
  padding: var(--section-pad-y) var(--section-pad-x);
  max-width: var(--container);
  margin: 0 auto;
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

- [ ] **Step 3: Delete unused `App.css`**

```bash
rm src/App.css
```

- [ ] **Step 4: Commit**

```bash
git add web/index.html web/src/index.css
git rm web/src/App.css
git commit -m "feat: global theme tokens, fonts, base styles"
```

---

## Task 3: SignupWall context

**Files:**
- Create: `web/src/context/SignupWallContext.jsx`
- Create: `web/tests/SignupWallContext.test.jsx`
- Install: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
- Modify: `web/package.json` (add test script)
- Modify: `web/vite.config.js` (vitest config)

- [ ] **Step 1: Install test deps**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Update `vite.config.js`**

Replace `web/vite.config.js`:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

- [ ] **Step 3: Add test script in `package.json`**

In `web/package.json`, add to `"scripts"`:
```json
"test": "vitest run"
```

- [ ] **Step 4: Write failing test**

Create `web/tests/SignupWallContext.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SignupWallProvider, useSignupWall } from '../src/context/SignupWallContext';

function Probe() {
  const { isOpen, open, close } = useSignupWall();
  return (
    <div>
      <span data-testid="state">{isOpen ? 'open' : 'closed'}</span>
      <button onClick={open}>open</button>
      <button onClick={close}>close</button>
    </div>
  );
}

describe('SignupWallContext', () => {
  it('opens and closes the wall', () => {
    render(
      <SignupWallProvider>
        <Probe />
      </SignupWallProvider>
    );
    expect(screen.getByTestId('state').textContent).toBe('closed');
    fireEvent.click(screen.getByText('open'));
    expect(screen.getByTestId('state').textContent).toBe('open');
    fireEvent.click(screen.getByText('close'));
    expect(screen.getByTestId('state').textContent).toBe('closed');
  });
});
```

- [ ] **Step 5: Run test, expect failure**

```bash
npm test
```
Expected: FAIL ("Cannot find module '../src/context/SignupWallContext'").

- [ ] **Step 6: Implement context**

Create `web/src/context/SignupWallContext.jsx`:
```jsx
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SignupWallContext = createContext(null);

export function SignupWallProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);
  return (
    <SignupWallContext.Provider value={value}>
      {children}
    </SignupWallContext.Provider>
  );
}

export function useSignupWall() {
  const ctx = useContext(SignupWallContext);
  if (!ctx) throw new Error('useSignupWall must be used within SignupWallProvider');
  return ctx;
}
```

- [ ] **Step 7: Run test, expect pass**

```bash
npm test
```
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add web/src/context web/tests web/vite.config.js web/package.json web/package-lock.json
git commit -m "feat: SignupWall context with unit test"
```

---

## Task 4: Reusable visual primitives — Grain, LightningBolt, EqualizerBars

**Files:**
- Create: `web/src/components/Grain.jsx`
- Create: `web/src/components/LightningBolt.jsx`
- Create: `web/src/components/EqualizerBars.jsx`
- Create: `web/src/components/EqualizerBars.css`

- [ ] **Step 1: Create `Grain.jsx`**

```jsx
export default function Grain({ opacity = 0.06 }) {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity,
        mixBlendMode: 'overlay',
      }}
    >
      <filter id="ksa-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#ksa-noise)" />
    </svg>
  );
}
```

- [ ] **Step 2: Create `LightningBolt.jsx`**

```jsx
export default function LightningBolt({ width = 80, color = '#a3ff12', flipped = false, style = {} }) {
  return (
    <svg
      viewBox="0 0 32 96"
      width={width}
      aria-hidden="true"
      style={{
        transform: flipped ? 'scaleX(-1)' : 'none',
        filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 18px ${color})`,
        ...style,
      }}
    >
      <path
        d="M18 0 L4 52 L14 52 L8 96 L28 40 L18 40 L24 0 Z"
        fill={color}
      />
    </svg>
  );
}
```

- [ ] **Step 3: Create `EqualizerBars.jsx`**

```jsx
import './EqualizerBars.css';

export default function EqualizerBars({ count = 24, height = 80, gap = 4, className = '' }) {
  const bars = Array.from({ length: count }, (_, i) => i);
  return (
    <div
      className={`ksa-eq ${className}`}
      style={{ height, gap }}
      aria-hidden="true"
    >
      {bars.map((i) => (
        <span
          key={i}
          className="ksa-eq__bar"
          style={{ animationDelay: `${(i * 73) % 900}ms` }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create `EqualizerBars.css`**

```css
.ksa-eq {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
}
.ksa-eq__bar {
  flex: 1;
  min-width: 3px;
  max-width: 8px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent-glow);
  border-radius: 1px;
  animation: ksa-eq-pulse 1.1s ease-in-out infinite;
}
@keyframes ksa-eq-pulse {
  0%, 100% { height: 20%; }
  20% { height: 70%; }
  40% { height: 40%; }
  60% { height: 95%; }
  80% { height: 55%; }
}
```

- [ ] **Step 5: Commit**

```bash
git add web/src/components/Grain.jsx web/src/components/LightningBolt.jsx web/src/components/EqualizerBars.jsx web/src/components/EqualizerBars.css
git commit -m "feat: reusable Grain, LightningBolt, EqualizerBars"
```

---

## Task 5: Lenis + ScrollTrigger setup hook

**Files:**
- Create: `web/src/hooks/useLenis.js`
- Create: `web/src/hooks/useScrollReveal.js`
- Create: `web/src/hooks/useCountUp.js`

- [ ] **Step 1: Create `useLenis.js`**

```js
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
```

- [ ] **Step 2: Create `useScrollReveal.js`**

```js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(selector = '[data-reveal]', deps = []) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, deps);
  return containerRef;
}
```

- [ ] **Step 3: Create `useCountUp.js`**

```js
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(target, duration = 1.8) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => setValue(Math.round(counter.val)),
      });
    }, ref);
    return () => ctx.revert();
  }, [target, duration]);

  return { ref, value };
}
```

- [ ] **Step 4: Commit**

```bash
git add web/src/hooks
git commit -m "feat: useLenis, useScrollReveal, useCountUp hooks"
```

---

## Task 6: SignupWall popup component

**Files:**
- Create: `web/src/components/SignupWall.jsx`
- Create: `web/src/components/SignupWall.css`

- [ ] **Step 1: Create `SignupWall.jsx`**

```jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSignupWall } from '../context/SignupWallContext';
import EqualizerBars from './EqualizerBars';
import './SignupWall.css';

export default function SignupWall() {
  const { isOpen, close } = useSignupWall();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ksa-wall"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <div className="ksa-wall__grid" aria-hidden="true" />
          <motion.div
            className="ksa-wall__panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="ksa-wall-title"
          >
            <button className="ksa-wall__close" onClick={close} aria-label="Close">×</button>

            <EqualizerBars count={5} height={56} gap={6} className="ksa-wall__eq" />

            <span className="ksa-badge ksa-wall__badge">LOCKED · SIGNAL CUT</span>
            <h2 id="ksa-wall-title" className="ksa-wall__title">FREQUENCY BLOCKED</h2>
            <p className="ksa-wall__copy">
              Sign up to tune in to the full Kustom Sounds experience — gallery, custom builds, and pro install booking.
            </p>

            <button className="ksa-btn ksa-wall__cta" onClick={close}>
              Sign Up <span aria-hidden="true">→</span>
            </button>
            <button className="ksa-wall__later" onClick={close}>Maybe later</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create `SignupWall.css`**

```css
.ksa-wall {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
}

.ksa-wall__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(163, 255, 18, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(163, 255, 18, 0.08) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  animation: ksa-wall-glitch 3s steps(2) infinite;
}
@keyframes ksa-wall-glitch {
  0%, 95%, 100% { opacity: 1; transform: translate(0,0); }
  96% { opacity: 0.5; transform: translate(2px,-1px); }
  98% { opacity: 0.8; transform: translate(-2px,1px); }
}

.ksa-wall__panel {
  position: relative;
  z-index: 2;
  max-width: 480px;
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--accent);
  box-shadow: 0 0 60px var(--accent-glow), inset 0 0 30px rgba(163,255,18,0.04);
  padding: 56px 32px 36px;
  text-align: center;
  clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px));
}

.ksa-wall__close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: transparent;
  border: none;
  color: var(--chrome);
  font-size: 28px;
  line-height: 1;
}
.ksa-wall__close:hover { color: var(--accent); }

.ksa-wall__eq { margin: 0 auto 18px; max-width: 120px; }

.ksa-wall__badge { display: inline-block; margin-bottom: 10px; }

.ksa-wall__title {
  font-size: clamp(28px, 6vw, 44px);
  letter-spacing: 3px;
  margin-bottom: 12px;
  text-shadow: 0 0 14px var(--accent-glow);
}

.ksa-wall__copy {
  font-size: 15px;
  color: #b8b8b8;
  margin-bottom: 28px;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
}

.ksa-wall__cta { margin-bottom: 14px; }
.ksa-wall__later {
  background: transparent;
  color: var(--muted);
  border: none;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.ksa-wall__later:hover { color: var(--chrome); }
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/SignupWall.jsx web/src/components/SignupWall.css
git commit -m "feat: SignupWall popup component"
```

---

## Task 7: Hero section

**Files:**
- Create: `web/src/components/Hero.jsx`
- Create: `web/src/components/Hero.css`

- [ ] **Step 1: Create `Hero.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/logo.png';
import EqualizerBars from './EqualizerBars';
import LightningBolt from './LightningBolt';
import './Hero.css';

const HERO_BG = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=70';

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.ksa-hero__logo', { opacity: 0, scale: 0.9, duration: 0.7 })
        .from('.ksa-hero__char', { opacity: 0, y: 40, stagger: 0.04, duration: 0.6 }, '-=0.2')
        .from('.ksa-hero__sub', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.ksa-hero__ctas > *', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.2')
        .from('.ksa-hero__bolt', { opacity: 0, x: (i) => (i === 0 ? -40 : 40), duration: 0.6 }, '-=0.4');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const headline = 'WE BUILD THE BASS';

  return (
    <section className="ksa-hero" ref={rootRef} id="top">
      <div className="ksa-hero__bg" style={{ backgroundImage: `url(${HERO_BG})` }} aria-hidden="true" />
      <div className="ksa-hero__vignette" aria-hidden="true" />

      <LightningBolt className="ksa-hero__bolt ksa-hero__bolt--l" />
      <LightningBolt className="ksa-hero__bolt ksa-hero__bolt--r" flipped />

      <div className="ksa-hero__inner">
        <img className="ksa-hero__logo" src={logo} alt="Kustom Sounds & Audio" />

        <h1 className="ksa-hero__headline">
          {headline.split(' ').map((word, wi) => (
            <span key={wi} className="ksa-hero__word">
              {word.split('').map((ch, ci) => (
                <span key={ci} className="ksa-hero__char">{ch}</span>
              ))}
              {' '}
            </span>
          ))}
        </h1>

        <p className="ksa-hero__sub">
          Pro audio install for cars, trucks, marine &amp; home — engineered loud, tuned right.
        </p>

        <div className="ksa-hero__ctas">
          <a className="ksa-btn" href="#contact">Get a Quote →</a>
          <a className="ksa-btn ksa-btn--ghost" href="#gallery">See Our Work</a>
        </div>
      </div>

      <EqualizerBars count={32} height={90} gap={3} className="ksa-hero__eq" />

      <div className="ksa-hero__cue" aria-hidden="true">
        <span>SCROLL</span>
        <span className="ksa-hero__cue-arrow">▾</span>
      </div>
    </section>
  );
}
```

> Use the LightningBolt with a `className` prop. Update `LightningBolt.jsx` to accept `className`:

In `web/src/components/LightningBolt.jsx`, change the function signature line to also destructure `className`, and pass it to the SVG. Replace:
```jsx
export default function LightningBolt({ width = 80, color = '#a3ff12', flipped = false, style = {} }) {
```
With:
```jsx
export default function LightningBolt({ width = 80, color = '#a3ff12', flipped = false, style = {}, className = '' }) {
```
And in the `<svg>` tag, add `className={className}` attribute.

- [ ] **Step 2: Create `Hero.css`**

```css
.ksa-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 80px 20px 120px;
  background: var(--bg);
}

.ksa-hero__bg {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.18;
  filter: grayscale(0.4) contrast(1.1);
}
.ksa-hero__vignette {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 50% 60%, transparent, rgba(0,0,0,0.85) 75%),
    radial-gradient(circle at 50% 40%, rgba(163,255,18,0.18), transparent 55%);
}

.ksa-hero__bolt {
  position: absolute;
  top: 8%;
  z-index: 3;
}
.ksa-hero__bolt--l { left: 6%; }
.ksa-hero__bolt--r { right: 6%; }

.ksa-hero__inner {
  position: relative;
  z-index: 4;
  text-align: center;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.ksa-hero__logo {
  width: 280px;
  height: auto;
  filter: drop-shadow(0 0 30px rgba(163,255,18,0.35));
  animation: ksa-hero-float 6s ease-in-out infinite;
}
@keyframes ksa-hero-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.ksa-hero__headline {
  font-size: clamp(48px, 9vw, 124px);
  line-height: 0.9;
  letter-spacing: 0.02em;
  margin: 8px 0 4px;
  text-shadow: 0 0 24px rgba(163,255,18,0.25);
}
.ksa-hero__word { display: inline-block; }
.ksa-hero__char { display: inline-block; }

.ksa-hero__sub {
  font-size: clamp(15px, 1.6vw, 19px);
  max-width: 620px;
  color: #c8c8c8;
}

.ksa-hero__ctas {
  display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;
  margin-top: 8px;
}

.ksa-hero__eq {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
  opacity: 0.75;
}

.ksa-hero__cue {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  letter-spacing: 4px;
  color: var(--muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 5;
}
.ksa-hero__cue-arrow {
  animation: ksa-bob 1.6s ease-in-out infinite;
  color: var(--accent);
}
@keyframes ksa-bob {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(4px); opacity: 1; }
}

@media (max-width: 768px) {
  .ksa-hero__logo { width: 180px; }
  .ksa-hero__bolt { display: none; }
  .ksa-hero__eq { padding: 0 16px; bottom: 24px; }
}
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Hero.jsx web/src/components/Hero.css web/src/components/LightningBolt.jsx
git commit -m "feat: Hero section with logo, headline split, EQ bars, lightning"
```

---

## Task 8: About section + stat counters

**Files:**
- Create: `web/src/components/About.jsx`
- Create: `web/src/components/About.css`

- [ ] **Step 1: Create `About.jsx`**

```jsx
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import './About.css';

function Stat({ value, label, suffix = '+' }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="ksa-about__stat" ref={ref}>
      <div className="ksa-about__stat-val">
        {v}<span>{suffix}</span>
      </div>
      <div className="ksa-about__stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const ref = useScrollReveal('[data-reveal]');
  return (
    <section className="ksa-section ksa-about" id="about" ref={ref}>
      <div className="ksa-about__grid">
        <div className="ksa-about__copy">
          <span className="ksa-badge" data-reveal>About · Workshop</span>
          <h2 className="ksa-about__title" data-reveal>
            We don't sell speakers.<br/>We engineer the moment the bass hits.
          </h2>
          <p data-reveal>
            Kustom Sounds &amp; Audio is a dedicated install shop for drivers who actually
            care what their car sounds like. Daily commuters, weekend show cars, lifted trucks,
            boats — if it has a battery, we can dial it in.
          </p>
          <p data-reveal>
            Every build starts with how you drive and ends with a DSP tune. No off-the-shelf
            packages. No "good enough." Just clean wiring, factory-grade fitment, and a system
            you'll keep coming back to.
          </p>
        </div>

        <div className="ksa-about__stats">
          <Stat value={800} label="Installs Done" />
          <Stat value={25} label="Pro Brands" />
          <Stat value={12} label="Years Dialed In" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `About.css`**

```css
.ksa-about {
  position: relative;
}
.ksa-about::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 40%, rgba(163,255,18,0.08), transparent 50%);
  pointer-events: none;
}

.ksa-about__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;
}

.ksa-about__title {
  font-size: clamp(32px, 4.6vw, 64px);
  line-height: 1;
  margin: 14px 0 28px;
}
.ksa-about__copy p { margin-bottom: 16px; font-size: 16px; }

.ksa-about__stats {
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-left: 1px solid var(--border);
  padding-left: 40px;
}
.ksa-about__stat-val {
  font-family: var(--font-display);
  font-size: clamp(60px, 8vw, 120px);
  line-height: 0.9;
  color: var(--accent);
  text-shadow: 0 0 20px var(--accent-glow);
}
.ksa-about__stat-val span { font-size: 0.5em; color: var(--chrome); margin-left: 4px; }
.ksa-about__stat-label {
  font-size: 12px;
  letter-spacing: 4px;
  color: var(--muted);
  text-transform: uppercase;
  margin-top: 4px;
}

@media (max-width: 900px) {
  .ksa-about__grid { grid-template-columns: 1fr; gap: 48px; }
  .ksa-about__stats { border-left: none; padding-left: 0; border-top: 1px solid var(--border); padding-top: 32px; }
}
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/About.jsx web/src/components/About.css
git commit -m "feat: About section with animated stat counters"
```

---

## Task 9: Services section

**Files:**
- Create: `web/src/components/Services.jsx`
- Create: `web/src/components/Services.css`

- [ ] **Step 1: Create `Services.jsx`**

```jsx
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

const SERVICES = [
  {
    title: 'CARS',
    copy: 'Daily drivers, sport sedans, show cars. Subs, amps, head units, sound deadening.',
    img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=70',
  },
  {
    title: 'TRUCKS',
    copy: 'Lifted off-road, work trucks, overlanders. Sealed enclosures sized for the cab.',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=70',
  },
  {
    title: 'MARINE',
    copy: 'Boats and jet skis. Sealed, salt-rated, weather-built audio that survives the lake.',
    img: 'https://images.unsplash.com/photo-1599582909646-2126052dc6cd?auto=format&fit=crop&w=900&q=70',
  },
  {
    title: 'HOME & CUSTOM',
    copy: 'Garage theaters, custom enclosures, vintage car builds, full DSP tunes.',
    img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=70',
  },
];

export default function Services() {
  const ref = useScrollReveal('[data-reveal]');
  return (
    <section className="ksa-section ksa-services" id="services" ref={ref}>
      <div className="ksa-services__head">
        <span className="ksa-badge" data-reveal>Services · 04</span>
        <h2 className="ksa-services__title" data-reveal>What We Install</h2>
      </div>
      <div className="ksa-services__grid">
        {SERVICES.map((s, i) => (
          <article key={s.title} className="ksa-service" data-reveal>
            <div className="ksa-service__img" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="ksa-service__body">
              <span className="ksa-service__num">0{i + 1}</span>
              <h3 className="ksa-service__title">{s.title}</h3>
              <p className="ksa-service__copy">{s.copy}</p>
              <span className="ksa-service__arrow">→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `Services.css`**

```css
.ksa-services__head {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 60px;
}
.ksa-services__title { font-size: clamp(40px, 6vw, 88px); }

.ksa-services__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.ksa-service {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  overflow: hidden;
  transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
}
.ksa-service:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
  box-shadow: 0 0 30px var(--accent-glow);
}

.ksa-service__img {
  height: 220px;
  background-size: cover;
  background-position: center;
  filter: grayscale(0.4) contrast(1.05) brightness(0.8);
  transition: transform .5s ease, filter .35s ease;
}
.ksa-service:hover .ksa-service__img {
  transform: scale(1.06);
  filter: grayscale(0) brightness(1);
}

.ksa-service__body { padding: 22px 22px 28px; position: relative; }
.ksa-service__num {
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--accent);
}
.ksa-service__title {
  font-size: 28px;
  margin: 6px 0 10px;
  letter-spacing: 1px;
}
.ksa-service__copy { font-size: 14px; color: #b0b0b0; }
.ksa-service__arrow {
  position: absolute;
  right: 22px; bottom: 18px;
  color: var(--accent);
  font-size: 22px;
  transition: transform .25s ease;
}
.ksa-service:hover .ksa-service__arrow { transform: translateX(6px); }

@media (max-width: 1024px) {
  .ksa-services__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .ksa-services__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Services.jsx web/src/components/Services.css
git commit -m "feat: Services section with 4 cards"
```

---

## Task 10: Gallery section + signup wall trigger

**Files:**
- Create: `web/src/components/Gallery.jsx`
- Create: `web/src/components/Gallery.css`

- [ ] **Step 1: Create `Gallery.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSignupWall } from '../context/SignupWallContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const SHOTS = [
  { src: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=1100&q=70', span: 'big', tag: 'CUSTOM ENCLOSURE' },
  { src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=70', span: 'small', tag: 'AMP RACK' },
  { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=70', span: 'small', tag: 'SUB INSTALL' },
  { src: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=900&q=70', span: 'tall', tag: 'WIRING' },
  { src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1100&q=70', span: 'wide', tag: 'SHOW CAR BUILD' },
  { src: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=70', span: 'small', tag: 'BOAT AUDIO' },
];

export default function Gallery() {
  const { open } = useSignupWall();
  const ref = useScrollReveal('[data-reveal]');
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const items = trackRef.current.querySelectorAll('.ksa-gal__item');
    const ctx = gsap.context(() => {
      items.forEach((el, i) => {
        const speed = (i % 2 === 0 ? -30 : 30);
        gsap.fromTo(el, { y: speed * -1 }, {
          y: speed,
          ease: 'none',
          scrollTrigger: { trigger: trackRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, trackRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ksa-section ksa-gallery" id="gallery" ref={ref}>
      <div className="ksa-gallery__head">
        <span className="ksa-badge" data-reveal>Recent Builds · 06</span>
        <h2 className="ksa-gallery__title" data-reveal>From the Bay</h2>
      </div>

      <div className="ksa-gal__grid" ref={trackRef}>
        {SHOTS.map((shot, i) => (
          <button
            key={i}
            type="button"
            className={`ksa-gal__item ksa-gal__item--${shot.span}`}
            onClick={open}
            aria-label={`View ${shot.tag} build`}
          >
            <img src={shot.src} alt="" loading="lazy" />
            <span className="ksa-gal__tag">{shot.tag}</span>
            <span className="ksa-gal__lock">LOCKED</span>
          </button>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `Gallery.css`**

```css
.ksa-gallery__head { margin-bottom: 60px; display: flex; flex-direction: column; gap: 12px; }
.ksa-gallery__title { font-size: clamp(40px, 6vw, 88px); }

.ksa-gal__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 16px;
}

.ksa-gal__item {
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  padding: 0;
  cursor: pointer;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
  transition: border-color .25s ease, box-shadow .25s ease;
}
.ksa-gal__item:hover {
  border-color: var(--accent);
  box-shadow: 0 0 24px var(--accent-glow);
}

.ksa-gal__item--big   { grid-column: span 2; grid-row: span 2; }
.ksa-gal__item--tall  { grid-row: span 2; }
.ksa-gal__item--wide  { grid-column: span 2; }
.ksa-gal__item--small { /* 1x1 default */ }

.ksa-gal__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.35) brightness(0.7);
  transition: filter .35s ease, transform .5s ease;
}
.ksa-gal__item:hover img { filter: grayscale(0) brightness(0.9); transform: scale(1.06); }

.ksa-gal__tag {
  position: absolute;
  bottom: 14px; left: 14px;
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 3px;
  background: rgba(0,0,0,0.7);
  padding: 6px 10px;
  color: var(--chrome);
  border-left: 2px solid var(--accent);
}
.ksa-gal__lock {
  position: absolute;
  top: 14px; right: 14px;
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--accent);
  background: rgba(0,0,0,0.7);
  padding: 4px 8px;
  border: 1px solid var(--border);
  opacity: 0;
  transition: opacity .25s ease;
}
.ksa-gal__item:hover .ksa-gal__lock { opacity: 1; }

@media (max-width: 900px) {
  .ksa-gal__grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
  .ksa-gal__item--big, .ksa-gal__item--wide { grid-column: span 2; }
  .ksa-gal__item--tall { grid-row: span 1; }
}
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Gallery.jsx web/src/components/Gallery.css
git commit -m "feat: Gallery section with parallax and signup-wall trigger"
```

---

## Task 11: Process section (pinned horizontal)

**Files:**
- Create: `web/src/components/Process.jsx`
- Create: `web/src/components/Process.css`

- [ ] **Step 1: Create `Process.jsx`**

```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: '01', title: 'CONSULT', copy: 'Tell us your vehicle, your music, your budget. We listen first.' },
  { n: '02', title: 'QUOTE',   copy: 'Transparent line-item pricing. No surprise upsell.' },
  { n: '03', title: 'INSTALL', copy: 'Clean wiring, factory-grade fitment, sound-deadened cabin.' },
  { n: '04', title: 'TUNE',    copy: 'DSP-tuned for your cabin. You walk out smiling.' },
];

export default function Process() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const total = trackRef.current.scrollWidth - window.innerWidth;
      gsap.to(trackRef.current, {
        x: -total,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${total}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ksa-process" id="process" ref={sectionRef}>
      <div className="ksa-process__head">
        <span className="ksa-badge">How It Works</span>
        <h2 className="ksa-process__title">From Quote to Cabin</h2>
      </div>
      <div className="ksa-process__track" ref={trackRef}>
        {STEPS.map((s) => (
          <article key={s.n} className="ksa-process__step">
            <span className="ksa-process__num">{s.n}</span>
            <h3 className="ksa-process__step-title">{s.title}</h3>
            <p className="ksa-process__copy">{s.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `Process.css`**

```css
.ksa-process {
  position: relative;
  padding: var(--section-pad-y) 0 var(--section-pad-y);
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 50%, rgba(163,255,18,0.06), transparent 60%),
    var(--bg);
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
}

.ksa-process__head {
  max-width: var(--container);
  margin: 0 auto 48px;
  padding: 0 var(--section-pad-x);
  display: flex; flex-direction: column; gap: 12px;
}
.ksa-process__title { font-size: clamp(40px, 6vw, 88px); }

.ksa-process__track {
  display: flex;
  gap: 60px;
  padding: 0 var(--section-pad-x);
  will-change: transform;
}

.ksa-process__step {
  flex: 0 0 460px;
  padding: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  position: relative;
  clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px));
}
.ksa-process__num {
  font-family: var(--font-display);
  font-size: 180px;
  line-height: 1;
  color: var(--accent);
  text-shadow: 0 0 40px var(--accent-glow);
  display: block;
}
.ksa-process__step-title {
  font-size: 48px;
  letter-spacing: 4px;
  margin: 8px 0 20px;
}
.ksa-process__copy { font-size: 16px; color: #c0c0c0; max-width: 360px; }

@media (max-width: 768px) {
  .ksa-process__track {
    flex-direction: column;
    gap: 24px;
    padding: 0 var(--section-pad-x);
  }
  .ksa-process__step { flex: 1; padding: 32px; }
  .ksa-process__num { font-size: 120px; }
  .ksa-process__step-title { font-size: 36px; }
}
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Process.jsx web/src/components/Process.css
git commit -m "feat: Process section with pinned horizontal scroll"
```

---

## Task 12: Brands marquee

**Files:**
- Create: `web/src/components/Brands.jsx`
- Create: `web/src/components/Brands.css`

- [ ] **Step 1: Create `Brands.jsx`**

```jsx
import './Brands.css';

const BRANDS = ['JBL', 'PIONEER', 'KICKER', 'ROCKFORD FOSGATE', 'ALPINE', 'SONY', 'KENWOOD', 'FOCAL'];

export default function Brands() {
  const sequence = [...BRANDS, ...BRANDS];
  return (
    <section className="ksa-brands" aria-label="Brands we carry">
      <div className="ksa-brands__marquee">
        <div className="ksa-brands__track">
          {sequence.map((b, i) => (
            <span key={i} className="ksa-brands__item">
              <span>{b}</span>
              <span className="ksa-brands__sep">|</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `Brands.css`**

```css
.ksa-brands {
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
  background: #060606;
  padding: 28px 0;
  overflow: hidden;
}
.ksa-brands__marquee { overflow: hidden; }
.ksa-brands__track {
  display: flex;
  width: max-content;
  animation: ksa-marquee 28s linear infinite;
}
.ksa-brands__marquee:hover .ksa-brands__track { animation-play-state: paused; }

.ksa-brands__item {
  display: inline-flex;
  align-items: center;
  gap: 28px;
  font-family: var(--font-display);
  font-size: 36px;
  letter-spacing: 6px;
  color: var(--chrome);
  padding: 0 28px;
  white-space: nowrap;
}
.ksa-brands__item:hover { color: var(--accent); }
.ksa-brands__sep { color: var(--accent); opacity: 0.5; }

@keyframes ksa-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (max-width: 768px) {
  .ksa-brands__item { font-size: 24px; letter-spacing: 4px; }
  .ksa-brands__track { animation-duration: 20s; }
}
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Brands.jsx web/src/components/Brands.css
git commit -m "feat: Brands marquee strip"
```

---

## Task 13: Contact section

**Files:**
- Create: `web/src/components/Contact.jsx`
- Create: `web/src/components/Contact.css`

- [ ] **Step 1: Create `Contact.jsx`**

```jsx
import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

export default function Contact() {
  const ref = useScrollReveal('[data-reveal]');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '', message: '' });

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', phone: '', vehicle: '', message: '' });
    }, 4000);
  };

  return (
    <section className="ksa-section ksa-contact" id="contact" ref={ref}>
      <div className="ksa-contact__head">
        <span className="ksa-badge" data-reveal>Get a Quote · Free</span>
        <h2 className="ksa-contact__title" data-reveal>Let's Build It Loud.</h2>
        <p className="ksa-contact__sub" data-reveal>Reply within 24h. WhatsApp is fastest.</p>
      </div>

      <div className="ksa-contact__grid">
        <form className="ksa-contact__form" onSubmit={submit} data-reveal>
          <label>
            <span>Name</span>
            <input value={form.name} onChange={update('name')} required />
          </label>
          <label>
            <span>Phone</span>
            <input value={form.phone} onChange={update('phone')} required type="tel" />
          </label>
          <label>
            <span>Vehicle (year / make / model)</span>
            <input value={form.vehicle} onChange={update('vehicle')} />
          </label>
          <label>
            <span>What are you looking to install?</span>
            <textarea value={form.message} onChange={update('message')} rows={4} required />
          </label>
          <button type="submit" className="ksa-btn">{sent ? 'Sent ✓' : 'Send Request →'}</button>
        </form>

        <aside className="ksa-contact__cta" data-reveal>
          <a className="ksa-contact__whats" href="https://wa.me/000000000" target="_blank" rel="noopener">
            <span className="ksa-contact__whats-icon" aria-hidden="true">●</span>
            <span>
              <small>Faster</small>
              <strong>WhatsApp Us</strong>
            </span>
          </a>
          <a className="ksa-contact__line" href="tel:+10000000000">
            <small>Call</small>
            <strong>(000) 000-0000</strong>
          </a>
          <a className="ksa-contact__line" href="mailto:hello@kustomsounds.audio">
            <small>Email</small>
            <strong>hello@kustomsounds.audio</strong>
          </a>
          <div className="ksa-contact__addr">
            <small>Workshop</small>
            <strong>123 Bassline Ave.<br/>Open Mon–Sat · 9a–7p</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `Contact.css`**

```css
.ksa-contact__head { margin-bottom: 56px; display: flex; flex-direction: column; gap: 10px; }
.ksa-contact__title { font-size: clamp(40px, 6vw, 88px); }
.ksa-contact__sub { color: var(--muted); }

.ksa-contact__grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 48px;
}

.ksa-contact__form { display: flex; flex-direction: column; gap: 18px; }
.ksa-contact__form label { display: flex; flex-direction: column; gap: 6px; }
.ksa-contact__form span {
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--muted);
  text-transform: uppercase;
}
.ksa-contact__form input,
.ksa-contact__form textarea {
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  color: var(--chrome);
  padding: 14px 16px;
  font-family: var(--font-body);
  font-size: 15px;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.ksa-contact__form input:focus,
.ksa-contact__form textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.ksa-contact__cta { display: flex; flex-direction: column; gap: 18px; }
.ksa-contact__whats {
  display: flex; align-items: center; gap: 14px;
  background: var(--accent);
  color: #000;
  padding: 20px 22px;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
}
.ksa-contact__whats small { display: block; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.7; }
.ksa-contact__whats strong { font-family: var(--font-display); font-size: 26px; letter-spacing: 2px; }
.ksa-contact__whats-icon {
  width: 18px; height: 18px; border-radius: 50%;
  background: #000;
  box-shadow: 0 0 0 6px rgba(0,0,0,0.2);
}

.ksa-contact__line, .ksa-contact__addr {
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  padding: 16px 20px;
  display: block;
}
.ksa-contact__line small, .ksa-contact__addr small {
  display: block; font-size: 11px; letter-spacing: 3px; color: var(--muted); text-transform: uppercase; margin-bottom: 4px;
}
.ksa-contact__line strong, .ksa-contact__addr strong {
  font-family: var(--font-display); font-size: 22px; letter-spacing: 1px; color: var(--chrome);
}
.ksa-contact__line:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 900px) {
  .ksa-contact__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Contact.jsx web/src/components/Contact.css
git commit -m "feat: Contact section with form, WhatsApp CTA, contact lines"
```

---

## Task 14: Footer

**Files:**
- Create: `web/src/components/Footer.jsx`
- Create: `web/src/components/Footer.css`

- [ ] **Step 1: Create `Footer.jsx`**

```jsx
import { useSignupWall } from '../context/SignupWallContext';
import logo from '../assets/logo.png';
import './Footer.css';

const NAV = ['About', 'Services', 'Gallery', 'Brands', 'Contact'];
const SOCIAL = ['Instagram', 'Facebook', 'TikTok', 'YouTube'];

export default function Footer() {
  const { open } = useSignupWall();
  return (
    <footer className="ksa-footer">
      <div className="ksa-footer__grid">
        <div className="ksa-footer__brand">
          <img src={logo} alt="Kustom Sounds & Audio" className="ksa-footer__logo" />
          <p>Engineered loud. Tuned right.<br/>Pro audio install since 2014.</p>
        </div>

        <nav className="ksa-footer__nav">
          <span className="ksa-badge">Navigate</span>
          <ul>
            {NAV.map((n) => (
              <li key={n}>
                <button type="button" onClick={open}>{n}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ksa-footer__social">
          <span className="ksa-badge">Follow</span>
          <ul>
            {SOCIAL.map((s) => (
              <li key={s}>
                <button type="button" onClick={open}>{s}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ksa-footer__bottom">
        <span>© {new Date().getFullYear()} Kustom Sounds &amp; Audio.</span>
        <span>Built loud.</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create `Footer.css`**

```css
.ksa-footer {
  background: #060606;
  border-top: 1px solid var(--border-soft);
  padding: 80px var(--section-pad-x) 24px;
  position: relative;
}
.ksa-footer::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.5;
}

.ksa-footer__grid {
  max-width: var(--container);
  margin: 0 auto 60px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 60px;
}
.ksa-footer__logo { width: 140px; margin-bottom: 18px; filter: drop-shadow(0 0 12px rgba(163,255,18,0.25)); }
.ksa-footer__brand p { color: #888; font-size: 14px; }

.ksa-footer__nav ul, .ksa-footer__social ul {
  list-style: none;
  padding: 0;
  margin: 14px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ksa-footer__nav button, .ksa-footer__social button {
  background: none; border: none;
  color: var(--chrome);
  font-family: var(--font-display);
  font-size: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0;
  text-align: left;
  cursor: pointer;
  transition: color .2s, transform .2s;
}
.ksa-footer__nav button:hover, .ksa-footer__social button:hover {
  color: var(--accent);
  transform: translateX(4px);
}

.ksa-footer__bottom {
  max-width: var(--container);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--border-soft);
  padding-top: 20px;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--muted);
}

@media (max-width: 900px) {
  .ksa-footer__grid { grid-template-columns: 1fr; gap: 40px; }
  .ksa-footer__bottom { flex-direction: column; gap: 8px; text-align: center; }
}
```

- [ ] **Step 3: Commit**

```bash
git add web/src/components/Footer.jsx web/src/components/Footer.css
git commit -m "feat: Footer with signup-wall-gated nav and socials"
```

---

## Task 15: Wire it all up in App

**Files:**
- Replace: `web/src/App.jsx`
- Replace: `web/src/main.jsx`

- [ ] **Step 1: Replace `web/src/App.jsx`**

```jsx
import { useLenis } from './hooks/useLenis';
import { SignupWallProvider } from './context/SignupWallContext';
import Grain from './components/Grain';
import SignupWall from './components/SignupWall';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Brands from './components/Brands';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useLenis();
  return (
    <SignupWallProvider>
      <Grain />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Process />
      <Brands />
      <Contact />
      <Footer />
      <SignupWall />
    </SignupWallProvider>
  );
}
```

- [ ] **Step 2: Replace `web/src/main.jsx`**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 3: Run dev server, manual smoke check**

```bash
npm run dev
```
Open `http://localhost:5173`. Verify:
- [ ] Hero renders with logo, headline animates in, EQ bars pulse.
- [ ] Scroll triggers fade-up reveals across About, Services, Gallery, Contact.
- [ ] Stat counters in About count up when scrolled into view.
- [ ] Services cards hover-glow.
- [ ] Gallery click opens SignupWall popup; Escape and X close it.
- [ ] Process pins on desktop and scrolls horizontally; stacks vertically on narrow viewport.
- [ ] Brands marquee scrolls; pauses on hover.
- [ ] Contact form local-submits and shows "Sent ✓".
- [ ] Footer nav buttons open SignupWall popup.
- [ ] No console errors.

- [ ] **Step 4: Commit**

```bash
git add web/src/App.jsx web/src/main.jsx
git commit -m "feat: wire App with all sections, providers, and smooth scroll"
```

---

## Task 16: Mobile responsive QA + reduced motion verification

**Files:** none (verification only)

- [ ] **Step 1: Test mobile breakpoints**

Run `npm run dev`. Open DevTools, toggle device toolbar.

Verify at each width:
- [ ] **375px** (mobile): logo 180px, headline wraps cleanly, services 1-col, gallery 2-col simple, process stacks vertically, brands marquee smaller.
- [ ] **768px** (tablet): services 2-col, gallery still asymmetric.
- [ ] **1280px** (desktop): full asymmetric layouts active, process pins horizontally.

- [ ] **Step 2: Test reduced motion**

In DevTools → Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → "reduce".
- [ ] Lenis smooth scroll disabled (jumps to anchor instantly).
- [ ] Pinned Process section does not pin (just stacks/scrolls normally).
- [ ] Stat counters either skip animation or finish instantly.
- [ ] No janky transforms.

- [ ] **Step 3: Build production bundle**

```bash
npm run build
npm run preview
```
Expected: build succeeds, preview at `http://localhost:4173` renders identically.

- [ ] **Step 4: Run unit test**

```bash
npm test
```
Expected: `SignupWallContext.test.jsx` PASS.

- [ ] **Step 5: Commit (only if any fixes were needed)**

```bash
git add -A
git commit -m "chore: mobile/reduced-motion QA fixes"
```

---

## Self-Review Notes

- **Spec coverage**: Every section in §4 of the spec maps to a Task 7–14. SignupWall (§6) → Task 6. Hooks/scroll (§5) → Task 5 + per-section hooks. Tech stack (§2) → Task 1. Aesthetic system (§3) → Task 2. Assets (§7) → Task 1 (logo) + inline image URLs in service/gallery tasks. Component arch (§8) matches plan file structure exactly. Mobile (§9) → covered in CSS within each section + Task 16. Acceptance (§10) → manual checks in Task 15 + Task 16.
- **Placeholders**: none. Each task contains full code.
- **Type consistency**: `useSignupWall()` returns `{ isOpen, open, close }` consistently across context, SignupWall, Gallery, Footer.

---

Plan complete and saved to `docs/superpowers/plans/2026-05-13-kustom-sounds-audio-landing.md`. Two execution options:

1. **Subagent-Driven** (recommended) — dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
