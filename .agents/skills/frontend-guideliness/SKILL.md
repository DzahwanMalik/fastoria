---
name: frontend-guidelines
description: Fastoria frontend project guidelines — stack, atomic structure, component and styling conventions, TypeScript/import rules, hooks and data, layouts/routing, and quality workflow. Load this before writing or reviewing any code under src/.
---

# Fastoria — Frontend Guidelines

Project conventions for the **Fastoria** landing page (`React 19 + TypeScript + Vite + Tailwind v4`).
Each section below is a short index; the linked file in [`reference/`](./reference) holds the details.

## 1. Tech Stack & Tooling

React 19, TypeScript 6, Vite 8, Tailwind CSS v4, `react-router` and `react-icons`, ESLint 10 flat config, and the `@` → `src` alias.
→ [`reference/stack.md`](./reference/stack.md)

## 2. Project Structure (Atomic Design)

`atoms` / `molecules` / `organisms` under `src/components`, plus `pages`, `layouts`, `hooks`, `utils`, `assets`. One component per folder with co-located `.types.ts`, optional `.constants.ts(x)` / `.utils.ts`, and an `index.ts` barrel.
→ [`reference/structure.md`](./reference/structure.md)

## 3. Component Conventions

Default-exported function components returning `JSX.Element`, props typed as `ComponentNameProps` in `.types.ts`, `className` appended last, `Record<Variant, string>` style maps, and props-with-defaults for content.
→ [`reference/components.md`](./reference/components.md)

## 4. Design System & Styling

**Electric Neo-Brutalist**: tokens declared once in `src/global.css` `@theme` (lean set — only tokens in real use), thick black borders, `shadow-neo-*` hard shadows, paired typography utilities, and mobile-first spacing tokens. Never hardcode colors/sizes.
→ [`reference/styling.md`](./reference/styling.md)

## 5. TypeScript, Imports & Aliases

`simple-import-sort` group order, `import type` for types (`verbatimModuleSyntax`), string-literal unions over enums, `@/` alias for internal code, and barrel exports.
→ [`reference/typescript.md`](./reference/typescript.md)

## 6. Hooks, Utilities & Content Data

`use*` hooks in `src/hooks`, pure helpers in `src/utils`, default content in `Component.constants.ts` typed and consumed as optional props; data shapes align with `docs/ERD.md` (Supabase CMS).
→ [`reference/hooks-utils-data.md`](./reference/hooks-utils-data.md)

## 7. Layouts, Routing & Navigation

`MainLayout` provides global chrome; single-page anchor navigation (`#hero`, `#kategori`, `#panduan`, `#kontak`, `#faq`) with `scroll-mt-24`; `react-router` is installed but not yet mounted.
→ [`reference/routing-layouts.md`](./reference/routing-layouts.md)

## 8. Quality, Accessibility & Workflow

`npm run dev | build | lint | lint:fix | preview`; changes must pass lint + build; semantic HTML, labeled controls, `alt` text, `loading="lazy"`, memoized derivations, and reused atoms/molecules.
→ [`reference/quality.md`](./reference/quality.md)
