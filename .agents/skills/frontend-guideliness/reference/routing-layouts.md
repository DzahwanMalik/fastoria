# Section 7 — Layouts, Routing & Navigation

Reference: [`src/layouts/MainLayout.tsx`](../../../../src/layouts/MainLayout.tsx), [`src/pages/LandingPage.tsx`](../../../../src/pages/LandingPage.tsx)

## Current model

Single-page landing. `App.tsx` renders `LandingPage`, which composes organisms
inside `MainLayout`:

```
MainLayout (Navbar + <main> + Footer)
└── LandingPage
    ├── Hero          #hero
    ├── MarqueeTicker
    ├── CompetitionSection  #kategori
    ├── TimelineSection     #timeline (contains RulebookBanner #panduan)
    ├── ContactSection      #kontak (contains FaqAccordion #faq)
    └── SponsorSection      #sponsor
```

## Layouts (`src/layouts/`)

- `MainLayout` owns global chrome (navbar, main, footer) and receives `children`.
- `MainLayout` is the only place for page-level wrappers; pages pass section props only.
- Export both `default` and the named component (`export { MainLayout }`) as done today.

## Section anchors & scrolling

- Every scroll target is a `section` with a stable kebab-case `id` (`#hero`, `#kategori`, `#panduan`, `#kontak`, `#faq`).
- Sections that the fixed navbar can cover get `scroll-mt-24`.
- Smooth scrolling: `html { scroll-behavior: smooth }` plus `scrollIntoView({ behavior: "smooth" })` in page handlers.
- Wire navigation callbacks at the page level (`LandingPage`) and pass them to organisms as optional props.

## Routing

- `react-router` is a dependency but **not yet mounted** — there is a single route today.
- When adding real routes: create `src/pages/*`, mount `createBrowserRouter`/`RouterProvider` in `main.tsx`, and keep `MainLayout` as the layout route.
- Do not introduce ad-hoc routing; use the router once it is wired.
