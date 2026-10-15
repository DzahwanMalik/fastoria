# Section 6 — Hooks, Utilities & Content Data

Reference: [`src/hooks/`](../../../../src/hooks), [`src/utils/date.ts`](../../../../src/utils/date.ts)

## Hooks (`src/hooks/`)

- File and function are camelCase and prefixed `use*` (`useCountdown`, `useParallaxTilt`).
- Give an explicit typed return object, not an inferred one.
- Clean up side effects (`clearInterval`/`clearTimeout`) in the `useEffect` return.
- Keep hooks logic-only — no JSX; components consume them.
- Built-ins in use: `useState`, `useMemo`, `useEffect`, `useRef`.

## Utilities (`src/utils/`)

- Pure, framework-free functions (e.g. `formatTimelineDate`).
- Export from the module directly; document behavior with a JSDoc block.
- Localize Indonesian formatting here (dates, currency) — not inline in JSX.
- Component-specific helpers belong in `ComponentName.utils.ts` and are re-exported from the barrel.

## Content data & defaults

- Static/default content lives in `ComponentName.constants.ts` (`.tsx` when it contains JSX, e.g. sponsor logos).
- Type every constant collection with an exported interface; components accept it as an optional prop that defaults to the `DEFAULT_*` constant:

```tsx
export default function TimelineSection({ steps = DEFAULT_TIMELINE_STEPS }: TimelineSectionProps) { ... }
```

- Keep IDs stable and kebab-case (`"uiux-design"`); use them as React `key`s.
- Currency is stored/parsed as a number and formatted for display in `utils`; date ranges go through `formatTimelineDate`.
- The transition of these constants to Supabase tables (CMS) is mapped in [`docs/ERD.md`](../../../../docs/ERD.md) — keep constant shapes aligned with the table columns.
