# Metro Map

A transit-map interpretation: white schematic canvas, colored chapter lines, keyboard-accessible SVG stations, and a station detail ticket.

## Run

From `visualizations/`, run `npm install` and `npm run dev`. Open `/metro-map/` or choose this family in the gallery.

Build independently with `npm run build --workspace metro-map`. Run `npm run preview --workspace metro-map` and open `/metro-map/` to inspect the standalone output. A production build contains this family only.

## Interaction

Click a chapter hub, a section station, or a line in the legend. Read the station ticket, follow nested connections, and open the original document. Browser Back/Forward restores selections. Escape moves to the parent. The map scrolls horizontally on narrow screens.

## Sources and scope

This family owns its code and reads the repository’s `human-reviewed/` and `functions/` Markdown through its own `src/content.js`. The reviewed numbering and proposed subdivision labels are preserved. It does not import another family’s renderer or UI.

Visual colors and geometry are illustrative presentation choices. They do not encode executor ownership, performance, live activity, or execution order. Original Markdown is shown verbatim. These are exploratory designs, not a working investment engine.
