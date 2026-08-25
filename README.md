# Coco Drapes

Custom drapery and roman shades e-commerce site. React 19 + Vite, hash-based
routing, no backend required. 5% of every sale supports an autism foundation
chosen by the customer.

## Quick start

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build -> dist/
npm run build:demo # single self-contained HTML file -> dist-demo/index.html
npm run lint       # oxlint
```

## Pages

| Route                     | File                        | Notes |
|---------------------------|-----------------------------|-------|
| `/`                       | `src/pages/Home.jsx`        | Hero, categories, 5% pledge, process steps, services teaser |
| `/customize/drapery`      | `src/pages/Customizer.jsx`  | Live SVG visualizer + quote request form |
| `/customize/roman`        | `src/pages/Customizer.jsx`  | Same component, roman config |
| `/fabrics`                | `src/pages/Fabrics.jsx`     | Legacy fabric collection page (see Open items) |
| `/services`               | `src/pages/Services.jsx`    | Cleaning & repair + intake form |
| `/our-story`              | `src/pages/OurStory.jsx`    | Mission, 5% pledge, values, careers form (`#careers`) |

## Architecture notes

- **Routing**: `HashRouter` (`src/main.jsx`) so the site works on any static
  host with zero server config. Falls back to `MemoryRouter` in sandboxed
  iframes. Switch to `BrowserRouter` only if the host provides SPA rewrites.
- **Visualizer**: `src/components/WindowPreview.jsx` renders the customer's
  configuration as pure SVG. It accepts a `config.previewFabric` override,
  which the customizer uses to preview selected fabric *colors*.
- **No cart / no checkout**: pricing is intentionally not shown. Customizer
  and Services submissions currently show a confirmation dialog only; they do
  **not** persist anywhere yet (see Open items).
- **Catalog**: `src/data/catalog.js` still contains the legacy fabric list and
  pricing model. Only styles/hardware/linings are consumed by the UI today.
- **Design system**: all tokens and shared classes live in
  `src/styles/global.css`. Illustrations: `src/components/StoryArt.jsx`,
  icons: `src/components/Icons.jsx`.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main` (set Pages source to "GitHub Actions" once). `vite.config.js`
uses `base: './'`, so the same build works on a project page, a custom
domain, or opened directly from disk.

## Open items for engineering

1. **Wire up form submissions.** Three forms (customizer quote, service
   request, careers) validate client-side but only show a confirmation. Point
   them at an endpoint, a form service (Formspree/Basin), or email relay.
2. **Decide the Fabrics page.** It predates the "colors only" direction and
   still shows named fabrics with per-yard prices.
3. **Pricing model.** When the price formula is ready, `catalog.js` has the
   old `calculatePrice()` as a starting point; cart/checkout pages were
   removed and would need to be rebuilt.
