# Function contracts by investment-process stage

This tree follows the numbering in the [human-reviewed V4 overview](../human-reviewed/hedge-fund-as-a-function-v4.md). It keeps one Markdown file per named registry node and deterministic service. The existing `skills/` registry remains authoritative until each stub is completed and reconciled.

- `1A`, `1B`, `2A`–`2E`, `3`, `4A`–`4C`, and `5` come from the reviewed outline.
- `3A`–`3C` expand the three sections of internal context. `5A`–`5C` are proposed folders for review gate, outcome attribution, and rerun routing. These labels are organizational, not yet approved as canonical section titles.
- Empty stages are intentional. The provisional runtime registry has no node assigned to them; adding a folder does not pretend that logic exists.
- Node IDs E/M/V/R/S/T/O remain in file names so each contract can be traced to [routing](../skills/ROUTING.md).
- `S1` is under `2E` because it builds the payoff casebook; `S2` and `S3` are under `4B` because they prepare and gate sizing input. Recognition is under `2C`, where the reviewed note introduces the recognition path.

The [Python interface stubs](../skills/function_stubs.py) are a companion, not an implementation.
