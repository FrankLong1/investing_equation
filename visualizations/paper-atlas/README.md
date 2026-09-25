# Paper Atlas

A separate visual direction: a cool white architectural grid, restrained sans-serif typography, slate tones, a softly lit Three.js paper sculpture, and a continuous reading journey.

## Run and build

From `visualizations/`, run `npm install` and `npm run dev`, then open `/paper-atlas/`.

- `npm run build --workspace paper-atlas` builds just this experiment.
- `npm run preview --workspace paper-atlas` serves that build; open `/paper-atlas/` at the printed address.
- Output: `paper-atlas/dist/paper-atlas/index.html` and adjacent bundled assets.

## Interactions

Click a numbered piece of the sculpture or choose a chapter in the contents. The reading section opens below, with numbered subsections and original-source buttons. Follow the breadcrumb trail back, use browser Back/Forward, close the chapter, or press Escape to move up. Drag the sculpture to turn it. Pause movement or use the system reduced-motion preference. If WebGL is unavailable, the contents and source reader still work.

## Implementation

- `src/sculpture.js`: independently implemented extruded paper sectors, printed numbers, physical materials, lights, shadows, picking, and movement.
- `src/main.js`: chapter navigation, history, reading view, and source dialog.
- `src/content.js`: this experiment's loader for the root Markdown documents; no dependency on the Neon Studies implementations.
- `src/style.css`: monochrome palette, responsive editorial layout, typography, and reading styles.

Colors distinguish chapters visually, not executor ownership. The sculpture is an index, not a claim about dependency order or capital allocation. Proposed subdivisions are labeled. The source reader preserves Markdown and equations verbatim rather than typesetting them.
