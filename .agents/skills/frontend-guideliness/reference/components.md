# Section 3 — Component Conventions

Reference: [`src/components/atoms/Button/Button.tsx`](../../../../src/components/atoms/Button/Button.tsx), [`CompetitionSection.tsx`](../../../../src/components/organisms/CompetitionSection/CompetitionSection.tsx)

## Signature

```tsx
import type { JSX } from "react";

import type { CardProps } from "./Card.types";

export default function Card({ children, className = "", ...rest }: CardProps): JSX.Element {
  return <div className={`... ${className}`.trim()} {...rest}>{children}</div>;
}
```

- Always type the return as `JSX.Element` and import it with `import type { JSX } from "react";` as the first line.
- **Default-export** the component; named exports only for helpers/constants.
- Props interface lives in `.types.ts`, named `ComponentNameProps`, and is re-exported from `index.ts`.
- Import props/types with `import type` (see Section 5).

## Props

- Destructure props in the parameter list; give optional props defaults there.
- Always accept `className?: string` defaulting to `""` and append it last, then `.trim()`.
- Spread remaining native element props (`...restProps`) onto the root node when it wraps a DOM element.
- Prefer `children: ReactNode` for composition.

## Variants & styling maps

- Model variants/sizes as string-literal unions in `.types.ts` (e.g. `ButtonVariant`, `BadgeSize`).
- Map variant → Tailwind classes with a `Record<Variant, string>`, then interpolate.
- Keep multiple variants in one component rather than duplicating components.

## Composition

- `atoms` are dumb/stateless; `molecules` combine atoms; `organisms` compose molecules into full sections.
- Fold dynamic logic into small helpers (`.utils.ts`) or hooks — not into JSX.
- Pass callbacks down as optional props (`onRegisterClick?`) and invoke with optional chaining.

## Rules

- No `React.FC`; no explicit `React` import needed.
- Keep components presentational: content comes from props with `DEFAULT_*` constants as fallback.
- One responsibility per component; extract a new atom/molecule when JSX or props grow.
