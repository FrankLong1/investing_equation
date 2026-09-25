# Signal Desk

A keyboard-driven document terminal with a dense index, record view, searchable function IDs, and an inline raw-source pane.

## Run

From `visualizations/`, run `npm install` and `npm run dev`. Open `/signal-desk/` or choose this family in the gallery.

Build independently with `npm run build --workspace signal-desk`. Run `npm run preview --workspace signal-desk` and open `/signal-desk/` to inspect the standalone output. A production build contains this family only.

## Interaction

Type a title or ID to filter records. Arrow Up/Down selects a result and Enter opens it. Commands: home, back, open 2C, source, help. Press / to focus search or Escape to clear the query and then move up. Mouse and touch controls provide the same navigation.

## Sources and scope

This family owns its code and reads the repository’s `human-reviewed/` and `functions/` Markdown through its own `src/content.js`. The reviewed numbering and proposed subdivision labels are preserved. It does not import another family’s renderer or UI.

Visual colors and geometry are illustrative presentation choices. They do not encode executor ownership, performance, live activity, or execution order. Original Markdown is shown verbatim. These are exploratory designs, not a working investment engine.
