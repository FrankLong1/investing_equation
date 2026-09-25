# 001 — Expanding boxes

A box for every stage. Click into a stage and unfold the framework inside.

Visual treatment: Panels / nested space. Inspired by the glowing geometry, particles, and full-screen composition of the local flashy-ai-visuals project. This is an exploratory presentation of the framework; decorative geometry does not represent live activity or an execution DAG.

## Run

From `visualizations/`, run `npm install` once and `npm run dev`. Open `/neon-studies/001-expanding-boxes/` on the local address shown in the terminal. The gallery switches among all installed experiments.

To work on this version directly: `npm run dev --workspace 001-expanding-boxes` from `visualizations/`. To build only this version: `npm run build --workspace 001-expanding-boxes`. The output is `neon-studies/001-expanding-boxes/dist/neon-studies/001-expanding-boxes/index.html`; run `npm run preview --workspace 001-expanding-boxes` and open `/neon-studies/001-expanding-boxes/` to check it. A standalone build contains this experiment; the gallery and other experiments are available through the development server.

## Files and content

- `src/scene.js`: this version's geometry, layout, and animation.
- `src/main.js`: rendering, click navigation, controls, and document reader.
- `src/content.js`: imports Markdown directly from root `functions/` and `human-reviewed/` using Vite raw imports. The hierarchy comes from the reviewed overview headings and existing function folders; lettered root folders are grouped under their numbered outline section. Content edits trigger a refresh in development and are included by rebuilding for production.
- `src/style.css`: this version's interface.
- `assets/`: space for version-specific assets.

No version imports another version's code. Identical starter navigation is intentionally copied so the experiments can diverge. There is no shared content model. The workspace package only provides installation and launch commands.

## Interaction

Click a labeled box or use the numbered stage buttons. Nested sections expand into a new scene; breadcrumbs and Escape go back. Leaf sections open their source text. The source reader preserves Markdown verbatim, including equations. Proposed subdivisions are labeled; unassigned stages show their source instead of inventing functions. Drag to orbit, scroll to zoom, pause motion, or enter fullscreen. Reduced-motion preferences start the scene paused.
