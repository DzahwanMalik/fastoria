# Section 5 — TypeScript, Imports & Aliases

Reference: [`eslint.config.js`](../../../../eslint.config.js), [`tsconfig.app.json`](../../../../tsconfig.app.json)

## Import order (enforced by `simple-import-sort`)

Groups, in this exact order, with a blank line between groups:

1. React, then third-party packages — `["^react", "^@?\\w"]`
2. Internal alias imports — `["^@/"]`
3. Side-effect / stylesheet imports — `["^\\u0000", "^.+\\.s?css$"]`
4. Relative imports — `["^\\."]`

```tsx
import type { JSX } from "react";
import { useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import Badge from "@/components/atoms/Badge";

import "./Thing.css";
import { localHelper } from "./Thing.utils";
```

`import type { JSX } from "react";` goes first as its own group. Run `npm run lint:fix` to auto-sort.

## Type rules

- `import type` for anything used only as a type (`verbatimModuleSyntax`).
- Export interfaces/types from the component's `.types.ts`; re-export via `index.ts`.
- Name props `ComponentNameProps`; name unions by role (`ButtonVariant`, `CardShadowSize`).
- No `enum`, no `namespace`, no parameter properties (`erasableSyntaxOnly`).
- No `any`; model variant values as string-literal unions.

## Aliases

- `@/` = `src/` for every internal import.
- Import the folder barrel (`@/components/atoms/Button`), not the deep file, unless reaching for a co-located helper.
- Avoid deep `../../` relative paths across folders; keep relatives for siblings only.

## Barrels (`index.ts`)

```ts
export { default } from "./Button";
export * from "./Button.types";
```

Add `export * from "./Button.utils";` when helpers should be public (see `TimelineStepCard`).
