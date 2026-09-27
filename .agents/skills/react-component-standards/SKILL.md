---
name: react-component-standards
description: Standard structure and conventions for authoring React components in the Fastoria project. Use this skill whenever creating new components, refactoring existing ones, or reviewing component implementations. Enforces "export default function ComponentName(): JSX.Element", strict TypeScript typing, separation of complex logic into custom hooks, maximizing CSS tokens defined in global.css, and using the "@/" path alias for all internal src imports.
---

# React Component Structure Standard

This skill establishes the uniform code structure, logic separation guidelines, path alias conventions, and styling rules for all React components in the **Fastoria** codebase.

Following this standard ensures clean architecture, separation of concerns, high maintainability, consistent Neo-Brutalist UI aesthetics, and type safety across the entire application.

---

## 1. The Core Standard: Function Declaration & Export

### ❌ What NOT to do
```tsx
// DO NOT use React.FC or arrow functions for top-level component declaration
export const Hero: React.FC = () => {
  return <div>...</div>;
};

// DO NOT declare anonymously and export default at bottom
const Hero = () => {
  return <div>...</div>;
};
export default Hero;
```

### ✅ What MUST be done
Always declare components as **named function declarations** with an **explicit `JSX.Element` return type**, exported as default:

```tsx
import type { JSX } from "react";

export default function Hero(): JSX.Element {
  return (
    <section>
      {/* ... */}
    </section>
  );
}
```

If the component accepts props:
```tsx
export default function Hero({ onRegisterClick }: HeroProps): JSX.Element {
  return (
    <section>
      {/* ... */}
    </section>
  );
}
```

> **Export Standard (Pola 1)**: Component `.tsx` files strictly export the component function as `export default function ComponentName(...)`. Re-exporting is cleanly delegated to `index.ts` via `export { default } from "./ComponentName"; export * from "./ComponentName.types";`. Do not add redundant `export { ComponentName };` named exports in `.tsx`.

---

## 2. Import Standards: Always Use `@/` Path Alias for `src`

All internal modules, components, hooks, utilities, assets, and types residing under `src/` **MUST** be imported using the `@/` path alias. Relative parent traversals (`../`) or sibling dots (`./`) across directories are strictly prohibited.

### ❌ What NOT to do
```tsx
// DO NOT use relative path traversal for internal modules
import { useCountdown } from "../hooks/useCountdown";
import { useParallaxTilt } from "../../hooks/useParallaxTilt";
import { Navbar } from "./Navbar";
import { formatCurrency } from "../utils/format";
import type { CompetitionItem } from "../types";
```

### ✅ What MUST be done
```tsx
// ALWAYS use the @/ path alias
import { useCountdown } from "@/hooks/useCountdown";
import { useParallaxTilt } from "@/hooks/useParallaxTilt";
import { Navbar } from "@/components/Navbar";
import { formatCurrency } from "@/utils/format";
import type { CompetitionItem } from "@/types";
```

### Path Mapping Reference:
* `@/components/*` → `src/components/*`
* `@/hooks/*` → `src/hooks/*`
* `@/utils/*` → `src/utils/*`
* `@/types/*` → `src/types/*`
* `@/assets/*` → `src/assets/*`

### Automated Import Sorting (ESLint):
The project enforces automated import ordering via `eslint-plugin-simple-import-sort`. You can automatically reorder and organize all imports across the codebase anytime by running:
```bash
npm run lint:fix
```

**Order of Groups Enforced:**
1. React & external packages (`react`, `react-icons`, etc.)
2. Internal alias imports (`@/components/...`, `@/hooks/...`, `@/utils/...`, `@/types/...`)
3. Side-effects & stylesheets (`@/global.css`)
4. Relative imports (`./...`, `../...`)

---

## 3. Logic Separation: Extract Complex Logic into Custom Hooks

To keep components lightweight, readable, and focused strictly on presentation, **any complex logic must be decoupled into dedicated custom hooks in `@/hooks/`**.

### When to Extract into a Custom Hook:
- ⏱️ **Timer & Interval Operations**: Countdown timers, polling, clocks, debounce/throttle routines.
- 📐 **Sensors, DOM Measurements & Math**: 3D parallax tilt, mouse trackers, scroll observers, window resizing, viewport listeners.
- 🔄 **Multi-step State & Transitions**: Complex state machines, multi-step registration forms, filter pipelines.
- 🌐 **Async Operations**: Fetching external APIs, handling WebSocket feeds, local storage sync.

### Pattern:
```text
src/
├── hooks/
│   ├── useCountdown.ts        # Encapsulated countdown calculations & interval
│   ├── useParallaxTilt.ts     # Encapsulated 3D perspective math & mouse events
│   └── useScrollSpy.ts        # Active section tracking for navbar
└── components/
    └── Hero.tsx               # Pure UI consumption: const { timeLeft } = useCountdown(...);
```

#### Hook Implementation Example (`src/hooks/useCountdown.ts`):
```ts
import { useState, useEffect } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(targetTimestamp: number): {
  timeLeft: TimeLeft;
  formatNumber: (num: number) => string;
} {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const distance = targetTimestamp - Date.now();
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const formatNumber = (num: number): string => String(num).padStart(2, "0");

  return { timeLeft, formatNumber };
}
```

---

## 4. Standard File Architecture (Section Ordering)

Every component file should strictly adhere to this top-to-bottom layout:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Imports (React -> 3rd-party -> @/hooks -> @/components -> @/types)  │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Props & Local Types (Interface declarations)                        │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Component Definition (export default function ... )                 │
│    ├── 3a. Custom Hooks (e.g., useCountdown, useParallaxTilt)          │
│    ├── 3b. Local State (simple UI toggles only)                        │
│    ├── 3c. Handlers & Callbacks                                        │
│    └── 3d. Return JSX Statement                                        │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Optional Named Re-export (e.g., export { Hero };)                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Styling Standard: Maximize CSS Variables from `src/global.css`

Fastoria uses Tailwind CSS v4 synchronized with the **Electric Neo-Brutalist Design System** defined in [`src/global.css`](file:///d:/fastoria/src/global.css).

### ❌ Avoid Hardcoded Values
- ❌ Do NOT use arbitrary hex color classes: `bg-[#c7ff01]`, `text-[#1b1b1b]`, `border-[#000000]`.
- ❌ Do NOT use arbitrary shadow strings: `shadow-[4px_4px_0px_#000000]`, `shadow-[6px_6px_0px_#000000]`.
- ❌ Do NOT use inline font-family styles or default generic colors (`bg-yellow-400`, `text-gray-900`).

### ✅ Always Use Defined Tokens & Utilities

#### 1. Color Palette Tokens
| Design Role | Tailwind Class | CSS Variable | Value / Meaning |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `bg-canvas-bg` | `var(--canvas-bg)` | `#E8E8E2` (Warm bone canvas) |
| **Surface White** | `bg-surface-white` | `var(--surface-white)` | `#FFFFFF` (Pristine card surface) |
| **Surface Variants** | `bg-surface-container`, `bg-surface-dim` | `var(--surface-container)` | Low/high contrast containers |
| **Text (On Surface)** | `text-on-surface` | `var(--on-surface)` | `#1B1B1B` (High contrast primary ink) |
| **Muted Text** | `text-on-surface-variant` | `var(--on-surface-variant)`| `#434933` (Secondary body/labels) |
| **Primary Brand** | `bg-primary-container` | `var(--primary-container)` | `#C7FF01` (Electric Lime / Acid Green) |
| **Primary On-Container**| `text-on-primary-container` | `var(--on-primary-container)` | `#587300` |
| **Secondary Accent** | `bg-secondary` / `text-secondary` | `var(--secondary)` | `#752DD9` (Punch Violet) |
| **Tertiary Accent** | `bg-tertiary` / `text-tertiary` | `var(--tertiary)` | `#BE023B` (Punch Coral / Red) |
| **Accent Chromatics**| `bg-electric-yellow`, `bg-punch-coral`, `bg-vivid-mint`, `bg-electric-cyan`, `bg-soft-lilac`, `bg-dark-violet` | `var(--electric-yellow)`, etc. | High-voltage Neo-Brutalist badge accents |

#### 2. Hard Shadow Tokens (Zero-Blur Depth)
Use the standardized zero-blur drop shadow utilities:
* `shadow-neo-xs` (`2px 2px 0px #000000`) - Micro tags, subtle borders, active pressed states.
* `shadow-neo-sm` (`3px 3px 0px #000000`) - Small buttons, badges, countdown digits.
* `shadow-neo-md` (`4px 4px 0px #000000`) - Standard buttons, inputs, category chips.
* `shadow-neo-lg` (`6px 6px 0px #000000`) - Feature cards, modal dialogue, hero artwork.
* `shadow-neo-xl` (`8px 8px 0px #000000`) - Hover elevated states for cards and hero spotlight.

#### 3. Typography Scale & Families
* Display & Hero: `font-display-hero` (`Space Grotesk`, 800 weight, -0.03em letter spacing).
* Headlines: `font-headline-xl`, `font-headline-lg`, `font-headline-md`, `font-headline-sm` (`Space Grotesk`, 700 weight).
* Body: `font-body-lg`, `font-body-md`, `font-body-sm` (`Inter`, 400-500 weight).
* Code & Micro Badges: `font-label-lg`, `font-label-md`, `font-label-caps` (`JetBrains Mono`, 600-800 weight).

#### 4. Pre-built Global Neo-Brutalist Classes
Whenever appropriate, leverage the pre-built compound classes in `global.css`:
* `.neo-card`: Pre-styled card with `bg-surface-white`, `2.5px solid #000000`, `shadow-neo-lg`, and interactive hover elevation.
* `.neo-btn-primary`: Pre-styled electric lime button with hard shadow, hover color shift to electric yellow, and tactile active depression.
* `.neo-btn-secondary`: Pre-styled white button with tactile depression.
* `.ticker-track`: Continuous infinite marquee animation with pause-on-hover.

---

---

## 6. Component Reuse Standard: Prioritize Design System Primitives over Native HTML

To maintain 100% visual consistency and eliminate code duplication, **developers and agents MUST prioritize reusing existing Design System components (`@/components/atoms/*` and `@/components/molecules/*`) instead of manually defining raw native HTML elements (`<div>`, `<span>`, `<button>`) with lengthy ad-hoc utility classes.**

### ❌ What NOT to do
```tsx
// DO NOT manually compose raw container boxes with repetitive border/shadow classes:
<div className="relative bg-surface-white border-[3px] border-black shadow-neo-xl p-6 md:p-12 overflow-hidden">
  ...
</div>

// DO NOT manually style raw spans for badges/stickers/tags:
<span className="bg-punch-coral text-surface-white font-label-caps text-xs px-3 py-1 border-2 border-black uppercase -rotate-2 shadow-neo-xs">
  SEASON 02
</span>

// DO NOT write raw native buttons when Button atom exists:
<button className="bg-electric-yellow border-2 border-black shadow-neo-sm px-4 py-2 ...">
  Click Me
</button>
```

### ✅ What MUST be done
Always compose available Atoms & Molecules:
```tsx
// ALWAYS reuse the Card atom for bordered/shadowed containers:
<Card bgColor="white" shadow="xl" borderWidth="thick" className="relative p-6 md:p-12 overflow-hidden">
  ...
</Card>

// ALWAYS reuse the Badge atom for tags, stickers, and status chips:
<Badge color="punch-coral" shadow="xs" rotate="right">
  SEASON 02
</Badge>

// ALWAYS reuse the Button atom for interactive triggers:
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Core Primitives Inventory:
* **Container Boxes**: `<Card>` (`@/components/atoms/Card`) - supports `bgColor`, `shadow`, `borderWidth`, and all HTML div attributes/ref.
* **Tags, Stickers & Inline Highlights**: `<Badge>` (`@/components/atoms/Badge`) - supports `color`, `size`, `shadow`, `rotate`, `pulse`, and `as`.
* **Buttons & Action Triggers**: `<Button>` (`@/components/atoms/Button`) - supports `variant`, `size`, `href`, `ariaLabel`, `onClick`.
* **Countdown Modules**: `<CountdownTimer>` (`@/components/molecules/CountdownTimer`) & `<CountdownCard>` (`@/components/atoms/CountdownCard`).

---

## 7. Living Example: `Hero.tsx` Implementation

Notice how clean, declarative, and aligned the component is with `@/` imports, custom hooks, atomic component composition, and `global.css` utilities:

```tsx
import type { JSX } from "react";
import { FiArrowRight, FiAward, FiFileText, FiUsers } from "react-icons/fi";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import CountdownTimer from "@/components/molecules/CountdownTimer";
import HeroArtwork from "@/components/molecules/HeroArtwork";
import HighlightItem from "@/components/molecules/HighlightItem";

import type { HeroProps } from "./Hero.types";

export default function Hero({ onRegisterClick }: HeroProps = {}): JSX.Element {
  return (
    <section id="hero" className="relative w-full max-w-7xl mx-auto px-margin-mobile md:px-margin pt-8 pb-16 md:py-16">
      {/* Reused Card Atom as Master Container */}
      <Card bgColor="white" shadow="xl" borderWidth="thick" className="relative p-6 md:p-12 overflow-hidden">
        {/* Reused Badge Atoms */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Badge color="electric-yellow" rotate="left" borderWidth="thick">
            ⚡ PENDAFTARAN GELOMBANG 2 DIBUKA
          </Badge>
          <Badge color="soft-lilac" rotate="right" pulse>
            KUOTA TERBATAS
          </Badge>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Headlines with Reused Badge for Prize Highlight */}
            <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-[50px] md:leading-14 text-on-surface uppercase font-extrabold">
              Tunjukkan Bakat, Rebut Total Hadiah{" "}
              <Badge color="lime" rotate="left" borderWidth="thick" size="inherit" shadow="sm" className="mt-1">
                Rp 75.000.000!
              </Badge>
            </h1>

            {/* Countdown Molecule (Encapsulates its own useCountdown hook) */}
            <CountdownTimer />

            {/* Reused Button Atoms */}
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#kategori" onClick={onRegisterClick} variant="primary" size="lg">
                <span>Daftar Sekarang</span>
                <FiArrowRight className="text-lg" />
              </Button>
              <Button href="#panduan" variant="secondary" size="lg">
                <FiFileText className="text-lg text-tertiary" />
                <span>Unduh Rulebook (PDF)</span>
              </Button>
            </div>
          </div>

          {/* Artwork Molecule (Encapsulates its own 3D Parallax Tilt Hook, Card, and Badges) */}
          <HeroArtwork />
        </div>
      </Card>
    </section>
  );
}
```

---

## 8. Implementation Checklist

Before completing any component work, verify:
- [ ] Uses `export default function ComponentName(props: Props): JSX.Element`
- [ ] Explicit `: JSX.Element` return type is declared
- [ ] Props interface is declared with `interface ComponentNameProps`
- [ ] Does NOT use `React.FC` or anonymous arrow functions
- [ ] **All internal imports from `src/` strictly use `@/` alias (`@/components/...`, `@/hooks/...`, `@/types/...`, etc.)**
- [ ] **Complex logic (timers, sensors, multi-step operations) is decoupled into `@/hooks/`**
- [ ] **Reuses existing Design System primitives (`Card`, `Badge`, `Button`) instead of writing raw HTML with manual duplicate classes**
- [ ] **Styling maximizes tokens from `src/global.css` (`bg-canvas-bg`, `bg-primary-container`, `shadow-neo-*`, `font-*`, `.neo-btn-*`, etc.)**
- [ ] Avoids arbitrary hardcoded hex codes (`bg-[#...]`) and ad-hoc shadows (`shadow-[...]`)
- [ ] Interactive elements feature tactile mechanical feedback (active translation + reduced shadow)
- [ ] Clean imports without unused variables, complying with TypeScript strict checks
