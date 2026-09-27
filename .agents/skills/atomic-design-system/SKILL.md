---
name: atomic-design-system
description: Standard architecture and classification rules for Fastoria's Atomic Design System (Atoms, Molecules, Organisms, Layouts, Pages). Enforces the Folder-per-Component (FPC) pattern for UI components (atoms, molecules, organisms) and flat-file convention for framing layers (layouts, pages). Use this skill whenever creating new UI elements, structuring directories, or determining component hierarchy and composition boundaries.
---

# Atomic Design System Architecture

This skill defines the structure, classification hierarchy, and composition boundaries for the **Atomic Design System** across the **Fastoria** application.

To strike the ideal balance between **modularity** and **developer ergonomics**, Fastoria employs a hybrid convention:
1. **Design System Components (`atoms`, `molecules`, `organisms`)** ➔ **Folder-per-Component (FPC)** with `.types.ts` and `index.ts`.
2. **Framing & View Layers (`layouts`, `pages`)** ➔ **Single Flat Files** (`MainLayout.tsx`, `LandingPage.tsx`).

---

## 1. Directory Structure

```text
src/
├── components/
│   ├── atoms/                     # ⚛️ Reusable UI primitives (FPC pattern)
│   │   ├── Button/
│   │   │   ├── Button.tsx         # Tactile neo-brutalist buttons (primary, secondary, danger)
│   │   │   ├── Button.types.ts    # ButtonProps, ButtonVariant, ButtonSize
│   │   │   └── index.ts           # Clean entrypoint
│   │   ├── Badge/
│   │   │   ├── Badge.tsx          # Neo-stickers, status tags, pill indicators
│   │   │   ├── Badge.types.ts     # BadgeProps, BadgeColor
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx           # Neo-brutalist container box (customizable bgColor, shadow, border)
│   │   │   ├── Card.types.ts      # CardProps, CardBgColor, CardShadowSize, CardBorderWidth
│   │   │   └── index.ts
│   │   └── CountdownCard/
│   │       ├── CountdownCard.tsx  # Single countdown box (digit + label)
│   │       ├── CountdownCard.types.ts # CountdownCardProps
│   │       └── index.ts
│   │
│   ├── molecules/                 # 🧬 Focused component groups (FPC pattern)
│   │   ├── NavLogo/
│   │   │   ├── NavLogo.tsx        # Brand mark, title, and event badge
│   │   │   ├── NavLogo.types.ts   # NavLogoProps
│   │   │   └── index.ts
│   │   ├── CountdownTimer/
│   │   │   ├── CountdownTimer.tsx # 4-digit countdown timer grid
│   │   │   ├── CountdownTimer.types.ts # CountdownTimerProps
│   │   │   └── index.ts
│   │   ├── HeroArtwork/
│   │   │   ├── HeroArtwork.tsx    # 3D parallax artwork card with sticker tags
│   │   │   ├── HeroArtwork.types.ts # HeroArtworkProps
│   │   │   └── index.ts
│   │   ├── HighlightItem/
│   │   │   ├── HighlightItem.tsx  # Icon + label metric pair
│   │   │   ├── HighlightItem.types.ts # HighlightItemProps
│   │   │   └── index.ts
│   │   ├── CompetitionCard/
│   │   │   ├── CompetitionCard.tsx # Competition category card with tags & price
│   │   │   ├── CompetitionCard.types.ts # CompetitionCardProps, CompetitionItem
│   │   │   └── index.ts
│   │   ├── TimelineStepCard/
│   │   │   ├── TimelineStepCard.tsx # Milestone step box with date, title, and status
│   │   │   ├── TimelineStepCard.types.ts # TimelineStepCardProps, TimelineStepItem
│   │   │   └── index.ts
│   │   ├── RulebookBanner/
│   │   │   ├── RulebookBanner.tsx # Official rulebook download CTA bar
│   │   │   ├── RulebookBanner.types.ts # RulebookBannerProps
│   │   │   └── index.ts
│   │   ├── ContactCard/
│   │   │   ├── ContactCard.tsx    # Contact person card with role, direct channel & button
│   │   │   ├── ContactCard.types.ts # ContactCardProps, ContactCardItem
│   │   │   └── index.ts
│   │   ├── FaqAccordion/
│   │   │   ├── FaqAccordion.tsx   # Neo-brutalist interactive FAQ accordion list
│   │   │   ├── FaqAccordion.types.ts # FaqAccordionProps, FaqItem
│   │   │   └── index.ts
│   │   ├── SponsorLogo/
│   │   │   ├── SponsorLogo.tsx    # Responsive interactive partner logo with hover state
│   │   │   ├── SponsorLogo.types.ts # SponsorLogoProps
│   │   │   └── index.ts
│   │   └── FooterSocialLink/
│   │       ├── FooterSocialLink.tsx # Tactile social link badge button with brand hover
│   │       ├── FooterSocialLink.types.ts # FooterSocialLinkProps
│   │       └── index.ts
│   │
│   └── organisms/                 # 🏛️ Standalone UI sections (FPC pattern)
│       ├── Navbar/
│       │   ├── Navbar.tsx         # Responsive navigation bar with mobile drawer
│       │   ├── Navbar.types.ts    # NavbarProps
│       │   └── index.ts
│       ├── Hero/
│       │   ├── Hero.tsx           # Full Hero section with countdown and CTAs
│       │   ├── Hero.types.ts      # HeroProps
│       │   └── index.ts
│       ├── MarqueeTicker/
│       │   ├── MarqueeTicker.tsx  # Infinite auto-scrolling ticker bar
│       │   ├── MarqueeTicker.types.ts # MarqueeTickerProps
│       │   └── index.ts
│       ├── CompetitionSection/
│       │   ├── CompetitionSection.tsx # Competition category arena with filter tabs
│       │   ├── CompetitionSection.types.ts # CompetitionSectionProps
│       │   ├── CompetitionSection.constants.ts # Category tabs & competition data
│       │   └── index.ts
│       ├── TimelineSection/
│       │   ├── TimelineSection.tsx # 5-milestone official schedule & rulebook banner
│       │   ├── TimelineSection.types.ts # TimelineSectionProps
│       │   ├── TimelineSection.constants.ts # Official schedule milestones
│       │   └── index.ts
│       ├── ContactSection/
│       │   ├── ContactSection.tsx # Contact person grid & quick FAQ mini-accordion
│       │   ├── ContactSection.types.ts # ContactSectionProps
│       │   ├── ContactSection.constants.ts # Contact channels & FAQ entries
│       │   └── index.ts
│       ├── SponsorSection/
│       │   ├── SponsorSection.tsx # Continuous marquee ticker of partners & sponsors
│       │   ├── SponsorSection.types.ts # SponsorSectionProps
│       │   ├── SponsorSection.constants.tsx # Verified partner SVGs & metadata
│       │   └── index.ts
│       └── Footer/
│           ├── Footer.tsx         # Global 3-column footer with address, socials, legal links
│           ├── Footer.types.ts    # FooterProps, FooterSocialItem, FooterLegalLink
│           ├── Footer.constants.tsx # Brand copy, secretariat details & official social SVGs
│           └── index.ts
│
├── layouts/                       # 📐 Global frame scaffolding (Flat files)
│   └── MainLayout.tsx             # Sticky header, main container wrapper (co-located props)
│
├── pages/                         # 📄 Full screen route views (Flat files)
│   └── LandingPage.tsx            # Main event competition landing page
│
├── hooks/                         # Decoupled custom hooks (useCountdown, useParallaxTilt)
└── global.css                     # Design tokens & Tailwind theme variables
```

---

## 2. Anatomical Standards

### A. Component Layers (`atoms`, `molecules`, `organisms`) ➔ FPC Pattern
Every reusable component in `src/components/` is packaged as an isolated unit:
```text
[ComponentName]/
├── [ComponentName].tsx        # JSX implementation & presentation
├── [ComponentName].types.ts  # Exported props & component-specific types
└── index.ts                  # Clean barrel export
```

**Entrypoint standard (`index.ts`):**
```ts
export { default } from "./ComponentName";
export * from "./ComponentName.types";
```

**Consumer import cleanliness:**
```tsx
import Button from "@/components/atoms/Button";
import type { ButtonProps } from "@/components/atoms/Button";
```

---

### B. Framing & View Layers (`layouts`, `pages`) ➔ Flat Files
* **Layouts (`src/layouts/`)**: Single `.tsx` files (e.g. `MainLayout.tsx`). Props interfaces like `MainLayoutProps` are placed directly in the same file (*co-location*). Layouts are few in number and do not require separate folders.
* **Pages (`src/pages/`)**: Single `.tsx` files (e.g. `LandingPage.tsx`). As top-level route views, pages rarely take external props and are not shared as UI widgets. Keeping them flat prevents redundant `index.ts` nesting and makes file search (`Ctrl + P`) instantaneous.

---

## 3. Hierarchy & Composition Rules

### ⚛️ 1. Atoms (`src/components/atoms/<Name>/`)
* Primitive building blocks.
* Purely representational; no domain-specific state.
* Allowed Imports: React, `react-icons`, styling tokens from `global.css`, and foundational layout primitive atoms (e.g. `Card`).
* ❌ **NEVER** import molecules, organisms, layouts, or pages.

### 🧬 2. Molecules (`src/components/molecules/<Name>/`)
* Focused combinations of 2+ atoms acting as a cohesive unit.
* Allowed Imports: Atoms (`@/components/atoms/<Name>`), React, custom hooks.
* ❌ **NEVER** import organisms, layouts, or pages.

### 🏛️ 3. Organisms (`src/components/organisms/<Name>/`)
* Complete, distinct sections composed of molecules, atoms, and custom hooks.
* Allowed Imports: Atoms (`@/components/atoms/...`), Molecules (`@/components/molecules/...`), Hooks (`@/hooks/...`).
* ❌ **NEVER** import layouts or pages.

### 📐 4. Layouts (`src/layouts/<Name>.tsx`)
* Structural framing wrappers (Navbar placement, main container constraints, background canvas).
* Allowed Imports: Organisms (`@/components/organisms/...`), Molecules, Atoms.
* ❌ **NEVER** import pages.

### 📄 5. Pages (`src/pages/<Name>.tsx`)
* Concrete route views assembling Layouts and Organisms.
* Allowed Imports: Layouts (`@/layouts/...`), Organisms (`@/components/organisms/...`), Hooks/Stores.

---

## 4. Strict Downward Dependency Rule

```text
┌──────────┐
│  Pages   │───▶ Assembles Layouts & Organisms (src/pages/LandingPage.tsx)
└──────────┘
     │
     ▼
┌──────────┐
│ Layouts  │───▶ Houses Organisms & Scaffolding (src/layouts/MainLayout.tsx)
└──────────┘
     │
     ▼
┌──────────┐
│Organisms │───▶ Composes Molecules & Atoms (FPC: Hero/, Navbar/)
└──────────┘
     │
     ▼
┌──────────┐
│Molecules │───▶ Composes Atoms Together (FPC: CountdownTimer/, NavLogo/)
└──────────┘
     │
     ▼
┌──────────┐
│  Atoms   │───▶ Indivisible Primitives (FPC: Button/, Badge/, CountdownCard/)
└──────────┘
```

---

## 5. Implementation Checklist

When creating or modifying components, verify:
- [ ] Atoms, Molecules, and Organisms use the **Folder-per-Component (FPC)** pattern with `[Name].tsx`, `[Name].types.ts`, and `index.ts`
- [ ] Layouts and Pages use **Flat Files** (`[Name].tsx`)
- [ ] Classified into the correct Atomic folder
- [ ] No inverted dependencies (dependencies strictly flow downwards)
- [ ] Uses `export default function ComponentName(props): JSX.Element`
- [ ] Uses `@/` path alias for all internal imports (`@/components/atoms/Button`, `@/layouts/MainLayout`, etc.)
- [ ] Stylings utilize Neo-Brutalist tokens from `src/global.css`
- [ ] Complex logic extracted to `@/hooks/`
