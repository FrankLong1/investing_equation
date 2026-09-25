# Visualization lab

Independent visual families for the existing investment framework. The Three.js experiments read `human-reviewed/` and `functions/` directly from the repository. There is no shared visualization model.

## Run

Requires Node.js 22.12+.

```sh
cd visualizations
npm install
npm run dev
```

Open the local URL printed by Vite to choose a family. `npm run build` builds all six Three.js experiments independently. The top-level npm workspace only installs dependencies and provides launch commands.

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
├── 006-naive-html/
├── index.html
├── package.json
└── vite.config.js
```

- [Neon studies](neon-studies/README.md): the five original dark, glowing, spatial diagrams, grouped as one family.
- [Paper Atlas](paper-atlas/README.md): a warm editorial field guide with a tactile Three.js sculpture, numbered chapters, and a scroll-based reading view.
- [Naive HTML](006-naive-html/README.md): the existing standalone HTML reference diagram. Its files and compiler remain in their original folder.

Each experiment owns its source loader, interaction, rendering, and styling. Each build contains just that experiment; use the development gallery for cross-family navigation. The main development server redirects the old `/001-…/` through `/005-…/` URLs into `neon-studies/`.

## Content and further experiments

The reviewed outline supplies top-level stages; the existing function folders supply children and contracts. Lettered root folders are grouped under the corresponding reviewed heading. Proposed subdivisions remain labeled as proposed. Source readers display the original Markdown verbatim. Decorative geometry is illustrative, not an execution graph or live telemetry.

Add a new aesthetic direction as a new folder alongside `neon-studies/` and `paper-atlas/`. Add its package to the workspace list and link it from the gallery. Variations on an existing direction belong inside that family's folder.
