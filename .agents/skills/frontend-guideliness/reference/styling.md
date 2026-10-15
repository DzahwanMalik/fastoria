# Section 4 — Design System & Styling

Reference: [`src/global.css`](../../../../src/global.css)

The visual language is **Electric Neo-Brutalist**: thick black borders, hard
zero-blur offset shadows, high-voltage accents, uppercase display type, and
mechanical press/hover motion.

## Token source of truth

`global.css` declares every design token **once**, inside a single `@theme`
block, using literal values:

```css
@theme {
  --color-primary-container: #C7FF01;
  --font-headline-xl: "Space Grotesk", sans-serif;
  --text-headline-xl: 44px;
  --text-headline-xl--line-height: 48px;
  --spacing-gutter: 1.5rem;
  --shadow-neo-md: 4px 4px 0px #000000;
}
```

Tailwind v4 turns each entry into **both** a utility (`bg-primary-container`,
`font-headline-xl text-headline-xl`, `gap-gutter`, `shadow-neo-md`) and a CSS
custom property (`var(--color-primary-container)`), so the same block is the
source for utilities and for the `@layer base` / `.neo-*` rules in the same
file. There is no separate `:root` mirror block.

Keep the token set **lean**: only declare tokens that are actually
referenced. If you add a token, use it (or delete it) — don't keep dead
Material-style roles (`*-fixed`, `inverse-*`, `on-*`, error palette, unused
`space-*` steps) around.

Consume the **Tailwind token utilities**, never raw hex or CSS vars in JSX:

```tsx
// ✅
<div className="bg-primary-container text-on-surface border-[2.5px] border-black shadow-neo-md" />
// ❌
<div style={{ backgroundColor: "#C7FF01" }} />
```

## Colors

- Surfaces: `bg-canvas-bg`, `bg-surface-white`, `bg-surface-container`, `text-on-surface`, `text-on-surface-variant`.
- Brand: `primary` (deep foliage), `primary-container` (electric lime), `secondary` (violet), `tertiary` (coral).
- Accents: `electric-yellow`, `punch-coral`, `vivid-mint`, `electric-cyan`, `soft-lilac`.
- Borders are always `border-black`.

## Shadows & motion

- Use the hard offset shadows `shadow-neo-xs|sm|md|lg|xl`.
- Hover = lift (`hover:-translate-x-0.5 hover:-translate-y-0.5` + bigger shadow); active = press (`translate-x/y` + `shadow-neo-xs`/`shadow-none`).
- Composite classes exist for reuse: `.neo-card`, `.neo-btn-primary`, `.neo-btn-secondary`, `.ticker-track`.

## Typography

- Families: **Space Grotesk** (headlines/labels-caps), **Inter** (body), **JetBrains Mono** (labels).
- Use paired utilities: `font-headline-xl text-headline-xl`, `font-body-md text-body-md`, `font-label-caps text-label-caps`.
- Headlines are `uppercase`; labels use tracking-wide caps.

## Spacing & layout

- Section rhythm tokens: `px-margin-mobile md:px-margin`, `gap-gutter`, `py-16`.
- Content max width: `max-w-7xl mx-auto`.
- Mobile-first responsive: base styles then `sm:` / `md:` / `lg:`.

## Rules

- Never hardcode colors, font sizes, or shadows — extend `global.css` `@theme` instead.
- Use arbitrary values only for truly one-off geometry (`aspectRatio`, `border-[2.5px]`, important `p-0!`).
- Keep new global utility classes in `global.css`; keep one-off styles in the component's `className`.
