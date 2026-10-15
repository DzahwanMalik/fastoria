# Section 1 — Tech Stack & Tooling

Reference: [`package.json`](../../../../package.json), [`vite.config.ts`](../../../../vite.config.ts)

## Core

| Concern | Choice |
|---|---|
| UI library | React `19.2` (`react`, `react-dom`) |
| Language | TypeScript `~6.0.2` |
| Build tool | Vite `8.3` (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS `4.3` via `@tailwindcss/vite` |
| Routing | `react-router` `8.4` (installed, not yet wired — see Section 7) |
| Icons | `react-icons` `5.7` (Feather `Fi*` set is the default) |
| Lint | ESLint `10` flat config + `typescript-eslint` `8` |

## Path alias

`@` resolves to `./src` (declared in both `vite.config.ts` and `tsconfig.app.json`).
Always import internal code through the alias — never with `../../` chains.

## TypeScript settings to respect

- `verbatimModuleSyntax` → type-only imports **must** use `import type`.
- `noUnusedLocals` / `noUnusedParameters` → no dead variables or params.
- `erasableSyntaxOnly` → no TS-only runtime syntax (no enums, no param properties).
- `jsx: react-jsx` → no need to import React for JSX.

## Rules

- Add a dependency only when the project already needs it; do not swap libraries.
- Keep `package.json` scripts as the single entry point for tasks (Section 9).
