# Miniature City

A playful orthographic Three.js town with colored districts, houses, trees, roads, and drifting clouds.

## Run

From `visualizations/`, run `npm install` and `npm run dev`. Open `/miniature-city/` or choose this family in the gallery.

Build independently with `npm run build --workspace miniature-city`. Run `npm run preview --workspace miniature-city` and open `/miniature-city/` to inspect the standalone output. A production build contains this family only.

## Interaction

Click a district sign or a building to enter its section. Buildings then represent the selected section’s children. Use the breadcrumbs, district buttons, or Escape to move around. Drag to rotate; scroll to zoom; Reset view restores the camera. Pause clouds freezes ambient movement; reduced-motion preferences start paused.

## Sources and scope

This family owns its code and reads the repository’s `human-reviewed/` and `functions/` Markdown through its own `src/content.js`. The reviewed numbering and proposed subdivision labels are preserved. It does not import another family’s renderer or UI.

Visual colors and geometry are illustrative presentation choices. They do not encode executor ownership, performance, live activity, or execution order. Original Markdown is shown verbatim. These are exploratory designs, not a working investment engine.
