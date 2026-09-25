# Verification — 2026-09-25

Verified locally with Node 26.5.0, Three.js 0.185.1, and Vite 8.3.1.

- All five independent production builds pass with `npm run build` from this directory.
- `npm audit --audit-level=moderate` reports zero vulnerabilities.
- All five scenes rendered in the Codex browser. The gallery and version selector open each experiment.
- Exercised stage-to-section-to-function navigation, including 2 → 2C, 4 → 4B, and 1 → 1B; checked the source reader, proposed subdivision labels, and motion toggle.
- Inspected the blueprint layout at a 390 × 844 viewport; restored the desktop viewport afterward.
- Served the standalone expanding-boxes production build using Vite preview and verified 4 → 4B drill-down. No browser warnings or errors were observed in the inspected logs.
- Checked the content loaders against the current repository: each exposes the reviewed top-level stages 1–5 and 51 reachable stage/function nodes, with all source and contract paths resolving. 1A and 1B are children of 1; 2A–2E remain children of 2; 3A–3C and 5A–5C remain labeled proposed.

The reviewed outline was reorganized while these studies were being built. The loaders follow the current documents instead of freezing the earlier 0–5 plan. No framework documents were changed by the visualization implementation.

These are starter studies, not a live execution visualization. Decorative lines and particles carry no dependency or activity claims. Markdown is shown verbatim in the source reader. Production builds are individual experiments; use the development gallery to compare them. Vite reports a bundle-size advisory because each standalone build includes Three.js and source documents.

## Family regrouping and Paper Atlas — 2026-09-25

The original five studies now live under `neon-studies/`; relative Markdown imports, build roots, workspace installation, gallery links, and documentation were updated. Old study URLs redirect through the main development server. `simple-html/` remains separate and unchanged.

All six Three.js production builds pass. Paper Atlas was inspected in the browser: the sculpture rendered, clicking a piece opened its chapter, and nested section navigation opened the root-backed reading view. The new family uses an independently implemented renderer and interaction design.

## Three additional visual families — 2026-09-25

- Added independent `metro-map/`, `miniature-city/`, and `signal-desk/` families, with separate interaction and rendering implementations.
- All nine npm workspace builds pass. Dependency audit reports zero vulnerabilities.
- Content checks cover all nine loaders: each preserves the five reviewed chapters, 51 reachable nodes, valid source paths, and proposed subdivision labels.
- Browser checks verified Metro Map station selection and original-document reading; Miniature City chapter and function expansion; Signal Desk `open 2C`, text search, Enter selection, and inline original-source reading. All three were visually inspected.
- Fixed SVG station hit targets and the terminal's long-line overflow during browser review. Inspected browser logs showed no runtime errors for the city and terminal checks.
- The current Simple HTML folder reorganization and math-rendering changes were preserved; its four rendering regression checks pass. Registry routing validation also passes.

The map and terminal use SVG/HTML; the city uses Three.js. These are intentionally different interfaces, rather than recolors of the existing scenes. No live investment processing is implied.
