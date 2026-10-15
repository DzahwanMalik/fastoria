# Section 8 — Quality, Accessibility & Workflow

Reference: [`package.json`](../../../../package.json) scripts, [`eslint.config.js`](../../../../eslint.config.js)

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server (HMR) |
| `npm run build` | `tsc -b && vite build` — must pass before commit |
| `npm run lint` | ESLint over the repo |
| `npm run lint:fix` | ESLint + auto-fix (incl. import sorting) |
| `npm run preview` | Preview the production build |

A change is done only when `npm run lint` **and** `npm run build` succeed.

## Accessibility (a11y)

- Use semantic elements: `<section>`, `<header>`, `<main>`, `<nav>`, `<footer>`, headings in order (`h1` → `h2` → `h3`).
- Interactive icons/buttons need a label: `aria-label` (Button accepts `ariaLabel`/`aria-label`).
- Decorative duplicates (e.g. the second marquee track) get `aria-hidden="true"`.
- Every `<img>` has meaningful `alt`; use `loading="lazy"` for below-the-fold art.

## Code quality

- Respect ESLint rules: `react-hooks` (rules of hooks, exhaustive deps) and `react-refresh` (only export components from component files).
- Keep imports sorted (Section 5); keep types explicit (no `any`).
- No dead code: `noUnusedLocals`/`noUnusedParameters` are errors at build.

## Performance

- Memoize derived lists with `useMemo` (see `CompetitionSection` filtering / `TimelineSection` reference date).
- Clean up timers/intervals in hooks.
- Lazy-load heavy images; prefer CSS transforms for motion.

## Housekeeping

- Reuse existing atoms/molecules before creating new ones; check `src/components`.
- Keep `global.css` tokens as the styling contract; don't fork colors locally.
- Update the relevant `reference/*.md` file in this skill when a convention changes.
