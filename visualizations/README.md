# Visualization lab

Independent visual families for the existing investment framework. The interactive experiments read `human-reviewed/` and `functions/` directly from the repository. There is no shared visualization model.

## Run

Requires Node.js 22.12+.

```sh
cd visualizations
npm install
npm run dev
```

Open the local URL printed by Vite to choose a family. `npm run build` builds all nine npm-based experiments independently. The top-level npm workspace only installs dependencies and provides launch commands.

## Families

```text
visualizations/
├── neon-studies/
│   ├── index.html
│   ├── 001-expanding-boxes/
│   ├── 002-infinite-canvas/
│   ├── 003-orbital-worlds/
│   ├── 004-information-reactor/
│   └── 005-living-blueprint/
├── paper-atlas/
│   ├── index.html
│   ├── src/
│   │   ├── content.js
│   │   ├── main.js
│   │   ├── sculpture.js
│   │   └── style.css
│   ├── package.json
│   └── vite.config.js
├── simple-html/
│   ├── 001_simple.html
│   └── compile.py
├── metro-map/
├── miniature-city/
├── signal-desk/
├── index.html
├── package.json
└── vite.config.js
```

- [Neon studies](neon-studies/README.md): the five original dark, glowing, spatial diagrams, grouped as one family.
- [Paper Atlas](paper-atlas/README.md): a warm editorial field guide with a tactile Three.js sculpture, numbered chapters, and a scroll-based reading view.
- [Metro Map](metro-map/README.md): a transit diagram with chapter routes, section stations, and source tickets.
- [Miniature City](miniature-city/README.md): a playful Three.js town with clickable districts and buildings.
- [Signal Desk](signal-desk/README.md): a keyboard-driven document terminal with search and raw source inspection.
- [Simple HTML](simple-html/README.md): the existing standalone HTML reference diagram. Its compiled page is `simple-html/001_simple.html`; its compiler and templates live alongside it.

Every theme has its own folder. Variants of the same theme stay inside that folder. Each experiment owns its source loader, interaction, rendering, and styling. Each build contains just that experiment; use the development gallery for cross-family navigation. The main development server redirects the old `/001-…/` through `/005-…/` URLs into `neon-studies/`.

## Content and further experiments

The reviewed outline supplies top-level stages; the existing function folders supply children and contracts. Lettered root folders are grouped under the corresponding reviewed heading. Proposed subdivisions remain labeled as proposed. Source readers display the original Markdown verbatim. Decorative geometry is illustrative, not an execution graph or live telemetry.

Add a new aesthetic direction as a new folder alongside `neon-studies/` and `paper-atlas/`. Add its package to the workspace list and link it from the gallery. Variations on an existing direction belong inside that family's folder.
