# Section 2 — Project Structure (Atomic Design)

Reference: [`src/`](../../../../src)

## Layout

```
src/
├── assets/                  # images & svgs (imported as modules)
│   └── images/competitions/
├── components/
│   ├── atoms/               # indivisible primitives (Button, Badge, Card, CountdownCard)
│   ├── molecules/           # small compositions (CompetitionCard, CountdownTimer, FaqAccordion)
│   └── organisms/           # page sections (Hero, Navbar, Footer, *Section)
├── hooks/                   # reusable hooks (useCountdown, useParallaxTilt)
├── layouts/                 # page shells (MainLayout)
├── pages/                   # route-level components (LandingPage)
├── utils/                   # pure helpers (date.ts)
├── App.tsx
├── main.tsx
└── global.css               # Tailwind entry + design tokens
```

## Component folder anatomy

Every component lives in its own folder under the correct atomic level:

```
ComponentName/
├── ComponentName.tsx            # implementation (default export)
├── ComponentName.types.ts       # props + shared types
├── ComponentName.constants.ts   # static/default data (optional, .tsx if it holds JSX)
├── ComponentName.utils.ts       # component-local helpers (optional)
└── index.ts                     # barrel re-export
```

## Rules

- Place a component at the **lowest** level that can express it; promote only when composed from atoms/molecules.
- One folder = one component. Group by feature/role, not by file type.
- Assets are imported as modules (`import logo from "@/assets/images/...png"`), never referenced by raw string path.
- New top-level concern ⇒ new folder (`hooks/`, `utils/`), not a stray file at `src/` root.
